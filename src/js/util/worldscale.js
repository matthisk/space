import Event from './event';

class WorldScale extends Event {
  constructor() {
    super(...arguments);
    this.scale = 1;
  }

  planetsVisible() {
    return this.scale > 1;
  }

  plus(v) { 
    this.set(this.scale + v); 
    return this.scale;
  }

  minus(v) { 
    this.set(this.scale - v); 
    return this.scale;
  }

  multiply(v) { 
    this.set(this.scale * v); 
    return this.scale;
  }

  get() { 
    return this.scale; 
  }

  toString() {
    return `${this.scale}`;
  }

  set(v) { 
    this.scale = Phaser.Math.clamp(v, 0.05, 8); 

    this.trigger('resize',this.scale);

    return this.scale;
  }
}

export default new WorldScale();