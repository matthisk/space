(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function Boot() {}

Boot.prototype = {
  preload: function preload() {
    this.load.image('preloader', 'assets/preloader.gif');
  },

  create: function create() {
    // configure game
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth = 480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }
    this.game.state.start('preloader');
  }
};

exports['default'] = Boot;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modelsSystem = require('../models/system');

var _modelsSystem2 = _interopRequireDefault(_modelsSystem);

var _tools = require('../tools');

var armCount, radius, centrumR, spinFactor, armR, center;

function generateStars(center, starsPerArm) {
	var r = Math.PI * 2 / armCount,
	    stars = [];

	for (var i = 1; i <= armCount; i++) {
		var rect = new Phaser.Rectangle(center.x - armR / 2, center.y + centrumR, armR, radius);

		for (var j = 0; j < starsPerArm; j++) {
			var star = new Phaser.Point(rect.randomX, (0, _tools.getRandomNonUniformInv)(rect.y, rect.height));
			star.rotate(center.x, center.y, r * i);
			var spin = star.distance(center) / radius * spinFactor;
			star.rotate(center.x, center.y, spin);

			stars.push(star);
		}
	}

	return stars;
}

var SystemsCollection = (function () {
	function SystemsCollection(worldScale) {
		var nSystems = arguments[1] === undefined ? 796 : arguments[1];

		_classCallCheck(this, SystemsCollection);

		this.worldScale = worldScale;
		this.systems = [];
		this.initConfig();
		this.init(nSystems);
	}

	_createClass(SystemsCollection, [{
		key: 'initConfig',
		value: function initConfig() {
			armCount = (0, _tools.getRandomInt)(4, 8);
			radius = (0, _tools.getRandomInt)(2000, 4000);
			centrumR = 50;
			spinFactor = Math.PI / 3;
			armR = 800;
			center = new Phaser.Point(0, 0);
		}
	}, {
		key: 'init',
		value: function init(nSystems) {
			var starsPerArm = nSystems / armCount,
			    stars = generateStars(center, starsPerArm);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = stars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var star = _step.value;

					var system = new _modelsSystem2['default'](star.x, star.y);
					this.systems.push(system);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'update',
		value: function update(elapsedTime) {
			if (this.worldScale.planetsVisible()) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.systems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var system = _step2.value;

						system.update(elapsedTime);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}
	}]);

	return SystemsCollection;
})();

exports['default'] = SystemsCollection;
module.exports = exports['default'];

},{"../models/system":7,"../tools":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsPlanet = require('./views/planet');

var _viewsPlanet2 = _interopRequireDefault(_viewsPlanet);

var _viewsSystem = require('./views/system');

var _viewsSystem2 = _interopRequireDefault(_viewsSystem);

var _viewsSystems = require('./views/systems');

var _viewsSystems2 = _interopRequireDefault(_viewsSystems);

var _modelsSystem = require('./models/system');

var _modelsSystem2 = _interopRequireDefault(_modelsSystem);

var _sim = require('./sim');

var _sim2 = _interopRequireDefault(_sim);

var _collectionsSystems = require('./collections/systems');

var _collectionsSystems2 = _interopRequireDefault(_collectionsSystems);

var _utilWorldscale = require('./util/worldscale');

var _utilWorldscale2 = _interopRequireDefault(_utilWorldscale);

var mapSizeX = 8000,
    mapSizeY = 8000,
    cursors;

Phaser.Camera.prototype.zoomTo = function (scale, duration, target) {
  scale = parseFloat(scale.toFixed(2), 10); // Fix scale to two decimal points

  // Default target to center of the camera view
  if (!target) {
    target = new Phaser.Point(this.view.centerX, this.view.centerY);
    target.divide(this.world.worldTransform.a, this.world.worldTransform.d);
    target.x = Math.round(target.x);target.y = Math.round(target.y); // To avoid floating precision errors from sneaking into zooming
  }

  // Set maximum and minimum zoom level
  scale = Phaser.Math.clamp(scale, 0.25, 8);

  if (!duration) {
    this.world.scale.setTo(scale);
  } else {
    this.game.add.tween(this.world.scale).to({
      x: scale, y: scale
    }, duration).start();
  }

  var bounds = this.world.bounds.clone();
  this.bounds = bounds.inflate(this.world.bounds.width * scale, this.world.bounds.height * scale);

  if (!this.target) {
    target.multiply(scale, scale);

    if (!duration) {
      this.view.x = target.x - this.view.halfWidth;
      this.view.y = target.y - this.view.halfHeight;
    } else {
      this.game.add.tween(this.view).to({
        x: target.x - this.view.halfWidth,
        y: target.y - this.view.halfHeight
      }, duration).start();
    }
  }
};

Phaser.Camera.prototype.zoomToFollow = function (scale, duration, target) {
  this.follow(target);
  this.zoomTo(scale, duration);
};

function Game() {}

Game.prototype = {
  create: function create() {
    cursors = this.game.input.keyboard.createCursorKeys();
    this.game.world.setBounds(-mapSizeX, -mapSizeY, mapSizeX * 2, mapSizeY * 2);
    this.game.renderer.renderSession.roundPixels = true;

    this.galaxy = new _collectionsSystems2['default'](_utilWorldscale2['default']);
    this.galaxy2 = new _collectionsSystems2['default'](_utilWorldscale2['default']);

    this.views = [];
    this.views.push(new _viewsSystems2['default'](this.game, this.galaxy, _utilWorldscale2['default']));
    this.views.push(new _viewsSystems2['default'](this.game, this.galaxy2, _utilWorldscale2['default']));

    this.simulator = new _sim2['default']([this.galaxy]);
    this.simulator.start();

    this.game.camera.focusOnXY(0, 0);
  },

  update: function update() {
    if (cursors.up.isDown) {
      this.game.camera.y -= 10;
    } else if (cursors.down.isDown) {
      this.game.camera.y += 10;
    }

    if (cursors.left.isDown) {
      this.game.camera.x -= 10;
    } else if (cursors.right.isDown) {
      this.game.camera.x += 10;
    }

    if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown) {
      this.game.camera.target = null;
    }

    // zoom
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
      this.game.camera.zoomTo(_utilWorldscale2['default'].plus(0.05));
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.game.camera.zoomTo(_utilWorldscale2['default'].minus(0.05));
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var view = _step.value;

        if (view.update && typeof view.update === 'function') {
          view.update(_utilWorldscale2['default'].get());
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },

  render: function render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00');
    // Camera
    this.game.debug.cameraInfo(this.game.camera, 2, 30);
    this.game.debug.text('worldScale: ' + _utilWorldscale2['default'], 2, 120);
    this.game.debug.text('camera centerX: ' + this.camera.view.centerX + ', camera centerY: ' + this.camera.view.centerY, 2, 240);
  }
};

exports['default'] = Game;
module.exports = exports['default'];

},{"./collections/systems":2,"./models/system":7,"./sim":9,"./util/worldscale":12,"./views/planet":14,"./views/system":15,"./views/systems":16}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _boot = require('./boot');

var _boot2 = _interopRequireDefault(_boot);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _preloader = require('./preloader');

var _preloader2 = _interopRequireDefault(_preloader);

