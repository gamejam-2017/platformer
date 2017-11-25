import EnemyBase from './EnemyBase';

export default (tilemap, layer) => class Slime extends EnemyBase {
  constructor(game, x, y) {
    super(game, x, y, 'game_tiles', 260);

    this.animations.add('crawl', [260, 261, 259, 261], 10, true);
    this.body.velocity.x = -30;

    this.play('crawl');
  }
  update() {
    let direction;

    if (this.body.velocity.x > 0) {
      this.tileScale.setTo(-1, 1);
      direction = 1;
    } else {
      this.tileScale.setTo(1, 1);
      direction = -1;
    }

    const nextX = this.x + direction * (Math.abs(this.width) * 0.5 + 1);
    const nextY = this.bottom + 1;

    const nextTile = tilemap.getTileWorldXY(
      nextX,
      nextY,
      tilemap.tileWidth,
      tilemap.tileHeight,
      layer
    );

    if (!nextTile && this.body.blocked.down) {
      this.body.velocity.x *= -1;
    }
  }
}
