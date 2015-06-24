import View from './base';

function renderPath( ctx, radius, scale ) {
	ctx.clear();
	ctx.lineStyle(1, 0xAAAAAA, 0.6);
	ctx.drawCircle(0,0,radius*2*scale);
}

export default class PlanetView extends View {
	constructor( game, model ) {
		super(...arguments);
		this.center = { x: model.system.x, y : model.system.y };
		
		this.init( game );
		this.handlers();
	}

	init( game ) {
		var ctx = game.add.graphics(0,0);
	    ctx.beginFill(0xFFFFFF,1); 
	    ctx.drawCircle(0,0,this.model.size);
	    ctx.endFill();

	    var path = game.add.graphics(this.center.x,this.center.y);
	    renderPath( path, this.model.radius, 1 );

	    this.el = game.add.sprite(0,0);
	    this.el.addChild(ctx);
	    this.path = path;

	    this.el.inputEnabled = true;
	}

	handlers() {
		this.el.events.onInputDown.add(() => this.focusFollow( 8, 1000 ));
	}

	update() {
		this.el.visible = this.worldScale.get() >= 0.5;
		this.path.visible = this.worldScale.get() >= 0.5;

		this.el.x = this.model.x;
		this.el.y = this.model.y;
	}
}