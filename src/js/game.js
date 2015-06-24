import PlanetView from './views/planet';
import SystemView from './views/system';
import SystemsView from './views/systems';
import System from './models/system';
import Simulator from './sim';
import SystemsCollection from './collections/systems';
import worldScale from './util/worldscale';

var mapSizeX = 8000,
    mapSizeY = 8000,
    cursors;

Phaser.Camera.prototype.zoomTo = function(scale, duration, target) {
    scale = parseFloat( scale.toFixed(2), 10 ); // Fix scale to two decimal points

    // Default target to center of the camera view
    if( !target ) {
      target = new Phaser.Point( this.view.centerX, this.view.centerY );
      target.divide(this.world.worldTransform.a,this.world.worldTransform.d);
      target.x = Math.round(target.x); target.y = Math.round(target.y); // To avoid floating precision errors from sneaking into zooming
    }

    // Set maximum and minimum zoom level
    scale = Phaser.Math.clamp(scale,0.25,8);

    if( ! duration ) {
      this.world.scale.setTo( scale );
    } else {
      this.game.add.tween(this.world.scale).to({
        x: scale, y: scale
      }, duration).start();
    }

    var bounds = this.world.bounds.clone();
    this.bounds = bounds.inflate( this.world.bounds.width * scale, this.world.bounds.height * scale );

    if( !this.target ) {
      target.multiply( scale, scale );

      if( !duration ) {
        this.view.x = target.x - this.view.halfWidth;
        this.view.y = target.y - this.view.halfHeight;
      } else {
        this.game.add.tween(this.view).to({
          x : target.x - this.view.halfWidth,
          y : target.y - this.view.halfHeight
        }, duration).start();
      }
    }
};

Phaser.Camera.prototype.zoomToFollow = function(scale, duration, target) {
  this.follow(target);
  this.zoomTo(scale, duration);
};

function Game() {
}

Game.prototype = {
  create: function () {
    cursors = this.game.input.keyboard.createCursorKeys();
    this.game.world.setBounds(-mapSizeX,-mapSizeY,mapSizeX*2,mapSizeY*2);
    this.game.renderer.renderSession.roundPixels = true;

    this.galaxy = new SystemsCollection( worldScale );
    this.galaxy2 = new SystemsCollection( worldScale );

    this.views = [];
    this.views.push(new SystemsView( this.game, this.galaxy, worldScale ) );
    this.views.push(new SystemsView( this.game, this.galaxy2, worldScale ) );

    this.simulator = new Simulator( [this.galaxy] );
    this.simulator.start();

    this.game.camera.focusOnXY(0,0);
  },

  update: function () {
    if (cursors.up.isDown)
    {
        this.game.camera.y -= 10;
    }
    else if (cursors.down.isDown)
    {
        this.game.camera.y += 10;
    }

    if (cursors.left.isDown)
    {
        this.game.camera.x -= 10;
    }
    else if (cursors.right.isDown)
    {
        this.game.camera.x += 10;
    }

    if( cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown ) {
        this.game.camera.target = null;
    }

    // zoom
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
        this.game.camera.zoomTo(worldScale.plus(0.05));
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.game.camera.zoomTo(worldScale.minus(0.05));
    }    

    for( let view of this.views ) {
      if( view.update && typeof view.update === 'function') {
        view.update( worldScale.get() );
      }
    }
  },

  render: function() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00');
    // Camera
    this.game.debug.cameraInfo(this.game.camera, 2, 30);
    this.game.debug.text(`worldScale: ${worldScale}`, 2, 120);
    this.game.debug.text(`camera centerX: ${this.camera.view.centerX}, camera centerY: ${this.camera.view.centerY}`, 2, 240);
  }
};

export default Game;
