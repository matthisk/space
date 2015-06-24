import Base from './base';

var MAX_Z = 5;

function zAlpha(z) {
	return z / MAX_Z;
}

var lastScale = 1;

export default class SystemsView extends Base {
	constructor() {
		super(...arguments);
		this.init( this.game );

		lastScale = this.worldScale.get();
		this.worldScale.on('resize',this.resize.bind(this));
	}

	init( game ) {
		this.ctx = game.add.graphics(0, 0);
		this.redraw();	
	}

	redraw(all = true) {
    var ctx = this.ctx;
		ctx.clear();

		for(let system of this.model.systems) {
			if(all || system.z === MAX_Z) {
				ctx.beginFill(0xFFFFFF, 1);

				var scalePoint = new Phaser.Point(this.worldScale.get(),this.worldScale.get());
				var point = Phaser.Point.multiply(system.point,scalePoint);

				ctx.drawCircle(point.x, point.y, system.size);
        ctx.endFill();


        ctx.lineStyle(1, 0xFFFFFF, 1);
        ctx.drawCircle(point.x, point.y, system.radius);
        ctx.lineWidth = 0;
 
      if(this.worldScale.get() > 1) {
        for(let planet of system.planets) {
            ctx.beginFill(0xFF0000,1); 
            ctx.drawCircle(point.x + planet.x, point.y + planet.y, planet.size);
            ctx.endFill();
          }
        }
      }
		}
	}

	resize(scale) {
		this.redraw();
		// if(scale >= 2 && lastScale < 2) {
		// 	this.redraw(false);
		// } else if(scale < 2 && lastScale >= 2) {
		// 	this.redraw();
		// }

		lastScale = scale;
	}

  update() {
    this.redraw();
  }
}
