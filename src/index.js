import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import IntroState from './states/Intro';
import GameState from './states/Game';
import MainMenuState from './states/menu/MainMenu';
import LevelsMenuState from './states/menu/Levels';
import GameMemory from './states/miniGames/GameMemory';
import * as stateNameLevels from './constants/stateNameLevels'
import GameSpeed from './states/miniGames/GameSpeed';

class Game extends Phaser.Game {
  constructor(element) {
    super(333, 187, Phaser.AUTO, element, {
      create() {
        this.state.add('Boot', BootState);
        this.state.add('Preload', PreloadState);
        this.state.add('Intro', IntroState);
        this.state.add(stateNameLevels.GameLevel_1, GameState({
          levelName: stateNameLevels.GameLevel_1,
          playground: 'playground_level',
          onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_2) : this.state.start(stateNameLevels.GameLevel_1)
        }));
        this.state.add(stateNameLevels.GameLevel_2, GameMemory({
          levelName: stateNameLevels.GameLevel_2,
          onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_3) : this.state.start(stateNameLevels.GameLevel_2)
        }));
        this.state.add(stateNameLevels.GameLevel_3, GameState({
          levelName: stateNameLevels.GameLevel_3,
          playground: 'playground_level',
          onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_1) : this.state.start(stateNameLevels.GameLevel_3)
        }));
        // this.state.add('GameLevel_4', GameState({
        //   levelName: 'level_4',
        //   playground: 'playground_level'
        // }));
        // this.state.add('GameLevel_5', GameState({
        //   levelName: 'level_5',
        //   playground: 'playground_level'
        // }));
        // this.state.add('GameLevel_6', GameState({
        //   levelName: 'level_6',
        //   playground: 'playground_level'
        // }));

        this.state.add('MainMenu', MainMenuState);
        this.state.add('LevelsMenu', LevelsMenuState);
        this.state.add('GameSpeed', GameSpeed);
        // this.state.add('GameMemory', GameMemory);


        this.state.start('Boot');
      }
    });
  }
}

(() => new Game('game'))();
