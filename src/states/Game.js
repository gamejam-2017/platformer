import Player from '../prefabs/Player';
import BurgerCannon from '../prefabs/BurgerCannon';

export default class GameState extends Phaser.State {
  init() {
    this.game.physics.arcade.gravity.y = 1000;

    this.cannons = this.game.add.group(this, 'cannons', true, true);
  }
  create() {
    this.__createLevel();
    this.__createPlayer();
    this.cannons = this.__createCannons();
    this.cannonBullets = this.cannons.children.map((cannon) => cannon.getWeapon().bullets);
  }
  update() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
    this.game.physics.arcade.overlap(this.player, this.cannonBullets, this.__touchCannon);
  }
  render(game) {
    // TODO Add debug logic here if needed
    //this.game.debug.body(this.player);
  }
  __touchCannon(player, bullet) {
    bullet.kill();
  }
  __createLevel() {
    this.map = this.add.tilemap('playground_level');
    this.map.addTilesetImage('game_tiles', 'game_tiles');
    this.map.setCollisionBetween(0, 999, true, 'collision');

    this.decorationsLayer = this.map.createLayer('decorations');
    this.collisionLayer = this.map.createLayer('collision');
    this.collisionLayer.resizeWorld();
  }
  __createPlayer() {
    this.player = this.game.add.existing(new Player(this.game, 0, 42));
    this.game.camera.follow(this.player);
  }
  __createCannons() {
    const cannons = this.__findObjectsByType('burger_cannon');
    const group = this.game.add.group();
    cannons.forEach((item) =>
      group.add(new BurgerCannon(this.game, item.x, item.y))
    );
    return group;
  }
  __findObjectsByType(targetType) {
    return this.map.objects['objects'].reduce((acc, obj) => {
      if (obj.type === targetType) {
        return acc.concat({
          ...obj,
          y: obj.y - this.map.tileHeight
        });
      }
      return acc;
    }, []);
  }
}
