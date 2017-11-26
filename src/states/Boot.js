export default class BootState extends Phaser.State {
  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }
  preload(game) {
    this.load.image('preloader', 'assets/images/preloader-bar.png');
  }
  create(game) {
    this.state.start('Preload');
  }
}
