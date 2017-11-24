export default class PreloadState extends Phaser.State {
  preload(game) {
    this.preloader = this.add.sprite(game.world.centerX, game.world.centerY, 'preloader');
    this.preloader.anchor.setTo(.5);
    this.preloader.scale.setTo(3);

    this.load.setPreloadSprite(this.preloader);
    this.load.spritesheet('game_tiles', './assets/images/spritesheet.png', 21, 21, -1, 2, 2);
    this.load.tilemap('playground_level', './assets/levels/playground.json', null, Phaser.Tilemap.TILED_JSON);
  }
  create(game) {
    this.state.start('Game');
  }
}
