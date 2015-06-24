import { getRandom } from '../tools';

export default class Planet {
  constructor( system ) {
    this.system = system;

    this.pos = {
      x: 0,
      y: 0,
      r: this.system.randomRadius(),
      a: getRandom(0,360),
      v: 0.000001 * getRandom(25,75), // Velocity of planet per ms
      size: getRandom(5,15)
    };
  }

  physics( elapsedTime ) {
    var a = this.pos.a,
        v = this.pos.v * elapsedTime,
        r = this.pos.r;

    this.pos.a = (a + v) % 360;
    this.pos.x = (this.system.x + r * Math.cos(a));
    this.pos.y = (this.system.y + r * Math.sin(a));
  }

  update( elapsedTime ) {
    this.physics( elapsedTime );
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }
  get a() { return this.pos.a; }
  get size() { return this.pos.size; }
  get radius() { return this.pos.r; }
}