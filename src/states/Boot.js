export default class BootState extends Phaser.State {
  init(game) {
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    game.stage.backgroundColor = '#000';
    game.physics.startSystem(Phaser.Physics.ARCADE);
  }
  preload(game) {
    this.load.image('preloader', 'assets/images/preloader-bar.png');
  }
  create(game) {
    this.state.start('Preload');
  }
}
