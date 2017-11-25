const RUNNING_SPEED = 100;
const JUMPING_SPEED = 400;

export default class Player extends Phaser.TileSprite {
  constructor(game, x, y) {
    super(game, x, y, 21, 21, 'game_tiles', 19);

    this.animations.add('walk', [26, 27, 28, 29], 10, true);
    this.animations.add('idle', [20, 21], 2, true);

    game.physics.arcade.enable(this);
    this.body.setSize(18, 18, 3, 3);
    this.body.collideWorldBounds = true;

    this.cursors = game.input.keyboard.createCursorKeys();

    this.facing = 'idle';
    this.edgeTimer = 0;
    this.jumpTimer = 0;
    this.wasStanding = false;
    this.coins = 0;
    this.anchor.setTo(0.5);

    this.health = 3;

    this.__invincible = false;
  }
  get invincible() {
    return this.__invincible;
  }
  makeInvincible() {
    this.__invincible = true;
    this.game.time.events.add(2000, () => this.__invincible = false);
  }
  update() {
    this.body.velocity.x = 0;

    this.alpha = this.__invincible ? 0.5 : 1;

    const standing = this.body.blocked.down || this.body.touching.down;

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -RUNNING_SPEED;
      this.play('walk');
      if (this.facing !== 'left') {
        this.facing = 'left';
        this.tileScale.setTo(-1, 1);
      }
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = RUNNING_SPEED;
      this.play('walk');
      if (this.facing !== 'right') {
        this.facing = 'right';
        this.tileScale.setTo(1, 1);
      }
    } else if (this.facing !== 'idle') {
      this.play('idle');
      this.facing = 'idle';
    }

    if (!standing && this.wasStanding) {
      this.edgeTimer = this.game.time.time + 250;
    }

    if ((standing || this.game.time.time <= this.edgeTimer)
      && this.cursors.up.isDown && this.game.time.time > this.jumpTimer) {
      this.body.velocity.y = -JUMPING_SPEED;
      this.jumpTimer = this.game.time.time + 750;
      this.play('idle');
    }

    this.wasStanding = standing;
  }
}
