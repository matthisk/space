import Planet from './planet';
import { getRandomInt, getRandom } from '../tools';

export default class System {
  constructor( x, y, nPlanets = getRandomInt(1,5) ) {
  	var radius = getRandom(50, 100);

    this.point = new Phaser.Point(x,y);
    this.pos = { 
      z: Math.round(getRandom(1,5)),
      size: getRandom(1,5),
  		radius: radius 
  	};
  	this.planets = [];

  	for(let i = 0; i < nPlanets; i++ ) {
      this.planets[i] = new Planet( this );
    }
  }

  randomRadius() {
  	var r;

    var gen = () => {
  		return (0.05 * this.radius) + (0.41 * getRandom(0,this.radius));
  	};

  	if(this.planets.length === 0) {
      return gen();
    }

  	var spacing = this.radius * 0.03,
  		ok = false;

  	while(this.planets.length > 0 && !ok) {
  		ok = true;
  		r = gen();
  		for( let planet of this.planets ) {
  			var dd = Math.abs(planet.radius - r);
  			if( dd < spacing ) {
  				ok = false;
  			}
  		}
  	}

  	return r;
  }

  update( elapsedTime ) {
    for(let planet of this.planets) {
      planet.update( elapsedTime );
    }
  }

  get x() { return this.point.x; }
  get y() { return this.point.y; }
  get z() { return this.pos.z; }
  get size() { return this.pos.size; }
  get width() { return this.pos.radius; }
  get height() { return this.pos.radius; }
  get radius() { return this.pos.radius; }
}
