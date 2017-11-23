export default class PreloadState extends Phaser.State {
  preload(game) {
    this.preloader = this.add.sprite(game.world.centerX, game.world.centerY, 'preloader');
    this.preloader.anchor.setTo(.5);
    this.preloader.scale.setTo(3);

    this.load.setPreloadSprite(this.preloader);

    // TODO Preload additional assets here
  }
  create(game) {
    this.state.start('Game');
  }
}
