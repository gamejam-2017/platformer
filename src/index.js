import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import GameState from './states/Game';



class Game extends Phaser.Game {
  constructor(element) {
    super(333, 187, Phaser.AUTO, element, {
      create() {
        this.state.add('Boot', BootState);
        this.state.add('Preload', PreloadState);
        this.state.add('Game', GameState);

        this.state.start('Boot');
      }
    });
  }
}

new Game('game');
