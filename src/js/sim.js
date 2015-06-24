var config = {
	speed: 4,
	maxSpeed: 4,
	stepTime: 1000/30 // Set simulator to 30hz
};

export default class Simulator {
	constructor( simObjs = [], options = {} ) {
		this.objs = simObjs;

		this._speed = options.speed || config.speed;
		this._stepTime = options.stepTime || config.stepTime;
	}

	start() {
		this.lastTime = Date.now();
		this.timerID = setInterval(this.step.bind(this), this._stepTime);
	}

	stop() {
		if( this.timerID ) {
			clearInterval( this.timerID );
			this.timerID = undefined;
		}
	}

	step() {
		var currentTime = Date.now();
		var elapsedTime = (currentTime - this.lastTime) * this._speed;

		for( let simObject of this.objs ) {
			if( simObject.update && typeof simObject.update === 'function') {
				simObject.update( elapsedTime );
			}
			else {
				console.error('Simobject',simObject,'does not have a function update');
			}
		}

		this.lastTime = Date.now();
	}

	add( simObject ) {
		this.objs.push( simObject );
	}

	set speed( s ) { this._speed = Phaser.Math.clamp(s, 0, config.maxSpeed); }
}