const BULLET_SPEED = 100;

export default (player) => class BurgerCannon extends Phaser.TileSprite {
  constructor(game, x, y) {
    super(game, x, y, 21, 21, 'game_tiles', 858);

    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.weapon = this.__createWeapon();

    this.animations.add('shoot', [860, 858], 10);

    game.time.events.loop(
      game.rnd.integerInRange(2000, 4000),
      () => {
        if (this.game.physics.arcade.distanceBetween(this, player) < 210 && player.x < this.x) {
          this.play('shoot');
          this.weapon.fire();
        }
      }
    );
  }
  getWeapon() {
    return this.weapon;
  }
  __createWeapon() {
    const weapon = this.game.add.weapon(20, 'game_tiles', 779);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletKillDistance = 630;
    weapon.bulletAngleOffset = 180;
    weapon.bulletSpeed = BULLET_SPEED;
    weapon.fireAngle = -180;
    weapon.autofire = false;
    weapon.bulletGravity.y = -1000;
    weapon.trackSprite(this, -10, 5, false);

    return weapon;
  }
};
