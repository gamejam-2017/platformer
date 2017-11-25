import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import IntroState from './states/Intro';
import GameState from './states/Game';
import MainMenuState from './states/menu/MainMenu';
import LevelsMenuState from './states/menu/Levels';



class Game extends Phaser.Game {
  constructor(element) {
    super(333, 187, Phaser.AUTO, element, {
      create() {
        this.state.add('Boot', BootState);
        this.state.add('Preload', PreloadState);
        this.state.add('Intro', IntroState);
        this.state.add('Game', GameState);
        this.state.add('MainMenu', MainMenuState);
        this.state.add('LevelsMenu', LevelsMenuState);

        this.state.start('Boot');
      }
    });
  }
}

new Game('game');