window.addEventListener('load', function () {
  'use strict';

  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-game');
  game.state.add('boot', _boot2['default']);
  game.state.add('preloader', _preloader2['default']);
  game.state.add('menu', _menu2['default']);
  game.state.add('game', _game2['default']);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('game');
}, false);

},{"./boot":1,"./game":3,"./menu":5,"./preloader":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function Menu() {}

Menu.prototype = {
  create: function create() {
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', { font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
    this.input.onDown.add(this.onDown, this);
  },

  update: function update() {},

  onDown: function onDown() {
    this.game.state.start('game');
  }
};

exports['default'] = Menu;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tools = require('../tools');

var Planet = (function () {
  function Planet(system) {
    _classCallCheck(this, Planet);

    this.system = system;

    this.pos = {
      x: 0,
      y: 0,
      r: this.system.randomRadius(),
      a: (0, _tools.getRandom)(0, 360),
      v: 0.000001 * (0, _tools.getRandom)(25, 75), // Velocity of planet per ms
      size: (0, _tools.getRandom)(5, 15)
    };
  }

  _createClass(Planet, [{
    key: 'physics',
    value: function physics(elapsedTime) {
      var a = this.pos.a,
          v = this.pos.v * elapsedTime,
          r = this.pos.r;

      this.pos.a = (a + v) % 360;
      this.pos.x = this.system.x + r * Math.cos(a);
      this.pos.y = this.system.y + r * Math.sin(a);
    }
  }, {
    key: 'update',
    value: function update(elapsedTime) {
      this.physics(elapsedTime);
    }
  }, {
    key: 'x',
    get: function () {
      return this.pos.x;
    }
  }, {
    key: 'y',
    get: function () {
      return this.pos.y;
    }
  }, {
    key: 'a',
    get: function () {
      return this.pos.a;
    }
  }, {
    key: 'size',
    get: function () {
      return this.pos.size;
    }
  }, {
    key: 'radius',
    get: function () {
      return this.pos.r;
    }
  }]);

  return Planet;
})();

exports['default'] = Planet;
module.exports = exports['default'];

},{"../tools":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _planet = require('./planet');

var _planet2 = _interopRequireDefault(_planet);

var _tools = require('../tools');

var System = (function () {
  function System(x, y) {
    var nPlanets = arguments[2] === undefined ? (0, _tools.getRandom)(1, 5) : arguments[2];

    _classCallCheck(this, System);

    var radius = (0, _tools.getRandom)(100, 250);

    this.point = new Phaser.Point(x, y);
    this.pos = {
      z: Math.round((0, _tools.getRandom)(1, 5)),
      size: (0, _tools.getRandom)(1, 5),
      radius: radius
    };
    this.planets = [];

    for (var i = 0; i < nPlanets; i++) {
      this.planets[i] = new _planet2['default'](this);
    }
  }

  _createClass(System, [{
    key: 'randomRadius',
    value: function randomRadius() {
      var _this = this;

      var r;

      var gen = function gen() {
        return 0.05 * _this.radius + 0.41 * (0, _tools.getRandom)(0, _this.radius);
      };

      if (this.planets.length === 0) {
        return gen();
      }

      var spacing = this.radius * 0.03,
          ok = false;

      while (this.planets.length > 0 && !ok) {
        ok = true;
        r = gen();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.planets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var planet = _step.value;

            var dd = Math.abs(planet.radius - r);
            if (dd < spacing) {
              ok = false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return r;
    }
  }, {
    key: 'update',
    value: function update(elapsedTime) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.planets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var planet = _step2.value;

          planet.update(elapsedTime);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'x',
    get: function () {
      return this.point.x;
    }
  }, {
    key: 'y',
    get: function () {
      return this.point.y;
    }
  }, {
    key: 'z',
    get: function () {
      return this.pos.z;
    }
  }, {
    key: 'size',
    get: function () {
      return this.pos.size;
    }
  }, {
    key: 'width',
    get: function () {
      return this.pos.radius;
    }
  }, {
    key: 'height',
    get: function () {
      return this.pos.radius;
    }
  }, {
    key: 'radius',
    get: function () {
      return this.pos.radius;
    }
  }]);

  return System;
})();

exports['default'] = System;
module.exports = exports['default'];

},{"../tools":10,"./planet":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function Preloader() {
  this.asset = null;
  this.ready = false;
}

Preloader.prototype = {
  preload: function preload() {
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.loadResources();

    this.ready = true;
  },

  loadResources: function loadResources() {},

  create: function create() {},

  update: function update() {
    // if (!!this.ready) {
    this.game.state.start('menu');
    // }
  },

  onLoadComplete: function onLoadComplete() {}
};

exports['default'] = Preloader;
module.exports = exports['default'];

// load your assets here

// this.ready = true;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = {
	speed: 4,
	maxSpeed: 4,
	stepTime: 1000 / 30 // Set simulator to 30hz
};

var Simulator = (function () {
	function Simulator() {
		var simObjs = arguments[0] === undefined ? [] : arguments[0];
		var options = arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, Simulator);

		this.objs = simObjs;

		this._speed = options.speed || config.speed;
		this._stepTime = options.stepTime || config.stepTime;
	}

	_createClass(Simulator, [{
		key: 'start',
		value: function start() {
			this.lastTime = Date.now();
			this.timerID = setInterval(this.step.bind(this), this._stepTime);
		}
	}, {
		key: 'stop',
		value: function stop() {
			if (this.timerID) {
				clearInterval(this.timerID);
				this.timerID = undefined;
			}
		}
	}, {
		key: 'step',
		value: function step() {
			var currentTime = Date.now();
			var elapsedTime = (currentTime - this.lastTime) * this._speed;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var simObject = _step.value;

					if (simObject.update && typeof simObject.update === 'function') {
						simObject.update(elapsedTime);
					} else {
						console.error('Simobject', simObject, 'does not have a function update');
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.lastTime = Date.now();
		}
	}, {
		key: 'add',
		value: function add(simObject) {
			this.objs.push(simObject);
		}
	}, {
		key: 'speed',
		set: function (s) {
			this._speed = Phaser.Math.clamp(s, 0, config.maxSpeed);
		}
	}]);

	return Simulator;
})();

exports['default'] = Simulator;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRandom = getRandom;
exports.getRandomNonUniform = getRandomNonUniform;
exports.getRandomNonUniformInv = getRandomNonUniformInv;
exports.getRandomInt = getRandomInt;

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomNonUniform(min, max) {
	var r = getRandom(min * (min + 1) / 2, max * (max + 1) / 2);
	return Math.ceil((Math.sqrt(8 * r + 1) - 1) / 2);
}

function getRandomNonUniformInv(min, max) {
	return Math.abs(getRandomNonUniform(min, max) - max);
}

function getRandomInt(min, max) {
	return Math.round(getRandom(min, max));
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = (function () {
	function Event() {
		_classCallCheck(this, Event);

		this.events = {};
	}

	_createClass(Event, [{
		key: "on",
		value: function on(name, callback) {
			if (this.events.hasOwnProperty(name)) {
				this.events[name].push(callback);
			} else {
				this.events[name] = [callback];
			}
		}
	}, {
		key: "trigger",
		value: function trigger(name) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (this.events.hasOwnProperty(name)) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.events[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var cb = _step.value;

						cb.apply(undefined, args);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}
	}]);

	return Event;
})();

exports["default"] = Event;
module.exports = exports["default"];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var WorldScale = (function (_Event) {
  function WorldScale() {
    _classCallCheck(this, WorldScale);

    _get(Object.getPrototypeOf(WorldScale.prototype), 'constructor', this).apply(this, arguments);
    this.scale = 1;
  }

  _inherits(WorldScale, _Event);

  _createClass(WorldScale, [{
    key: 'planetsVisible',
    value: function planetsVisible() {
      return this.scale > 1;
    }
  }, {
    key: 'plus',
    value: function plus(v) {
      this.set(this.scale + v);
      return this.scale;
    }
  }, {
    key: 'minus',
    value: function minus(v) {
      this.set(this.scale - v);
      return this.scale;
    }
  }, {
    key: 'multiply',
    value: function multiply(v) {
      this.set(this.scale * v);
      return this.scale;
    }
  }, {
    key: 'get',
    value: function get() {
      return this.scale;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '' + this.scale;
    }
  }, {
    key: 'set',
    value: function set(v) {
      this.scale = Phaser.Math.clamp(v, 0.05, 8);

      this.trigger('resize', this.scale);

      return this.scale;
    }
  }]);

  return WorldScale;
})(_event2['default']);

exports['default'] = new WorldScale();
module.exports = exports['default'];

},{"./event":11}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = (function () {
	function View(game, model, worldScale) {
		_classCallCheck(this, View);

		this.game = game;
		this.model = model;
		this.worldScale = worldScale;
	}

	_createClass(View, [{
		key: "focus",
		value: function focus() {
			var scale = arguments[0] === undefined ? 8 : arguments[0];
			var duration = arguments[1] === undefined ? null : arguments[1];

			this.game.camera.zoomTo(this.worldScale.set(scale), duration, this.el.position);
		}
	}, {
		key: "focusFollow",
		value: function focusFollow() {
			var scale = arguments[0] === undefined ? 8 : arguments[0];
			var duration = arguments[1] === undefined ? null : arguments[1];

			this.game.camera.zoomTo(this.worldScale.set(scale), duration);
			this.game.camera.follow(this.el);
		}
	}]);

	return View;
})();

exports["default"] = View;
module.exports = exports["default"];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function renderPath(ctx, radius, scale) {
	ctx.clear();
	ctx.lineStyle(1, 11184810, 0.6);
	ctx.drawCircle(0, 0, radius * 2 * scale);
}

var PlanetView = (function (_View) {
	function PlanetView(game, model) {
		_classCallCheck(this, PlanetView);

		_get(Object.getPrototypeOf(PlanetView.prototype), 'constructor', this).apply(this, arguments);
		this.center = { x: model.system.x, y: model.system.y };

		this.init(game);
		this.handlers();
	}

	_inherits(PlanetView, _View);

	_createClass(PlanetView, [{
		key: 'init',
		value: function init(game) {
			var ctx = game.add.graphics(0, 0);
			ctx.beginFill(16777215, 1);
			ctx.drawCircle(0, 0, this.model.size);
			ctx.endFill();

			var path = game.add.graphics(this.center.x, this.center.y);
			renderPath(path, this.model.radius, 1);

			this.el = game.add.sprite(0, 0);
			this.el.addChild(ctx);
			this.path = path;

			this.el.inputEnabled = true;
		}
	}, {
		key: 'handlers',
		value: function handlers() {
			var _this = this;

			this.el.events.onInputDown.add(function () {
				return _this.focusFollow(8, 1000);
			});
		}
	}, {
		key: 'update',
		value: function update() {
			this.el.visible = this.worldScale.get() >= 0.5;
			this.path.visible = this.worldScale.get() >= 0.5;

			this.el.x = this.model.x;
			this.el.y = this.model.y;
		}
	}]);

	return PlanetView;
})(_base2['default']);

exports['default'] = PlanetView;
module.exports = exports['default'];

},{"./base":13}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var SystemView = (function (_View) {
	function SystemView(game) {
		_classCallCheck(this, SystemView);

		_get(Object.getPrototypeOf(SystemView.prototype), 'constructor', this).apply(this, arguments);

		this.init(game);
		this.handlers();
	}

	_inherits(SystemView, _View);

	_createClass(SystemView, [{
		key: 'init',
		value: function init(game) {
			var ctx = game.add.graphics(0, 0);
			ctx.beginFill(16777215, 1);
			ctx.drawCircle(0, 0, this.model.size);

			this.el = game.add.sprite(this.model.x, this.model.y);
			this.el.addChild(ctx);
		}
	}, {
		key: 'handlers',
		value: function handlers() {
			var _this = this;

			this.el.events.onInputDown.add(function () {
				return _this.focus(8, 1000);
			});
		}
	}]);

	return SystemView;
})(_base2['default']);

exports['default'] = SystemView;
module.exports = exports['default'];

},{"./base":13}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var MAX_Z = 5;

function zAlpha(z) {
	return z / MAX_Z;
}

var lastScale = 1;

