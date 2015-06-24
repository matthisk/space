export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomNonUniform(min, max) {
	var r = getRandom(min * (min+1) / 2, max  * (max+1) / 2);
	return Math.ceil( (Math.sqrt(8*r+1)-1)/2 );
}

export function getRandomNonUniformInv(min, max) {
	return Math.abs( getRandomNonUniform(min, max) - max );
}

export function getRandomInt(min, max) {
	return Math.round( getRandom(min, max) );
}