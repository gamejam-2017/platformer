/**
 * Костюмы, одежда
 */
export default class Garb extends Phaser.TileSprite {
  constructor(game, x, y, tilemap) {
    super(game, x, y, 21, 21, 'game_tiles', 194);
  }
}
