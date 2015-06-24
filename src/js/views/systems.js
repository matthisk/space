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
		this.ctx.clear();

		for(let system of this.model.systems) {
			if(all || system.z === MAX_Z) {
				this.ctx.beginFill(0xFFFFFF, 1);

				var scalePoint = new Phaser.Point(this.worldScale.get(),this.worldScale.get());
				var point = Phaser.Point.multiply(system.point,scalePoint);

				this.ctx.drawCircle(point.x, point.y, system.size);
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
}