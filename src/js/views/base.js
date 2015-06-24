export default class View {
	constructor( game, model, worldScale ) {
		this.game = game;
		this.model = model;
		this.worldScale = worldScale;
	}

	focus( scale = 8, duration = null ) {
		this.game.camera.zoomTo( this.worldScale.set(scale), duration, this.el.position );
	}

	focusFollow( scale = 8, duration = null ) {
		this.game.camera.zoomTo( this.worldScale.set(scale), duration );
		this.game.camera.follow( this.el );
	}
}