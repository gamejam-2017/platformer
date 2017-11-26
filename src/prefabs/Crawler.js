import EnemyBase from './EnemyBase';

export default (tilemap, layer, frame, crawlFrames, frameRate=10, velocity=30) => class Crawler extends EnemyBase {
  constructor(game, x, y) {
    super(game, x, y, 'game_tiles', frame);

    this.animations.add('crawl', crawlFrames, frameRate, true);
    this.body.velocity.x = velocity;

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
