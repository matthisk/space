import Game from './game';
import Boot from './boot';
import Menu from './menu';
import Preloader from './preloader';

window.addEventListener('load', function () {
  'use strict';

  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-game');
  game.state.add('boot', Boot);
  game.state.add('preloader', Preloader);
  game.state.add('menu', Menu);
  game.state.add('game', Game);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('game');
}, false);
