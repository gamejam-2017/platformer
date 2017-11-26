import * as stateNameLevels from '../constants/stateNameLevels'

export default class PreloadState extends Phaser.State {
  preload(game) {
    this.preloader = this.add.sprite(game.world.centerX, game.world.centerY, 'preloader');
    this.preloader.anchor.setTo(0.5);
    this.preloader.scale.setTo(3);

    this.load.setPreloadSprite(this.preloader);
    this.load.spritesheet('game_tiles', './assets/images/spritesheet.png', 21, 21, -1, 2, 2);
    this.load.spritesheet('MenuButtons', './assets/button/MenuButtons.png', 84, 21);
    this.load.spritesheet('levelButtons', './assets/button/level.png', 42, 42);
    this.load.spritesheet('levelDoneButtons', './assets/button/levelDone.png', 42, 42);
    this.load.image('background', './assets/background/menu-bg.jpg');
    this.load.tilemap('playground_level', './assets/levels/playground.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level_1', './assets/levels/level-1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level_3', './assets/levels/level_3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level_5', './assets/levels/level_5.json', null, Phaser.Tilemap.TILED_JSON);
  }
  create(game) {
    this.state.start('LevelsMenu')//'MainMenu');
  }
}
