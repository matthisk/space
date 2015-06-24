import View from './base';

export default class SystemView extends View {
	constructor( game ) {
		super(...arguments);

		this.init( game );
		this.handlers();
	}

	init( game ) {
		var ctx = game.add.graphics(0, 0);
		ctx.beginFill(0xFFFFFF, 1);
		ctx.drawCircle(0, 0, this.model.size);

		this.el = game.add.sprite(this.model.x, this.model.y);
		this.el.addChild(ctx);	
	}

	handlers() {
		this.el.events.onInputDown.add(() => this.focus( 8, 1000 ));
	}
}