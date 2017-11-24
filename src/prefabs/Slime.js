export default class Slime extends Phaser.TileSprite {
  constructor(game, x, y, tilemap) {
    super(game, x, y, 21, 21, 'game_tiles', 260);
    this.tilemap = tilemap;

    this.animations.add('crawl', [260, 261, 259, 261], 10, true);

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1, 0);
    this.body.velocity.x = -30;

    this.anchor.setTo(.5);

    this.play('crawl');
  }
  update() {
    let direction;

    if (this.body.velocity.x > 0) {
      this.scale.setTo(-1, 1);
      direction = 1;
    } else {
      this.scale.setTo(1, 1);
      direction = -1;
    }

    const nextX = this.x + direction * (Math.abs(this.width) * .5 + 1);
    const nextY = this.bottom + 1;

    const nextTile = this.tilemap.getTileWorldXY(
      nextX,
      nextY,
      this.tilemap.tileWidth,
      this.tilemap.tileHeight,
      'collision'
    );

    if (!nextTile && this.body.blocked.down) {
      this.body.velocity.x *= -1;
    }
  }
}
