export default class PreloadState extends Phaser.State {
  preload() {
    this.preloader = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader');
    this.preloader.anchor.setTo(.5);
    this.preloader.scale.setTo(3);

    this.load.setPreloadSprite(this.preloader);

    // TODO Preload additional assets here
  }
  create() {
    this.state.start('Game');
  }
}
