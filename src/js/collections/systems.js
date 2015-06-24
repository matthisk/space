import System from '../models/system';
import { getRandomNonUniformInv, getRandomInt } from '../tools'; 

var armCount,
	radius,
	centrumR,
	spinFactor,
	armR,
	center;

function generateStars( center, starsPerArm ) {
	var r = (Math.PI*2) / armCount,
		stars = [];

	for(let i = 1; i <= armCount; i++) {
		var rect = new Phaser.Rectangle(center.x - (armR/2), center.y + centrumR, armR, radius);


		for(let j = 0; j < starsPerArm; j++) {
			var star = new Phaser.Point( rect.randomX, getRandomNonUniformInv(rect.y, rect.height) );
			star.rotate(center.x, center.y, r * i);
			var spin = (star.distance(center) / radius) * spinFactor;
			star.rotate(center.x, center.y, spin);

			stars.push(star);
		}
	}

	return stars;
}

export default class SystemsCollection {
	constructor( worldScale, nSystems = 10 ) {
		this.worldScale = worldScale;
		this.systems = [];
		this.initConfig();
		this.init( nSystems );
	}

	initConfig() {
		armCount = getRandomInt(4,8);
		radius = getRandomInt(2000,4000);
		centrumR = 50;
		spinFactor = Math.PI/3;
		armR = 800;
		center = new Phaser.Point(0, 0);
	}

	init( nSystems ) {
		var starsPerArm = nSystems / armCount,
			stars = generateStars( center, starsPerArm );

		for(let star of stars) {
			var system = new System( star.x, star.y );
			this.systems.push(system);
		}
	}

	update( elapsedTime ) {
		if( this.worldScale.planetsVisible() ) {
			for(let system of this.systems) {
				system.update( elapsedTime );
			}
		}
	}
}
