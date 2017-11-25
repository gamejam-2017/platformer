export default class EnemyBase extends Phaser.TileSprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 21, 21, 'game_tiles');

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.bounce.set(1, 0);
    this.body.setSize(18, 18, 3, 3);

    this.anchor.setTo(0.5);
  }
  get damageValue() {
    return 1;
  }
}
