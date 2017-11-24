import Player from '../prefabs/Player';

export default class GameState extends Phaser.State {
  init() {
    this.game.physics.arcade.gravity.y = 1000;
  }
  create() {
    this.__createLevel();
    this.__createPlayer();
  }
  update() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
  }
  render(game) {
    // TODO Add debug logic here if needed
    //this.game.debug.body(this.player);
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
  __findObjectsByType(targetType, map, layer) {
    return map.objects[layer].reduce((acc, obj) => {
      if (obj.type === targetType) {
        return acc.concat({
          ...obj,
          y: obj.y - map.tileHeight
        });
      }
      return acc;
    }, []);
  }
}
