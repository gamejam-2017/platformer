export default class Coin extends Phaser.TileSprite {
  constructor(game, x, y, tilemap) {
    super(game, x, y, 21, 21, 'game_tiles', 78);

    // this.animations.add('crawl', [260, 261, 259, 261], 10, true);

    // this.game.physics.arcade.enable(this);
    // this.body.collideWorldBounds = true;
    // this.body.bounce.set(1, 0);
    // this.body.velocity.x = -30;

    // this.anchor.setTo(0.5);

    // this.play('crawl');
  }
}
