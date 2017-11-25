import EnemyBase from './EnemyBase';

const Modes = {
  IDLE: 'idle',
  CHASING: 'chasing'
};

export default (player) => class Waitress extends EnemyBase {
  constructor(game, x, y) {
    super(game, x, y, 'game_tiles', 109);

    this.animations.add('walk', [116, 117, 118, 119], 10, true);
    this.animations.add('idle', [110, 111], 2, true);
    this.animations.add('die', [113, 113, 113], 1);

    this.mode = Modes.IDLE;
    this.play('idle');

    this.dying = false;
  }
  killWithAnimation() {
    this.body.enable = false;
    this.rotation = -90;
    this.dying = true;
    this.play('die', 10, false, true);
  }
  update() {
    if (this.dying) {
      return;
    }

    const distance = this.game.physics.arcade.distanceBetween(this, player);

    if (
      player.alive &&
      (distance > 210 ||
      (Math.abs(this.x - player.x) <= this.width && this.y !== player.y))
    ) {
      this.mode = Modes.IDLE;
    } else {
      this.mode = Modes.CHASING;
    }

    if (this.mode === Modes.CHASING) {
      this.body.velocity.x = (this.x > player.x) ? -102 : 102;

      if (this.body.velocity.x > 0) {
        this.tileScale.setTo(1, 1);
      } else {
        this.tileScale.setTo(-1, 1);
      }

      this.play('walk');
    } else {
      this.body.velocity.x = 0;
      this.play('idle');
    }
  }
}