var SystemsView = (function (_Base) {
	function SystemsView() {
		_classCallCheck(this, SystemsView);

		_get(Object.getPrototypeOf(SystemsView.prototype), 'constructor', this).apply(this, arguments);
		this.init(this.game);

		lastScale = this.worldScale.get();
		this.worldScale.on('resize', this.resize.bind(this));
	}

	_inherits(SystemsView, _Base);

	_createClass(SystemsView, [{
		key: 'init',
		value: function init(game) {
			this.ctx = game.add.graphics(0, 0);
			this.redraw();
		}
	}, {
		key: 'redraw',
		value: function redraw() {
			var all = arguments[0] === undefined ? true : arguments[0];

			this.ctx.clear();

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.model.systems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var system = _step.value;

					if (all || system.z === MAX_Z) {
						this.ctx.beginFill(16777215, 1);

						var scalePoint = new Phaser.Point(this.worldScale.get(), this.worldScale.get());
						var point = Phaser.Point.multiply(system.point, scalePoint);

						this.ctx.drawCircle(point.x, point.y, system.size);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'resize',
		value: function resize(scale) {
			this.redraw();
			// if(scale >= 2 && lastScale < 2) {
			// 	this.redraw(false);
			// } else if(scale < 2 && lastScale >= 2) {
			// 	this.redraw();
			// }

			lastScale = scale;
		}
	}]);

	return SystemsView;
})(_base2['default']);

exports['default'] = SystemsView;
module.exports = exports['default'];

},{"./base":13}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL2Jvb3QuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL2NvbGxlY3Rpb25zL3N5c3RlbXMuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL2dhbWUuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL21haW4uanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL21lbnUuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL21vZGVscy9wbGFuZXQuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL21vZGVscy9zeXN0ZW0uanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL3ByZWxvYWRlci5qcyIsIi9Vc2Vycy9tYXR0aGlzay9SZXBvc2l0b3JpZXMvSmF2YXNjcmlwdC9zcGFjZS9zcmMvanMvc2ltLmpzIiwiL1VzZXJzL21hdHRoaXNrL1JlcG9zaXRvcmllcy9KYXZhc2NyaXB0L3NwYWNlL3NyYy9qcy90b29scy5qcyIsIi9Vc2Vycy9tYXR0aGlzay9SZXBvc2l0b3JpZXMvSmF2YXNjcmlwdC9zcGFjZS9zcmMvanMvdXRpbC9ldmVudC5qcyIsIi9Vc2Vycy9tYXR0aGlzay9SZXBvc2l0b3JpZXMvSmF2YXNjcmlwdC9zcGFjZS9zcmMvanMvdXRpbC93b3JsZHNjYWxlLmpzIiwiL1VzZXJzL21hdHRoaXNrL1JlcG9zaXRvcmllcy9KYXZhc2NyaXB0L3NwYWNlL3NyYy9qcy92aWV3cy9iYXNlLmpzIiwiL1VzZXJzL21hdHRoaXNrL1JlcG9zaXRvcmllcy9KYXZhc2NyaXB0L3NwYWNlL3NyYy9qcy92aWV3cy9wbGFuZXQuanMiLCIvVXNlcnMvbWF0dGhpc2svUmVwb3NpdG9yaWVzL0phdmFzY3JpcHQvc3BhY2Uvc3JjL2pzL3ZpZXdzL3N5c3RlbS5qcyIsIi9Vc2Vycy9tYXR0aGlzay9SZXBvc2l0b3JpZXMvSmF2YXNjcmlwdC9zcGFjZS9zcmMvanMvdmlld3Mvc3lzdGVtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7QUFFYixTQUFTLElBQUksR0FBRyxFQUFFOztBQUVsQixJQUFJLENBQUMsU0FBUyxHQUFHO0FBQ2YsU0FBTyxFQUFFLG1CQUFZO0FBQ25CLFFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0dBQ3REOztBQUVELFFBQU0sRUFBRSxrQkFBWTs7QUFFbEIsUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7QUFFaEMsUUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDNUIsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0tBQzlDLE1BQU07QUFDTCxVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7QUFDekQsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFJLEdBQUcsQ0FBQztBQUNoQyxVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ2hDLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFDL0IsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUNoQyxVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDO0FBQ0QsUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQ3BDO0NBQ0YsQ0FBQzs7cUJBRWEsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs0QkM3QkEsa0JBQWtCOzs7O3FCQUNnQixVQUFVOztBQUUvRCxJQUFJLFFBQVEsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxDQUFDOztBQUVSLFNBQVMsYUFBYSxDQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUc7QUFDN0MsS0FBSSxDQUFDLEdBQUcsQUFBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsR0FBSSxRQUFRO0tBQzdCLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRVosTUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsQyxNQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBSSxJQUFJLEdBQUMsQ0FBQyxBQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUd4RixPQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BDLE9BQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFdBbEJyQyxzQkFBc0IsRUFrQnNDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUM7QUFDekYsT0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLE9BQUksSUFBSSxHQUFHLEFBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUksVUFBVSxDQUFDO0FBQ3pELE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV0QyxRQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2pCO0VBQ0Q7O0FBRUQsUUFBTyxLQUFLLENBQUM7Q0FDYjs7SUFFb0IsaUJBQWlCO0FBQzFCLFVBRFMsaUJBQWlCLENBQ3hCLFVBQVUsRUFBbUI7TUFBakIsUUFBUSxnQ0FBRyxHQUFHOzt3QkFEbkIsaUJBQWlCOztBQUVwQyxNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixNQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDbEIsTUFBSSxDQUFDLElBQUksQ0FBRSxRQUFRLENBQUUsQ0FBQztFQUN0Qjs7Y0FObUIsaUJBQWlCOztTQVEzQixzQkFBRztBQUNaLFdBQVEsR0FBRyxXQXZDb0IsWUFBWSxFQXVDbkIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLFNBQU0sR0FBRyxXQXhDc0IsWUFBWSxFQXdDckIsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFdBQVEsR0FBRyxFQUFFLENBQUM7QUFDZCxhQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7QUFDdkIsT0FBSSxHQUFHLEdBQUcsQ0FBQztBQUNYLFNBQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ2hDOzs7U0FFRyxjQUFFLFFBQVEsRUFBRztBQUNoQixPQUFJLFdBQVcsR0FBRyxRQUFRLEdBQUcsUUFBUTtPQUNwQyxLQUFLLEdBQUcsYUFBYSxDQUFFLE1BQU0sRUFBRSxXQUFXLENBQUUsQ0FBQzs7Ozs7OztBQUU5Qyx5QkFBZ0IsS0FBSyw4SEFBRTtTQUFmLElBQUk7O0FBQ1gsU0FBSSxNQUFNLEdBQUcsOEJBQVksSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUM7QUFDMUMsU0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUI7Ozs7Ozs7Ozs7Ozs7OztHQUNEOzs7U0FFSyxnQkFBRSxXQUFXLEVBQUc7QUFDckIsT0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUFHOzs7Ozs7QUFDdEMsMkJBQWtCLElBQUksQ0FBQyxPQUFPLG1JQUFFO1VBQXhCLE1BQU07O0FBQ2IsWUFBTSxDQUFDLE1BQU0sQ0FBRSxXQUFXLENBQUUsQ0FBQztNQUM3Qjs7Ozs7Ozs7Ozs7Ozs7O0lBQ0Q7R0FDRDs7O1FBakNtQixpQkFBaUI7OztxQkFBakIsaUJBQWlCOzs7Ozs7Ozs7Ozs7MkJDL0JmLGdCQUFnQjs7OzsyQkFDaEIsZ0JBQWdCOzs7OzRCQUNmLGlCQUFpQjs7Ozs0QkFDdEIsaUJBQWlCOzs7O21CQUNkLE9BQU87Ozs7a0NBQ0MsdUJBQXVCOzs7OzhCQUM5QixtQkFBbUI7Ozs7QUFFMUMsSUFBSSxRQUFRLEdBQUcsSUFBSTtJQUNmLFFBQVEsR0FBRyxJQUFJO0lBQ2YsT0FBTyxDQUFDOztBQUVaLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFTLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO0FBQy9ELE9BQUssR0FBRyxVQUFVLENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUUsQ0FBQzs7O0FBRzNDLE1BQUksQ0FBQyxNQUFNLEVBQUc7QUFDWixVQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUM7QUFDbEUsVUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkUsVUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDbEU7OztBQUdELE9BQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV4QyxNQUFJLENBQUUsUUFBUSxFQUFHO0FBQ2YsUUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO0dBQ2pDLE1BQU07QUFDTCxRQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkMsT0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSztLQUNuQixFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ3RCOztBQUVELE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3ZDLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUUsQ0FBQzs7QUFFbEcsTUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUc7QUFDakIsVUFBTSxDQUFDLFFBQVEsQ0FBRSxLQUFLLEVBQUUsS0FBSyxDQUFFLENBQUM7O0FBRWhDLFFBQUksQ0FBQyxRQUFRLEVBQUc7QUFDZCxVQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzdDLFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDL0MsTUFBTTtBQUNMLFVBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2hDLFNBQUMsRUFBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztBQUNsQyxTQUFDLEVBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7T0FDcEMsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN0QjtHQUNGO0NBQ0osQ0FBQzs7QUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsVUFBUyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtBQUN2RSxNQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLE1BQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQzlCLENBQUM7O0FBRUYsU0FBUyxJQUFJLEdBQUcsRUFDZjs7QUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHO0FBQ2YsUUFBTSxFQUFFLGtCQUFZO0FBQ2xCLFdBQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN0RCxRQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsUUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7O0FBRXBELFFBQUksQ0FBQyxNQUFNLEdBQUcsZ0VBQW1DLENBQUM7QUFDbEQsUUFBSSxDQUFDLE9BQU8sR0FBRyxnRUFBbUMsQ0FBQzs7QUFFbkQsUUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsOEJBQWlCLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sOEJBQWMsQ0FBRSxDQUFDO0FBQ3hFLFFBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDhCQUFpQixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLDhCQUFjLENBQUUsQ0FBQzs7QUFFekUsUUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDO0FBQ2hELFFBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRXZCLFFBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7R0FDakM7O0FBRUQsUUFBTSxFQUFFLGtCQUFZO0FBQ2xCLFFBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQ3JCO0FBQ0ksVUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1QixNQUNJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQzVCO0FBQ0ksVUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1Qjs7QUFFRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUN2QjtBQUNJLFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDNUIsTUFDSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUM3QjtBQUNJLFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDNUI7O0FBRUQsUUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRztBQUMxRixVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ2xDOzs7QUFHRCxRQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNwRCxVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbEQsTUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN6RCxVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7QUFFRCwyQkFBaUIsSUFBSSxDQUFDLEtBQUssOEhBQUc7WUFBckIsSUFBSTs7QUFDWCxZQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUNwRCxjQUFJLENBQUMsTUFBTSxDQUFFLDRCQUFXLEdBQUcsRUFBRSxDQUFFLENBQUM7U0FDakM7T0FDRjs7Ozs7Ozs7Ozs7Ozs7O0dBQ0Y7O0FBRUQsUUFBTSxFQUFFLGtCQUFXO0FBQ2pCLFFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRW5FLFFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSwrQ0FBOEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFELFFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksc0JBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sMEJBQXFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDMUg7Q0FDRixDQUFDOztxQkFFYSxJQUFJOzs7Ozs7OztvQkM3SEYsUUFBUTs7OztvQkFDUixRQUFROzs7O29CQUNSLFFBQVE7Ozs7eUJBQ0gsYUFBYTs7OztBQUVuQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQVk7QUFDMUMsY0FBWSxDQUFDOztBQUViLE1BQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDakUsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxvQkFBTyxDQUFDO0FBQzdCLE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcseUJBQVksQ0FBQztBQUN2QyxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLG9CQUFPLENBQUM7QUFDN0IsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxvQkFBTyxDQUFDOztBQUU3QixNQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMxQixFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztBQ2ZWLFNBQVMsSUFBSSxHQUFHLEVBQUU7O0FBRWxCLElBQUksQ0FBQyxTQUFTLEdBQUc7QUFDZixRQUFNLEVBQUUsa0JBQVk7QUFDbEIsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFDcEUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRO0tBQzlELENBQUMsQ0FBQztBQUNILFFBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQzFDOztBQUVELFFBQU0sRUFBRSxrQkFBWSxFQUVuQjs7QUFFRCxRQUFNLEVBQUUsa0JBQVk7QUFDbEIsUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQy9CO0NBQ0YsQ0FBQzs7cUJBRWEsSUFBSTs7Ozs7Ozs7Ozs7Ozs7cUJDcEJPLFVBQVU7O0lBRWYsTUFBTTtBQUNkLFdBRFEsTUFBTSxDQUNaLE1BQU0sRUFBRzswQkFESCxNQUFNOztBQUV2QixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsUUFBSSxDQUFDLEdBQUcsR0FBRztBQUNULE9BQUMsRUFBRSxDQUFDO0FBQ0osT0FBQyxFQUFFLENBQUM7QUFDSixPQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDN0IsT0FBQyxFQUFFLFdBVkEsU0FBUyxFQVVDLENBQUMsRUFBQyxHQUFHLENBQUM7QUFDbkIsT0FBQyxFQUFFLFFBQVEsR0FBRyxXQVhYLFNBQVMsRUFXWSxFQUFFLEVBQUMsRUFBRSxDQUFDO0FBQzlCLFVBQUksRUFBRSxXQVpILFNBQVMsRUFZSSxDQUFDLEVBQUMsRUFBRSxDQUFDO0tBQ3RCLENBQUM7R0FDSDs7ZUFaa0IsTUFBTTs7V0FjbEIsaUJBQUUsV0FBVyxFQUFHO0FBQ3JCLFVBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUNkLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXO1VBQzVCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFbkIsVUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksR0FBRyxDQUFDO0FBQzNCLFVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxBQUFDLENBQUM7QUFDL0MsVUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEFBQUMsQ0FBQztLQUNoRDs7O1dBRUssZ0JBQUUsV0FBVyxFQUFHO0FBQ3BCLFVBQUksQ0FBQyxPQUFPLENBQUUsV0FBVyxDQUFFLENBQUM7S0FDN0I7OztTQUVJLFlBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQUU7OztTQUN6QixZQUFHO0FBQUUsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUFFOzs7U0FDekIsWUFBRztBQUFFLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FBRTs7O1NBQ3RCLFlBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQUU7OztTQUMxQixZQUFHO0FBQUUsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUFFOzs7U0FoQ2hCLE1BQU07OztxQkFBTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O3NCQ0ZSLFVBQVU7Ozs7cUJBQ0gsVUFBVTs7SUFFZixNQUFNO0FBQ2QsV0FEUSxNQUFNLENBQ1osQ0FBQyxFQUFFLENBQUMsRUFBOEI7UUFBNUIsUUFBUSxnQ0FBRyxXQUh2QixTQUFTLEVBR3dCLENBQUMsRUFBQyxDQUFDLENBQUM7OzBCQUR6QixNQUFNOztBQUV4QixRQUFJLE1BQU0sR0FBRyxXQUpQLFNBQVMsRUFJUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRWhDLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxRQUFJLENBQUMsR0FBRyxHQUFHO0FBQ1QsT0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FSWCxTQUFTLEVBUVksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLFVBQUksRUFBRSxXQVRILFNBQVMsRUFTSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ3RCLFlBQU0sRUFBRSxNQUFNO0tBQ2QsQ0FBQztBQUNGLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztBQUVsQixTQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFHO0FBQ2hDLFVBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsd0JBQVksSUFBSSxDQUFFLENBQUM7S0FDdEM7R0FDRjs7ZUFma0IsTUFBTTs7V0FpQmIsd0JBQUc7OztBQUNkLFVBQUksQ0FBQyxDQUFDOztBQUVMLFVBQUksR0FBRyxHQUFHLFNBQU4sR0FBRyxHQUFTO0FBQ2hCLGVBQU8sQUFBQyxJQUFJLEdBQUcsTUFBSyxNQUFNLEdBQUssSUFBSSxHQUFHLFdBdkJqQyxTQUFTLEVBdUJrQyxDQUFDLEVBQUMsTUFBSyxNQUFNLENBQUMsQUFBQyxDQUFDO09BQ2hFLENBQUM7O0FBRUYsVUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDM0IsZUFBTyxHQUFHLEVBQUUsQ0FBQztPQUNkOztBQUVGLFVBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSTtVQUMvQixFQUFFLEdBQUcsS0FBSyxDQUFDOztBQUVaLGFBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFVBQUUsR0FBRyxJQUFJLENBQUM7QUFDVixTQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Ozs7OztBQUNWLCtCQUFtQixJQUFJLENBQUMsT0FBTyw4SEFBRztnQkFBekIsTUFBTTs7QUFDZCxnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLGdCQUFJLEVBQUUsR0FBRyxPQUFPLEVBQUc7QUFDbEIsZ0JBQUUsR0FBRyxLQUFLLENBQUM7YUFDWDtXQUNEOzs7Ozs7Ozs7Ozs7Ozs7T0FDRDs7QUFFRCxhQUFPLENBQUMsQ0FBQztLQUNUOzs7V0FFSyxnQkFBRSxXQUFXLEVBQUc7Ozs7OztBQUNwQiw4QkFBa0IsSUFBSSxDQUFDLE9BQU8sbUlBQUU7Y0FBeEIsTUFBTTs7QUFDWixnQkFBTSxDQUFDLE1BQU0sQ0FBRSxXQUFXLENBQUUsQ0FBQztTQUM5Qjs7Ozs7Ozs7Ozs7Ozs7O0tBQ0Y7OztTQUVJLFlBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUU7OztTQUMzQixZQUFHO0FBQUUsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUFFOzs7U0FDM0IsWUFBRztBQUFFLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FBRTs7O1NBQ3RCLFlBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQUU7OztTQUMzQixZQUFHO0FBQUUsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztLQUFFOzs7U0FDN0IsWUFBRztBQUFFLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7S0FBRTs7O1NBQzlCLFlBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0tBQUU7OztTQXpEckIsTUFBTTs7O3FCQUFOLE1BQU07Ozs7QUNIM0IsWUFBWSxDQUFDOzs7OztBQUViLFNBQVMsU0FBUyxHQUFHO0FBQ25CLE1BQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQ3BCOztBQUVELFNBQVMsQ0FBQyxTQUFTLEdBQUc7QUFDcEIsU0FBTyxFQUFFLG1CQUFZO0FBQ25CLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3BHLFFBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztBQUt2QyxRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztHQUNuQjs7QUFFRCxlQUFhLEVBQUUseUJBQVksRUFFMUI7O0FBRUQsUUFBTSxFQUFFLGtCQUFZLEVBRW5COztBQUVELFFBQU0sRUFBRSxrQkFBWTs7QUFFaEIsUUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztHQUVqQzs7QUFFRCxnQkFBYyxFQUFFLDBCQUFZLEVBRTNCO0NBQ0YsQ0FBQzs7cUJBRWEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckN4QixJQUFJLE1BQU0sR0FBRztBQUNaLE1BQUssRUFBRSxDQUFDO0FBQ1IsU0FBUSxFQUFFLENBQUM7QUFDWCxTQUFRLEVBQUUsSUFBSSxHQUFDLEVBQUU7QUFBQSxDQUNqQixDQUFDOztJQUVtQixTQUFTO0FBQ2xCLFVBRFMsU0FBUyxHQUNhO01BQTdCLE9BQU8sZ0NBQUcsRUFBRTtNQUFFLE9BQU8sZ0NBQUcsRUFBRTs7d0JBRG5CLFNBQVM7O0FBRTVCLE1BQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDOztBQUVwQixNQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztBQUM1QyxNQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUNyRDs7Y0FObUIsU0FBUzs7U0FReEIsaUJBQUc7QUFDUCxPQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMzQixPQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDakU7OztTQUVHLGdCQUFHO0FBQ04sT0FBSSxJQUFJLENBQUMsT0FBTyxFQUFHO0FBQ2xCLGlCQUFhLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO0FBQzlCLFFBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQ3pCO0dBQ0Q7OztTQUVHLGdCQUFHO0FBQ04sT0FBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdCLE9BQUksV0FBVyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUEsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0FBRTlELHlCQUFzQixJQUFJLENBQUMsSUFBSSw4SEFBRztTQUF6QixTQUFTOztBQUNqQixTQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksT0FBTyxTQUFTLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUMvRCxlQUFTLENBQUMsTUFBTSxDQUFFLFdBQVcsQ0FBRSxDQUFDO01BQ2hDLE1BQ0k7QUFDSixhQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsaUNBQWlDLENBQUMsQ0FBQztNQUN2RTtLQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsT0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7R0FDM0I7OztTQUVFLGFBQUUsU0FBUyxFQUFHO0FBQ2hCLE9BQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLFNBQVMsQ0FBRSxDQUFDO0dBQzVCOzs7T0FFUSxVQUFFLENBQUMsRUFBRztBQUFFLE9BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7R0FBRTs7O1FBeEN0RCxTQUFTOzs7cUJBQVQsU0FBUzs7Ozs7Ozs7O1FDTmQsU0FBUyxHQUFULFNBQVM7UUFJVCxtQkFBbUIsR0FBbkIsbUJBQW1CO1FBS25CLHNCQUFzQixHQUF0QixzQkFBc0I7UUFJdEIsWUFBWSxHQUFaLFlBQVk7O0FBYnJCLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDbEMsUUFBTyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQSxBQUFDLEdBQUcsR0FBRyxDQUFDO0NBQzFDOztBQUVNLFNBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUM3QyxLQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBQyxDQUFDLENBQUEsQUFBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUssR0FBRyxHQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekQsUUFBTyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBRSxDQUFDO0NBQzNDOztBQUVNLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNoRCxRQUFPLElBQUksQ0FBQyxHQUFHLENBQUUsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBRSxDQUFDO0NBQ3ZEOztBQUVNLFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDdEMsUUFBTyxJQUFJLENBQUMsS0FBSyxDQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQztDQUN6Qzs7Ozs7Ozs7Ozs7OztJQ2ZvQixLQUFLO0FBQ2QsVUFEUyxLQUFLLEdBQ1g7d0JBRE0sS0FBSzs7QUFFeEIsTUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7RUFDakI7O2NBSG1CLEtBQUs7O1NBS3ZCLFlBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRztBQUNwQixPQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBRSxFQUFHO0FBQ3hDLFFBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUMsSUFBSSxDQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ3JDLE1BQU07QUFDTixRQUFJLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBRSxHQUFHLENBQUUsUUFBUSxDQUFFLENBQUM7SUFDbkM7R0FDRDs7O1NBRU0saUJBQUUsSUFBSSxFQUFZO3FDQUFQLElBQUk7QUFBSixRQUFJOzs7QUFDckIsT0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBRSxJQUFJLENBQUUsRUFBRzs7Ozs7O0FBQ3hDLDBCQUFlLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLDhIQUFFO1VBQTNCLEVBQUU7O0FBQ1YsUUFBRSxrQkFBSyxJQUFJLENBQUUsQ0FBQztNQUNkOzs7Ozs7Ozs7Ozs7Ozs7SUFDRDtHQUNEOzs7UUFuQm1CLEtBQUs7OztxQkFBTCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNBUixTQUFTOzs7O0lBRXJCLFVBQVU7QUFDSCxXQURQLFVBQVUsR0FDQTswQkFEVixVQUFVOztBQUVaLCtCQUZFLFVBQVUsOENBRUgsU0FBUyxFQUFFO0FBQ3BCLFFBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0dBQ2hCOztZQUpHLFVBQVU7O2VBQVYsVUFBVTs7V0FNQSwwQkFBRztBQUNmLGFBQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDdkI7OztXQUVHLGNBQUMsQ0FBQyxFQUFFO0FBQ04sVUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7O1dBRUksZUFBQyxDQUFDLEVBQUU7QUFDUCxVQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekIsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7V0FFTyxrQkFBQyxDQUFDLEVBQUU7QUFDVixVQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekIsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7V0FFRSxlQUFHO0FBQ0osYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7V0FFTyxvQkFBRztBQUNULGtCQUFVLElBQUksQ0FBQyxLQUFLLENBQUc7S0FDeEI7OztXQUVFLGFBQUMsQ0FBQyxFQUFFO0FBQ0wsVUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUUzQyxVQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWxDLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7O1NBdkNHLFVBQVU7OztxQkEwQ0QsSUFBSSxVQUFVLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0lDNUNWLElBQUk7QUFDYixVQURTLElBQUksQ0FDWCxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRzt3QkFEbkIsSUFBSTs7QUFFdkIsTUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsTUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7RUFDN0I7O2NBTG1CLElBQUk7O1NBT25CLGlCQUErQjtPQUE3QixLQUFLLGdDQUFHLENBQUM7T0FBRSxRQUFRLGdDQUFHLElBQUk7O0FBQ2hDLE9BQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUUsQ0FBQztHQUNsRjs7O1NBRVUsdUJBQStCO09BQTdCLEtBQUssZ0NBQUcsQ0FBQztPQUFFLFFBQVEsZ0NBQUcsSUFBSTs7QUFDdEMsT0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBRSxDQUFDO0FBQ2hFLE9BQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFFLENBQUM7R0FDbkM7OztRQWRtQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQVIsUUFBUTs7OztBQUV6QixTQUFTLFVBQVUsQ0FBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRztBQUN6QyxJQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDWixJQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsSUFBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLENBQUM7Q0FDbkM7O0lBRW9CLFVBQVU7QUFDbkIsVUFEUyxVQUFVLENBQ2pCLElBQUksRUFBRSxLQUFLLEVBQUc7d0JBRFAsVUFBVTs7QUFFN0IsNkJBRm1CLFVBQVUsOENBRXBCLFNBQVMsRUFBRTtBQUNwQixNQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDOztBQUV4RCxNQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztFQUNoQjs7V0FQbUIsVUFBVTs7Y0FBVixVQUFVOztTQVMxQixjQUFFLElBQUksRUFBRztBQUNaLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixNQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixNQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxNQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRWQsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxhQUFVLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBRSxDQUFDOztBQUV6QyxPQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixPQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixPQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsT0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0dBQy9COzs7U0FFTyxvQkFBRzs7O0FBQ1YsT0FBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztXQUFNLE1BQUssV0FBVyxDQUFFLENBQUMsRUFBRSxJQUFJLENBQUU7SUFBQSxDQUFDLENBQUM7R0FDbEU7OztTQUVLLGtCQUFHO0FBQ1IsT0FBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUM7QUFDL0MsT0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUM7O0FBRWpELE9BQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLE9BQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0dBQ3pCOzs7UUFuQ21CLFVBQVU7OztxQkFBVixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNSZCxRQUFROzs7O0lBRUosVUFBVTtBQUNuQixVQURTLFVBQVUsQ0FDakIsSUFBSSxFQUFHO3dCQURBLFVBQVU7O0FBRTdCLDZCQUZtQixVQUFVLDhDQUVwQixTQUFTLEVBQUU7O0FBRXBCLE1BQUksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7QUFDbEIsTUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQ2hCOztXQU5tQixVQUFVOztjQUFWLFVBQVU7O1NBUTFCLGNBQUUsSUFBSSxFQUFHO0FBQ1osT0FBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNCLE1BQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV0QyxPQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsT0FBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDdEI7OztTQUVPLG9CQUFHOzs7QUFDVixPQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1dBQU0sTUFBSyxLQUFLLENBQUUsQ0FBQyxFQUFFLElBQUksQ0FBRTtJQUFBLENBQUMsQ0FBQztHQUM1RDs7O1FBbkJtQixVQUFVOzs7cUJBQVYsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDRmQsUUFBUTs7OztBQUV6QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRWQsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQ2xCLFFBQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUNqQjs7QUFFRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7O0lBQ0csV0FBVztBQUNwQixVQURTLFdBQVcsR0FDakI7d0JBRE0sV0FBVzs7QUFFOUIsNkJBRm1CLFdBQVcsOENBRXJCLFNBQVMsRUFBRTtBQUNwQixNQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQzs7QUFFdkIsV0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDcEQ7O1dBUG1CLFdBQVc7O2NBQVgsV0FBVzs7U0FTM0IsY0FBRSxJQUFJLEVBQUc7QUFDWixPQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxPQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDZDs7O1NBRUssa0JBQWE7T0FBWixHQUFHLGdDQUFHLElBQUk7O0FBQ2hCLE9BQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7QUFFakIseUJBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyw4SEFBRTtTQUE5QixNQUFNOztBQUNiLFNBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQzdCLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFaEMsVUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLFVBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsVUFBVSxDQUFDLENBQUM7O0FBRTNELFVBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDbkQ7S0FDRDs7Ozs7Ozs7Ozs7Ozs7O0dBQ0Q7OztTQUVLLGdCQUFDLEtBQUssRUFBRTtBQUNiLE9BQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztBQU9kLFlBQVMsR0FBRyxLQUFLLENBQUM7R0FDbEI7OztRQXRDbUIsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBCb290KCkge31cblxuQm9vdC5wcm90b3R5cGUgPSB7XG4gIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3ByZWxvYWRlcicsICdhc3NldHMvcHJlbG9hZGVyLmdpZicpO1xuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIGNvbmZpZ3VyZSBnYW1lXG4gICAgdGhpcy5nYW1lLmlucHV0Lm1heFBvaW50ZXJzID0gMTtcblxuICAgIGlmICh0aGlzLmdhbWUuZGV2aWNlLmRlc2t0b3ApIHtcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5taW5XaWR0aCA9ICA0ODA7XG4gICAgICB0aGlzLmdhbWUuc2NhbGUubWluSGVpZ2h0ID0gMjYwO1xuICAgICAgdGhpcy5nYW1lLnNjYWxlLm1heFdpZHRoID0gNjQwO1xuICAgICAgdGhpcy5nYW1lLnNjYWxlLm1heEhlaWdodCA9IDQ4MDtcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5mb3JjZU9yaWVudGF0aW9uKHRydWUpO1xuICAgICAgdGhpcy5nYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgICB0aGlzLmdhbWUuc2NhbGUuc2V0U2NyZWVuU2l6ZSh0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkZXInKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9vdDtcblxuIiwiaW1wb3J0IFN5c3RlbSBmcm9tICcuLi9tb2RlbHMvc3lzdGVtJztcbmltcG9ydCB7IGdldFJhbmRvbU5vblVuaWZvcm1JbnYsIGdldFJhbmRvbUludCB9IGZyb20gJy4uL3Rvb2xzJzsgXG5cbnZhciBhcm1Db3VudCxcblx0cmFkaXVzLFxuXHRjZW50cnVtUixcblx0c3BpbkZhY3Rvcixcblx0YXJtUixcblx0Y2VudGVyO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVN0YXJzKCBjZW50ZXIsIHN0YXJzUGVyQXJtICkge1xuXHR2YXIgciA9IChNYXRoLlBJKjIpIC8gYXJtQ291bnQsXG5cdFx0c3RhcnMgPSBbXTtcblxuXHRmb3IobGV0IGkgPSAxOyBpIDw9IGFybUNvdW50OyBpKyspIHtcblx0XHR2YXIgcmVjdCA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKGNlbnRlci54IC0gKGFybVIvMiksIGNlbnRlci55ICsgY2VudHJ1bVIsIGFybVIsIHJhZGl1cyk7XG5cblxuXHRcdGZvcihsZXQgaiA9IDA7IGogPCBzdGFyc1BlckFybTsgaisrKSB7XG5cdFx0XHR2YXIgc3RhciA9IG5ldyBQaGFzZXIuUG9pbnQoIHJlY3QucmFuZG9tWCwgZ2V0UmFuZG9tTm9uVW5pZm9ybUludihyZWN0LnksIHJlY3QuaGVpZ2h0KSApO1xuXHRcdFx0c3Rhci5yb3RhdGUoY2VudGVyLngsIGNlbnRlci55LCByICogaSk7XG5cdFx0XHR2YXIgc3BpbiA9IChzdGFyLmRpc3RhbmNlKGNlbnRlcikgLyByYWRpdXMpICogc3BpbkZhY3Rvcjtcblx0XHRcdHN0YXIucm90YXRlKGNlbnRlci54LCBjZW50ZXIueSwgc3Bpbik7XG5cblx0XHRcdHN0YXJzLnB1c2goc3Rhcik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHN0YXJzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW1zQ29sbGVjdGlvbiB7XG5cdGNvbnN0cnVjdG9yKCB3b3JsZFNjYWxlLCBuU3lzdGVtcyA9IDc5NiApIHtcblx0XHR0aGlzLndvcmxkU2NhbGUgPSB3b3JsZFNjYWxlO1xuXHRcdHRoaXMuc3lzdGVtcyA9IFtdO1xuXHRcdHRoaXMuaW5pdENvbmZpZygpO1xuXHRcdHRoaXMuaW5pdCggblN5c3RlbXMgKTtcblx0fVxuXG5cdGluaXRDb25maWcoKSB7XG5cdFx0YXJtQ291bnQgPSBnZXRSYW5kb21JbnQoNCw4KTtcblx0XHRyYWRpdXMgPSBnZXRSYW5kb21JbnQoMjAwMCw0MDAwKTtcblx0XHRjZW50cnVtUiA9IDUwO1xuXHRcdHNwaW5GYWN0b3IgPSBNYXRoLlBJLzM7XG5cdFx0YXJtUiA9IDgwMDtcblx0XHRjZW50ZXIgPSBuZXcgUGhhc2VyLlBvaW50KDAsIDApO1xuXHR9XG5cblx0aW5pdCggblN5c3RlbXMgKSB7XG5cdFx0dmFyIHN0YXJzUGVyQXJtID0gblN5c3RlbXMgLyBhcm1Db3VudCxcblx0XHRcdHN0YXJzID0gZ2VuZXJhdGVTdGFycyggY2VudGVyLCBzdGFyc1BlckFybSApO1xuXG5cdFx0Zm9yKGxldCBzdGFyIG9mIHN0YXJzKSB7XG5cdFx0XHR2YXIgc3lzdGVtID0gbmV3IFN5c3RlbSggc3Rhci54LCBzdGFyLnkgKTtcblx0XHRcdHRoaXMuc3lzdGVtcy5wdXNoKHN5c3RlbSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCBlbGFwc2VkVGltZSApIHtcblx0XHRpZiggdGhpcy53b3JsZFNjYWxlLnBsYW5ldHNWaXNpYmxlKCkgKSB7XG5cdFx0XHRmb3IobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbXMpIHtcblx0XHRcdFx0c3lzdGVtLnVwZGF0ZSggZWxhcHNlZFRpbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgUGxhbmV0VmlldyBmcm9tICcuL3ZpZXdzL3BsYW5ldCc7XG5pbXBvcnQgU3lzdGVtVmlldyBmcm9tICcuL3ZpZXdzL3N5c3RlbSc7XG5pbXBvcnQgU3lzdGVtc1ZpZXcgZnJvbSAnLi92aWV3cy9zeXN0ZW1zJztcbmltcG9ydCBTeXN0ZW0gZnJvbSAnLi9tb2RlbHMvc3lzdGVtJztcbmltcG9ydCBTaW11bGF0b3IgZnJvbSAnLi9zaW0nO1xuaW1wb3J0IFN5c3RlbXNDb2xsZWN0aW9uIGZyb20gJy4vY29sbGVjdGlvbnMvc3lzdGVtcyc7XG5pbXBvcnQgd29ybGRTY2FsZSBmcm9tICcuL3V0aWwvd29ybGRzY2FsZSc7XG5cbnZhciBtYXBTaXplWCA9IDgwMDAsXG4gICAgbWFwU2l6ZVkgPSA4MDAwLFxuICAgIGN1cnNvcnM7XG5cblBoYXNlci5DYW1lcmEucHJvdG90eXBlLnpvb21UbyA9IGZ1bmN0aW9uKHNjYWxlLCBkdXJhdGlvbiwgdGFyZ2V0KSB7XG4gICAgc2NhbGUgPSBwYXJzZUZsb2F0KCBzY2FsZS50b0ZpeGVkKDIpLCAxMCApOyAvLyBGaXggc2NhbGUgdG8gdHdvIGRlY2ltYWwgcG9pbnRzXG5cbiAgICAvLyBEZWZhdWx0IHRhcmdldCB0byBjZW50ZXIgb2YgdGhlIGNhbWVyYSB2aWV3XG4gICAgaWYoICF0YXJnZXQgKSB7XG4gICAgICB0YXJnZXQgPSBuZXcgUGhhc2VyLlBvaW50KCB0aGlzLnZpZXcuY2VudGVyWCwgdGhpcy52aWV3LmNlbnRlclkgKTtcbiAgICAgIHRhcmdldC5kaXZpZGUodGhpcy53b3JsZC53b3JsZFRyYW5zZm9ybS5hLHRoaXMud29ybGQud29ybGRUcmFuc2Zvcm0uZCk7XG4gICAgICB0YXJnZXQueCA9IE1hdGgucm91bmQodGFyZ2V0LngpOyB0YXJnZXQueSA9IE1hdGgucm91bmQodGFyZ2V0LnkpOyAvLyBUbyBhdm9pZCBmbG9hdGluZyBwcmVjaXNpb24gZXJyb3JzIGZyb20gc25lYWtpbmcgaW50byB6b29taW5nXG4gICAgfVxuXG4gICAgLy8gU2V0IG1heGltdW0gYW5kIG1pbmltdW0gem9vbSBsZXZlbFxuICAgIHNjYWxlID0gUGhhc2VyLk1hdGguY2xhbXAoc2NhbGUsMC4yNSw4KTtcblxuICAgIGlmKCAhIGR1cmF0aW9uICkge1xuICAgICAgdGhpcy53b3JsZC5zY2FsZS5zZXRUbyggc2NhbGUgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLndvcmxkLnNjYWxlKS50byh7XG4gICAgICAgIHg6IHNjYWxlLCB5OiBzY2FsZVxuICAgICAgfSwgZHVyYXRpb24pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMud29ybGQuYm91bmRzLmNsb25lKCk7XG4gICAgdGhpcy5ib3VuZHMgPSBib3VuZHMuaW5mbGF0ZSggdGhpcy53b3JsZC5ib3VuZHMud2lkdGggKiBzY2FsZSwgdGhpcy53b3JsZC5ib3VuZHMuaGVpZ2h0ICogc2NhbGUgKTtcblxuICAgIGlmKCAhdGhpcy50YXJnZXQgKSB7XG4gICAgICB0YXJnZXQubXVsdGlwbHkoIHNjYWxlLCBzY2FsZSApO1xuXG4gICAgICBpZiggIWR1cmF0aW9uICkge1xuICAgICAgICB0aGlzLnZpZXcueCA9IHRhcmdldC54IC0gdGhpcy52aWV3LmhhbGZXaWR0aDtcbiAgICAgICAgdGhpcy52aWV3LnkgPSB0YXJnZXQueSAtIHRoaXMudmlldy5oYWxmSGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLnZpZXcpLnRvKHtcbiAgICAgICAgICB4IDogdGFyZ2V0LnggLSB0aGlzLnZpZXcuaGFsZldpZHRoLFxuICAgICAgICAgIHkgOiB0YXJnZXQueSAtIHRoaXMudmlldy5oYWxmSGVpZ2h0XG4gICAgICAgIH0sIGR1cmF0aW9uKS5zdGFydCgpO1xuICAgICAgfVxuICAgIH1cbn07XG5cblBoYXNlci5DYW1lcmEucHJvdG90eXBlLnpvb21Ub0ZvbGxvdyA9IGZ1bmN0aW9uKHNjYWxlLCBkdXJhdGlvbiwgdGFyZ2V0KSB7XG4gIHRoaXMuZm9sbG93KHRhcmdldCk7XG4gIHRoaXMuem9vbVRvKHNjYWxlLCBkdXJhdGlvbik7XG59O1xuXG5mdW5jdGlvbiBHYW1lKCkge1xufVxuXG5HYW1lLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgY3Vyc29ycyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG4gICAgdGhpcy5nYW1lLndvcmxkLnNldEJvdW5kcygtbWFwU2l6ZVgsLW1hcFNpemVZLG1hcFNpemVYKjIsbWFwU2l6ZVkqMik7XG4gICAgdGhpcy5nYW1lLnJlbmRlcmVyLnJlbmRlclNlc3Npb24ucm91bmRQaXhlbHMgPSB0cnVlO1xuXG4gICAgdGhpcy5nYWxheHkgPSBuZXcgU3lzdGVtc0NvbGxlY3Rpb24oIHdvcmxkU2NhbGUgKTtcbiAgICB0aGlzLmdhbGF4eTIgPSBuZXcgU3lzdGVtc0NvbGxlY3Rpb24oIHdvcmxkU2NhbGUgKTtcblxuICAgIHRoaXMudmlld3MgPSBbXTtcbiAgICB0aGlzLnZpZXdzLnB1c2gobmV3IFN5c3RlbXNWaWV3KCB0aGlzLmdhbWUsIHRoaXMuZ2FsYXh5LCB3b3JsZFNjYWxlICkgKTtcbiAgICB0aGlzLnZpZXdzLnB1c2gobmV3IFN5c3RlbXNWaWV3KCB0aGlzLmdhbWUsIHRoaXMuZ2FsYXh5Miwgd29ybGRTY2FsZSApICk7XG5cbiAgICB0aGlzLnNpbXVsYXRvciA9IG5ldyBTaW11bGF0b3IoIFt0aGlzLmdhbGF4eV0gKTtcbiAgICB0aGlzLnNpbXVsYXRvci5zdGFydCgpO1xuXG4gICAgdGhpcy5nYW1lLmNhbWVyYS5mb2N1c09uWFkoMCwwKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24pXG4gICAge1xuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLnkgLT0gMTA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnNvcnMuZG93bi5pc0Rvd24pXG4gICAge1xuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLnkgKz0gMTA7XG4gICAgfVxuXG4gICAgaWYgKGN1cnNvcnMubGVmdC5pc0Rvd24pXG4gICAge1xuICAgICAgICB0aGlzLmdhbWUuY2FtZXJhLnggLT0gMTA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnNvcnMucmlnaHQuaXNEb3duKVxuICAgIHtcbiAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS54ICs9IDEwO1xuICAgIH1cblxuICAgIGlmKCBjdXJzb3JzLnVwLmlzRG93biB8fCBjdXJzb3JzLmRvd24uaXNEb3duIHx8IGN1cnNvcnMubGVmdC5pc0Rvd24gfHwgY3Vyc29ycy5yaWdodC5pc0Rvd24gKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEudGFyZ2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB6b29tXG4gICAgaWYgKHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLlEpKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuem9vbVRvKHdvcmxkU2NhbGUucGx1cygwLjA1KSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLkEpKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuem9vbVRvKHdvcmxkU2NhbGUubWludXMoMC4wNSkpO1xuICAgIH0gICAgXG5cbiAgICBmb3IoIGxldCB2aWV3IG9mIHRoaXMudmlld3MgKSB7XG4gICAgICBpZiggdmlldy51cGRhdGUgJiYgdHlwZW9mIHZpZXcudXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZpZXcudXBkYXRlKCB3b3JsZFNjYWxlLmdldCgpICk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzIHx8ICctLScsIDIsIDE0LCAnIzAwZmYwMCcpO1xuICAgIC8vIENhbWVyYVxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy5jYW1lcmFJbmZvKHRoaXMuZ2FtZS5jYW1lcmEsIDIsIDMwKTtcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dChgd29ybGRTY2FsZTogJHt3b3JsZFNjYWxlfWAsIDIsIDEyMCk7XG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQoYGNhbWVyYSBjZW50ZXJYOiAke3RoaXMuY2FtZXJhLnZpZXcuY2VudGVyWH0sIGNhbWVyYSBjZW50ZXJZOiAke3RoaXMuY2FtZXJhLnZpZXcuY2VudGVyWX1gLCAyLCAyNDApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcbmltcG9ydCBCb290IGZyb20gJy4vYm9vdCc7XG5pbXBvcnQgTWVudSBmcm9tICcuL21lbnUnO1xuaW1wb3J0IFByZWxvYWRlciBmcm9tICcuL3ByZWxvYWRlcic7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTAyNCwgNzY4LCBQaGFzZXIuQVVUTywgJ3NwYWNlLWdhbWUnKTtcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbiAgZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWRlcicsIFByZWxvYWRlcik7XG4gIGdhbWUuc3RhdGUuYWRkKCdtZW51JywgTWVudSk7XG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgR2FtZSk7XG4gIC8qIHlvIHBoYXNlcjpzdGF0ZSBuZXctc3RhdGUtZmlsZXMtcHV0LWhlcmUgKi9cbiAgZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xufSwgZmFsc2UpO1xuIiwiZnVuY3Rpb24gTWVudSgpIHt9XG5cbk1lbnUucHJvdG90eXBlID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGV4dCA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoICogMC41LCB0aGlzLmdhbWUuaGVpZ2h0ICogMC41LFxuICAgICAgJ01FTlUnLCB7Zm9udDogJzQycHggQXJpYWwnLCBmaWxsOiAnI2ZmZmZmZicsIGFsaWduOiAnY2VudGVyJ1xuICAgIH0pO1xuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xuICAgIHRoaXMuaW5wdXQub25Eb3duLmFkZCh0aGlzLm9uRG93biwgdGhpcyk7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICBvbkRvd246IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWVudTtcbiIsImltcG9ydCB7IGdldFJhbmRvbSB9IGZyb20gJy4uL3Rvb2xzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhbmV0IHtcbiAgY29uc3RydWN0b3IoIHN5c3RlbSApIHtcbiAgICB0aGlzLnN5c3RlbSA9IHN5c3RlbTtcblxuICAgIHRoaXMucG9zID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICByOiB0aGlzLnN5c3RlbS5yYW5kb21SYWRpdXMoKSxcbiAgICAgIGE6IGdldFJhbmRvbSgwLDM2MCksXG4gICAgICB2OiAwLjAwMDAwMSAqIGdldFJhbmRvbSgyNSw3NSksIC8vIFZlbG9jaXR5IG9mIHBsYW5ldCBwZXIgbXNcbiAgICAgIHNpemU6IGdldFJhbmRvbSg1LDE1KVxuICAgIH07XG4gIH1cblxuICBwaHlzaWNzKCBlbGFwc2VkVGltZSApIHtcbiAgICB2YXIgYSA9IHRoaXMucG9zLmEsXG4gICAgICAgIHYgPSB0aGlzLnBvcy52ICogZWxhcHNlZFRpbWUsXG4gICAgICAgIHIgPSB0aGlzLnBvcy5yO1xuXG4gICAgdGhpcy5wb3MuYSA9IChhICsgdikgJSAzNjA7XG4gICAgdGhpcy5wb3MueCA9ICh0aGlzLnN5c3RlbS54ICsgciAqIE1hdGguY29zKGEpKTtcbiAgICB0aGlzLnBvcy55ID0gKHRoaXMuc3lzdGVtLnkgKyByICogTWF0aC5zaW4oYSkpO1xuICB9XG5cbiAgdXBkYXRlKCBlbGFwc2VkVGltZSApIHtcbiAgICB0aGlzLnBoeXNpY3MoIGVsYXBzZWRUaW1lICk7XG4gIH1cblxuICBnZXQgeCgpIHsgcmV0dXJuIHRoaXMucG9zLng7IH1cbiAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLnBvcy55OyB9XG4gIGdldCBhKCkgeyByZXR1cm4gdGhpcy5wb3MuYTsgfVxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIHRoaXMucG9zLnNpemU7IH1cbiAgZ2V0IHJhZGl1cygpIHsgcmV0dXJuIHRoaXMucG9zLnI7IH1cbn0iLCJpbXBvcnQgUGxhbmV0IGZyb20gJy4vcGxhbmV0JztcbmltcG9ydCB7IGdldFJhbmRvbSB9IGZyb20gJy4uL3Rvb2xzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtIHtcbiAgY29uc3RydWN0b3IoIHgsIHksIG5QbGFuZXRzID0gZ2V0UmFuZG9tKDEsNSkgKSB7XG4gIFx0dmFyIHJhZGl1cyA9IGdldFJhbmRvbSgxMDAsIDI1MCk7XG5cbiAgICB0aGlzLnBvaW50ID0gbmV3IFBoYXNlci5Qb2ludCh4LHkpO1xuICAgIHRoaXMucG9zID0geyBcbiAgICAgIHo6IE1hdGgucm91bmQoZ2V0UmFuZG9tKDEsNSkpLFxuICAgICAgc2l6ZTogZ2V0UmFuZG9tKDEsNSksXG4gIFx0XHRyYWRpdXM6IHJhZGl1cyBcbiAgXHR9O1xuICBcdHRoaXMucGxhbmV0cyA9IFtdO1xuXG4gIFx0Zm9yKGxldCBpID0gMDsgaSA8IG5QbGFuZXRzOyBpKysgKSB7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0gPSBuZXcgUGxhbmV0KCB0aGlzICk7XG4gICAgfVxuICB9XG5cbiAgcmFuZG9tUmFkaXVzKCkge1xuICBcdHZhciByO1xuXG4gICAgdmFyIGdlbiA9ICgpID0+IHtcbiAgXHRcdHJldHVybiAoMC4wNSAqIHRoaXMucmFkaXVzKSArICgwLjQxICogZ2V0UmFuZG9tKDAsdGhpcy5yYWRpdXMpKTtcbiAgXHR9O1xuXG4gIFx0aWYodGhpcy5wbGFuZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGdlbigpO1xuICAgIH1cblxuICBcdHZhciBzcGFjaW5nID0gdGhpcy5yYWRpdXMgKiAwLjAzLFxuICBcdFx0b2sgPSBmYWxzZTtcblxuICBcdHdoaWxlKHRoaXMucGxhbmV0cy5sZW5ndGggPiAwICYmICFvaykge1xuICBcdFx0b2sgPSB0cnVlO1xuICBcdFx0ciA9IGdlbigpO1xuICBcdFx0Zm9yKCBsZXQgcGxhbmV0IG9mIHRoaXMucGxhbmV0cyApIHtcbiAgXHRcdFx0dmFyIGRkID0gTWF0aC5hYnMocGxhbmV0LnJhZGl1cyAtIHIpO1xuICBcdFx0XHRpZiggZGQgPCBzcGFjaW5nICkge1xuICBcdFx0XHRcdG9rID0gZmFsc2U7XG4gIFx0XHRcdH1cbiAgXHRcdH1cbiAgXHR9XG5cbiAgXHRyZXR1cm4gcjtcbiAgfVxuXG4gIHVwZGF0ZSggZWxhcHNlZFRpbWUgKSB7XG4gICAgZm9yKGxldCBwbGFuZXQgb2YgdGhpcy5wbGFuZXRzKSB7XG4gICAgICBwbGFuZXQudXBkYXRlKCBlbGFwc2VkVGltZSApO1xuICAgIH1cbiAgfVxuXG4gIGdldCB4KCkgeyByZXR1cm4gdGhpcy5wb2ludC54OyB9XG4gIGdldCB5KCkgeyByZXR1cm4gdGhpcy5wb2ludC55OyB9XG4gIGdldCB6KCkgeyByZXR1cm4gdGhpcy5wb3MuejsgfVxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIHRoaXMucG9zLnNpemU7IH1cbiAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gdGhpcy5wb3MucmFkaXVzOyB9XG4gIGdldCBoZWlnaHQoKSB7IHJldHVybiB0aGlzLnBvcy5yYWRpdXM7IH1cbiAgZ2V0IHJhZGl1cygpIHsgcmV0dXJuIHRoaXMucG9zLnJhZGl1czsgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBQcmVsb2FkZXIoKSB7XG4gIHRoaXMuYXNzZXQgPSBudWxsO1xuICB0aGlzLnJlYWR5ID0gZmFsc2U7XG59XG5cblByZWxvYWRlci5wcm90b3R5cGUgPSB7XG4gIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2V0ID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuZ2FtZS53aWR0aCAqIDAuNSAtIDExMCwgdGhpcy5nYW1lLmhlaWdodCAqIDAuNSAtIDEwLCAncHJlbG9hZGVyJyk7XG4gICAgdGhpcy5sb2FkLnNldFByZWxvYWRTcHJpdGUodGhpcy5hc3NldCk7XG5cbiAgICAvLyB0aGlzLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkT25jZSh0aGlzLm9uTG9hZENvbXBsZXRlLCB0aGlzKTtcbiAgICAvLyB0aGlzLmxvYWRSZXNvdXJjZXMoKTtcblxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICB9LFxuXG4gIGxvYWRSZXNvdXJjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBsb2FkIHlvdXIgYXNzZXRzIGhlcmVcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIGlmICghIXRoaXMucmVhZHkpIHtcbiAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnbWVudScpO1xuICAgIC8vIH1cbiAgfSxcblxuICBvbkxvYWRDb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIHRoaXMucmVhZHkgPSB0cnVlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcmVsb2FkZXI7XG4iLCJ2YXIgY29uZmlnID0ge1xuXHRzcGVlZDogNCxcblx0bWF4U3BlZWQ6IDQsXG5cdHN0ZXBUaW1lOiAxMDAwLzMwIC8vIFNldCBzaW11bGF0b3IgdG8gMzBoelxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdG9yIHtcblx0Y29uc3RydWN0b3IoIHNpbU9ianMgPSBbXSwgb3B0aW9ucyA9IHt9ICkge1xuXHRcdHRoaXMub2JqcyA9IHNpbU9ianM7XG5cblx0XHR0aGlzLl9zcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgY29uZmlnLnNwZWVkO1xuXHRcdHRoaXMuX3N0ZXBUaW1lID0gb3B0aW9ucy5zdGVwVGltZSB8fCBjb25maWcuc3RlcFRpbWU7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHR0aGlzLmxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblx0XHR0aGlzLnRpbWVySUQgPSBzZXRJbnRlcnZhbCh0aGlzLnN0ZXAuYmluZCh0aGlzKSwgdGhpcy5fc3RlcFRpbWUpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHRpZiggdGhpcy50aW1lcklEICkge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCggdGhpcy50aW1lcklEICk7XG5cdFx0XHR0aGlzLnRpbWVySUQgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0c3RlcCgpIHtcblx0XHR2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdHZhciBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHRoaXMubGFzdFRpbWUpICogdGhpcy5fc3BlZWQ7XG5cblx0XHRmb3IoIGxldCBzaW1PYmplY3Qgb2YgdGhpcy5vYmpzICkge1xuXHRcdFx0aWYoIHNpbU9iamVjdC51cGRhdGUgJiYgdHlwZW9mIHNpbU9iamVjdC51cGRhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0c2ltT2JqZWN0LnVwZGF0ZSggZWxhcHNlZFRpbWUgKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdTaW1vYmplY3QnLHNpbU9iamVjdCwnZG9lcyBub3QgaGF2ZSBhIGZ1bmN0aW9uIHVwZGF0ZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXHR9XG5cblx0YWRkKCBzaW1PYmplY3QgKSB7XG5cdFx0dGhpcy5vYmpzLnB1c2goIHNpbU9iamVjdCApO1xuXHR9XG5cblx0c2V0IHNwZWVkKCBzICkgeyB0aGlzLl9zcGVlZCA9IFBoYXNlci5NYXRoLmNsYW1wKHMsIDAsIGNvbmZpZy5tYXhTcGVlZCk7IH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Ob25Vbmlmb3JtKG1pbiwgbWF4KSB7XG5cdHZhciByID0gZ2V0UmFuZG9tKG1pbiAqIChtaW4rMSkgLyAyLCBtYXggICogKG1heCsxKSAvIDIpO1xuXHRyZXR1cm4gTWF0aC5jZWlsKCAoTWF0aC5zcXJ0KDgqcisxKS0xKS8yICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Ob25Vbmlmb3JtSW52KG1pbiwgbWF4KSB7XG5cdHJldHVybiBNYXRoLmFicyggZ2V0UmFuZG9tTm9uVW5pZm9ybShtaW4sIG1heCkgLSBtYXggKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuXHRyZXR1cm4gTWF0aC5yb3VuZCggZ2V0UmFuZG9tKG1pbiwgbWF4KSApO1xufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcblx0fVxuXG5cdG9uKCBuYW1lLCBjYWxsYmFjayApIHtcblx0XHRpZiggdGhpcy5ldmVudHMuaGFzT3duUHJvcGVydHkoIG5hbWUgKSApIHtcblx0XHRcdHRoaXMuZXZlbnRzWyBuYW1lIF0ucHVzaCggY2FsbGJhY2sgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5ldmVudHNbIG5hbWUgXSA9IFsgY2FsbGJhY2sgXTtcblx0XHR9XG5cdH1cblxuXHR0cmlnZ2VyKCBuYW1lLCAuLi5hcmdzICkge1xuXHRcdGlmKCB0aGlzLmV2ZW50cy5oYXNPd25Qcm9wZXJ0eSggbmFtZSApICkge1xuXHRcdFx0Zm9yKCB2YXIgY2Igb2YgdGhpcy5ldmVudHNbIG5hbWUgXSkge1xuXHRcdFx0XHRjYiggLi4uYXJncyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxuY2xhc3MgV29ybGRTY2FsZSBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgfVxuXG4gIHBsYW5ldHNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnNjYWxlID4gMTtcbiAgfVxuXG4gIHBsdXModikgeyBcbiAgICB0aGlzLnNldCh0aGlzLnNjYWxlICsgdik7IFxuICAgIHJldHVybiB0aGlzLnNjYWxlO1xuICB9XG5cbiAgbWludXModikgeyBcbiAgICB0aGlzLnNldCh0aGlzLnNjYWxlIC0gdik7IFxuICAgIHJldHVybiB0aGlzLnNjYWxlO1xuICB9XG5cbiAgbXVsdGlwbHkodikgeyBcbiAgICB0aGlzLnNldCh0aGlzLnNjYWxlICogdik7IFxuICAgIHJldHVybiB0aGlzLnNjYWxlO1xuICB9XG5cbiAgZ2V0KCkgeyBcbiAgICByZXR1cm4gdGhpcy5zY2FsZTsgXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zY2FsZX1gO1xuICB9XG5cbiAgc2V0KHYpIHsgXG4gICAgdGhpcy5zY2FsZSA9IFBoYXNlci5NYXRoLmNsYW1wKHYsIDAuMDUsIDgpOyBcblxuICAgIHRoaXMudHJpZ2dlcigncmVzaXplJyx0aGlzLnNjYWxlKTtcblxuICAgIHJldHVybiB0aGlzLnNjYWxlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXb3JsZFNjYWxlKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG5cdGNvbnN0cnVjdG9yKCBnYW1lLCBtb2RlbCwgd29ybGRTY2FsZSApIHtcblx0XHR0aGlzLmdhbWUgPSBnYW1lO1xuXHRcdHRoaXMubW9kZWwgPSBtb2RlbDtcblx0XHR0aGlzLndvcmxkU2NhbGUgPSB3b3JsZFNjYWxlO1xuXHR9XG5cblx0Zm9jdXMoIHNjYWxlID0gOCwgZHVyYXRpb24gPSBudWxsICkge1xuXHRcdHRoaXMuZ2FtZS5jYW1lcmEuem9vbVRvKCB0aGlzLndvcmxkU2NhbGUuc2V0KHNjYWxlKSwgZHVyYXRpb24sIHRoaXMuZWwucG9zaXRpb24gKTtcblx0fVxuXG5cdGZvY3VzRm9sbG93KCBzY2FsZSA9IDgsIGR1cmF0aW9uID0gbnVsbCApIHtcblx0XHR0aGlzLmdhbWUuY2FtZXJhLnpvb21UbyggdGhpcy53b3JsZFNjYWxlLnNldChzY2FsZSksIGR1cmF0aW9uICk7XG5cdFx0dGhpcy5nYW1lLmNhbWVyYS5mb2xsb3coIHRoaXMuZWwgKTtcblx0fVxufSIsImltcG9ydCBWaWV3IGZyb20gJy4vYmFzZSc7XG5cbmZ1bmN0aW9uIHJlbmRlclBhdGgoIGN0eCwgcmFkaXVzLCBzY2FsZSApIHtcblx0Y3R4LmNsZWFyKCk7XG5cdGN0eC5saW5lU3R5bGUoMSwgMHhBQUFBQUEsIDAuNik7XG5cdGN0eC5kcmF3Q2lyY2xlKDAsMCxyYWRpdXMqMipzY2FsZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldFZpZXcgZXh0ZW5kcyBWaWV3IHtcblx0Y29uc3RydWN0b3IoIGdhbWUsIG1vZGVsICkge1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0dGhpcy5jZW50ZXIgPSB7IHg6IG1vZGVsLnN5c3RlbS54LCB5IDogbW9kZWwuc3lzdGVtLnkgfTtcblx0XHRcblx0XHR0aGlzLmluaXQoIGdhbWUgKTtcblx0XHR0aGlzLmhhbmRsZXJzKCk7XG5cdH1cblxuXHRpbml0KCBnYW1lICkge1xuXHRcdHZhciBjdHggPSBnYW1lLmFkZC5ncmFwaGljcygwLDApO1xuXHQgICAgY3R4LmJlZ2luRmlsbCgweEZGRkZGRiwxKTsgXG5cdCAgICBjdHguZHJhd0NpcmNsZSgwLDAsdGhpcy5tb2RlbC5zaXplKTtcblx0ICAgIGN0eC5lbmRGaWxsKCk7XG5cblx0ICAgIHZhciBwYXRoID0gZ2FtZS5hZGQuZ3JhcGhpY3ModGhpcy5jZW50ZXIueCx0aGlzLmNlbnRlci55KTtcblx0ICAgIHJlbmRlclBhdGgoIHBhdGgsIHRoaXMubW9kZWwucmFkaXVzLCAxICk7XG5cblx0ICAgIHRoaXMuZWwgPSBnYW1lLmFkZC5zcHJpdGUoMCwwKTtcblx0ICAgIHRoaXMuZWwuYWRkQ2hpbGQoY3R4KTtcblx0ICAgIHRoaXMucGF0aCA9IHBhdGg7XG5cblx0ICAgIHRoaXMuZWwuaW5wdXRFbmFibGVkID0gdHJ1ZTtcblx0fVxuXG5cdGhhbmRsZXJzKCkge1xuXHRcdHRoaXMuZWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoKSA9PiB0aGlzLmZvY3VzRm9sbG93KCA4LCAxMDAwICkpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMuZWwudmlzaWJsZSA9IHRoaXMud29ybGRTY2FsZS5nZXQoKSA+PSAwLjU7XG5cdFx0dGhpcy5wYXRoLnZpc2libGUgPSB0aGlzLndvcmxkU2NhbGUuZ2V0KCkgPj0gMC41O1xuXG5cdFx0dGhpcy5lbC54ID0gdGhpcy5tb2RlbC54O1xuXHRcdHRoaXMuZWwueSA9IHRoaXMubW9kZWwueTtcblx0fVxufSIsImltcG9ydCBWaWV3IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbVZpZXcgZXh0ZW5kcyBWaWV3IHtcblx0Y29uc3RydWN0b3IoIGdhbWUgKSB7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKTtcblxuXHRcdHRoaXMuaW5pdCggZ2FtZSApO1xuXHRcdHRoaXMuaGFuZGxlcnMoKTtcblx0fVxuXG5cdGluaXQoIGdhbWUgKSB7XG5cdFx0dmFyIGN0eCA9IGdhbWUuYWRkLmdyYXBoaWNzKDAsIDApO1xuXHRcdGN0eC5iZWdpbkZpbGwoMHhGRkZGRkYsIDEpO1xuXHRcdGN0eC5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMubW9kZWwuc2l6ZSk7XG5cblx0XHR0aGlzLmVsID0gZ2FtZS5hZGQuc3ByaXRlKHRoaXMubW9kZWwueCwgdGhpcy5tb2RlbC55KTtcblx0XHR0aGlzLmVsLmFkZENoaWxkKGN0eCk7XHRcblx0fVxuXG5cdGhhbmRsZXJzKCkge1xuXHRcdHRoaXMuZWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoKSA9PiB0aGlzLmZvY3VzKCA4LCAxMDAwICkpO1xuXHR9XG59IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcblxudmFyIE1BWF9aID0gNTtcblxuZnVuY3Rpb24gekFscGhhKHopIHtcblx0cmV0dXJuIHogLyBNQVhfWjtcbn1cblxudmFyIGxhc3RTY2FsZSA9IDE7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW1zVmlldyBleHRlbmRzIEJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpO1xuXHRcdHRoaXMuaW5pdCggdGhpcy5nYW1lICk7XG5cblx0XHRsYXN0U2NhbGUgPSB0aGlzLndvcmxkU2NhbGUuZ2V0KCk7XG5cdFx0dGhpcy53b3JsZFNjYWxlLm9uKCdyZXNpemUnLHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXHR9XG5cblx0aW5pdCggZ2FtZSApIHtcblx0XHR0aGlzLmN0eCA9IGdhbWUuYWRkLmdyYXBoaWNzKDAsIDApO1xuXHRcdHRoaXMucmVkcmF3KCk7XHRcblx0fVxuXG5cdHJlZHJhdyhhbGwgPSB0cnVlKSB7XG5cdFx0dGhpcy5jdHguY2xlYXIoKTtcblxuXHRcdGZvcihsZXQgc3lzdGVtIG9mIHRoaXMubW9kZWwuc3lzdGVtcykge1xuXHRcdFx0aWYoYWxsIHx8IHN5c3RlbS56ID09PSBNQVhfWikge1xuXHRcdFx0XHR0aGlzLmN0eC5iZWdpbkZpbGwoMHhGRkZGRkYsIDEpO1xuXG5cdFx0XHRcdHZhciBzY2FsZVBvaW50ID0gbmV3IFBoYXNlci5Qb2ludCh0aGlzLndvcmxkU2NhbGUuZ2V0KCksdGhpcy53b3JsZFNjYWxlLmdldCgpKTtcblx0XHRcdFx0dmFyIHBvaW50ID0gUGhhc2VyLlBvaW50Lm11bHRpcGx5KHN5c3RlbS5wb2ludCxzY2FsZVBvaW50KTtcblxuXHRcdFx0XHR0aGlzLmN0eC5kcmF3Q2lyY2xlKHBvaW50LngsIHBvaW50LnksIHN5c3RlbS5zaXplKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXNpemUoc2NhbGUpIHtcblx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdC8vIGlmKHNjYWxlID49IDIgJiYgbGFzdFNjYWxlIDwgMikge1xuXHRcdC8vIFx0dGhpcy5yZWRyYXcoZmFsc2UpO1xuXHRcdC8vIH0gZWxzZSBpZihzY2FsZSA8IDIgJiYgbGFzdFNjYWxlID49IDIpIHtcblx0XHQvLyBcdHRoaXMucmVkcmF3KCk7XG5cdFx0Ly8gfVxuXG5cdFx0bGFzdFNjYWxlID0gc2NhbGU7XG5cdH1cbn0iXX0=
