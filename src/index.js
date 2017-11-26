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
import GameFood from './states/miniGames/GameFood';

import mix from './mixins/mix'
import timerMixin from './mixins/timerMixin'
import levelMixin from './mixins/levelMixin'

class Game extends Phaser.Game {
  constructor(element) {
    super(333, 187, Phaser.AUTO, element, {
      create() {
        this.state.add('Boot', BootState);
        this.state.add('Preload', PreloadState);
        this.state.add('Intro', IntroState);
        this.state.add(stateNameLevels.GameLevel_1, mix(GameState({
          playground: 'level_1',
        })).with(
          timerMixin(stateNameLevels.GameLevel_1),
          levelMixin({
            levelName: stateNameLevels.GameLevel_1,
            onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_2) : this.state.start(stateNameLevels.GameLevel_1)
          })
        ));
        this.state.add(stateNameLevels.GameLevel_2, mix(GameMemory).with(
          timerMixin(stateNameLevels.GameLevel_2),
          levelMixin({
            levelName: stateNameLevels.GameLevel_2,
            onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_3) : this.state.start(stateNameLevels.GameLevel_2)
          })
        ));
        this.state.add(stateNameLevels.GameLevel_3, mix(GameState({
          playground: 'level_3',
        })).with(
          timerMixin(stateNameLevels.GameLevel_3),
          levelMixin({
            levelName: stateNameLevels.GameLevel_3,
            onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_4) : this.state.start(stateNameLevels.GameLevel_3)
          })
        ));

        this.state.add(stateNameLevels.GameLevel_4, mix(GameSpeed).with(
          timerMixin(stateNameLevels.GameLevel_4),
          levelMixin({
            levelName: stateNameLevels.GameLevel_4,
            onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_1) : this.state.start(stateNameLevels.GameLevel_4)
          })
        ));
        this.state.add(stateNameLevels.GameLevel_5, mix(GameState({
          playground: 'level_5',
        })).with(
          timerMixin(stateNameLevels.GameLevel_5),
          levelMixin({
            levelName: stateNameLevels.GameLevel_5,
            onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_1) : this.state.start(stateNameLevels.GameLevel_5)
          })
        ));
        this.state.add(stateNameLevels.GameLevel_6, mix(GameFood).with(
          timerMixin(stateNameLevels.GameLevel_6),
          levelMixin({
            levelName: stateNameLevels.GameLevel_6,
            onNext: (isDone) => isDone ? this.state.start(stateNameLevels.GameLevel_1) : this.state.start(stateNameLevels.GameLevel_5)
          })
        ));
        this.state.add('MainMenu', MainMenuState);
        this.state.add('LevelsMenu', LevelsMenuState);


        this.state.start('Boot');
      }
    });
  }
}

(() => new Game('game'))();
