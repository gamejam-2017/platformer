const Modes = {
  IDLE: 'idle',
  CHASING: 'chasing'
};

export default class Waitress extends Phaser.TileSprite {
  constructor(game, x, y, tilemap, player) {
    super(game, x, y, 21, 21, 'game_tiles', 109);
    this.tilemap = tilemap;
    this.player = player;

    this.animations.add('walk', [116, 117, 118, 119], 10, true);
    this.animations.add('idle', [110, 111], 2, true);

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1, 0);

    this.anchor.setTo(0.5);

    this.mode = Modes.IDLE;
    this.play('idle');
  }
  update() {
    const distance = this.game.physics.arcade.distanceBetween(this, this.player);

    if (
      distance > 105 ||
      (Math.abs(this.x - this.player.x) <= this.width && this.y !== this.player.y)
    ) {
      this.mode = Modes.IDLE;
    } else {
      this.mode = Modes.CHASING;
    }

    if (this.mode === Modes.CHASING) {
      this.body.velocity.x = (this.x > this.player.x) ? -102 : 102;

      if (this.body.velocity.x > 0) {
        this.scale.setTo(1, 1);
      } else {
        this.scale.setTo(-1, 1);
      }

      this.play('walk');
    } else {
      this.body.velocity.x = 0;
      this.play('idle');
    }
  }
}
