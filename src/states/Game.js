import Player from '../prefabs/Player';
import Slime from '../prefabs/Slime';
import Waitress from '../prefabs/Waitress';
import BurgerCannon from '../prefabs/BurgerCannon';
import Coin from '../prefabs/Coin';
import Energy from '../prefabs/Energy';
import Garb from '../prefabs/Garb';
import Exit from '../prefabs/Exit';
import storage from '../utils/localStorageFacade';


export default ({
  levelName,
  playground,
  onNext
}) => class GameState extends Phaser.State {
  init() {
    this.game.physics.arcade.gravity.y = 1000;
    this.game.stage.backgroundColor = '#2f9acc';
    this.cannons = this.game.add.group(this, 'cannons', true, true);
    // Собранные ресурсы на уровне
    this.collectedResources = {
      coins: 0,
      energy: 0,
      garb: 0
    };
  }
  create() {
    this.__createLevel();
    this.player = this.__createPlayer();
    //this.cannons = this.__createCannons();
    this.slimes = this.__createSlimes();
    this.waitresses = this.__createWaitresses();
    this.coins = this.__createCoin();
    this.energy = this.__createEnergy();
    this.garb = this.__createGarb();
    this.exit = this.__createExit();
    //this.cannonBullets = this.cannons.children.map((cannon) => cannon.getWeapon().bullets);

    this.game.camera.follow(this.player);
  }
  update() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
    this.game.physics.arcade.collide(this.slimes, this.collisionLayer);
    this.game.physics.arcade.collide(this.waitresses, this.collisionLayer);
    this.game.physics.arcade.collide(this.coins, this.collisionLayer);
    this.game.physics.arcade.collide(this.energy, this.collisionLayer);
    this.game.physics.arcade.collide(this.garb, this.collisionLayer);
    this.game.physics.arcade.collide(this.exit, this.collisionLayer);
    this.game.physics.arcade.overlap(this.player, [this.slimes, this.waitresses], this.__touchEnemy, null, this);
    this.game.physics.arcade.overlap(this.player, this.coins, this.__touchCoin, null, this);
    this.game.physics.arcade.overlap(this.player, this.energy, this.__touchEnergy, null, this);
    this.game.physics.arcade.overlap(this.player, this.garb, this.__touchGarb, null, this);
    this.game.physics.arcade.overlap(this.player, this.exit, this.__touchExit, null, this);
    this.game.physics.arcade.overlap(this.player, this.cannonBullets, this.__touchCannon, null, this);
  }
  render(game) {
    // TODO Add debug logic here if needed
    //this.game.debug.body(this.player);
  }
  __touchCoin(player, item) {
    item.kill();
    this.collectedResources.coins++;
  }
  __getKnockbackDirection(o1, o2) {
    return o1.x < o2.x ? 'left' : 'right';
  }
  __touchEnemy(player, enemy) {
    console.log('Player touching down', player.body.touching.down);
    console.log('Enemy touching up', enemy.body.touching.up);

    if (player.body.touching.down && enemy.body.touching.up) {
      enemy.kill();
    } else {
      this.state.start('Game');
    }
  }

  __touchEnergy(player, item) {
    item.kill();
    this.collectedResources.energy++;
  }

  __touchGarb(player, item) {
    item.kill();
    this.collectedResources.garb++;
  }

  __touchExit(player, item) {
    storage.setItem(levelName, {
      isDone: true,
      collectedResources: this.collectedResources
    });
    onNext(true);
  }

  __touchCannon(player, item) {
    item.kill();
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
    const [data] = this.__findObjectsByType('player', 'players');

    return this.game.add.existing(new Player(this.game, data.x, data.y));
  }
  __createCannons() {
    const group = this.game.add.group();
    const cannons = this.__findObjectsByType('burger_cannon', 'enemies');
    cannons.forEach((item) =>
      group.add(new BurgerCannon(this.game, item.x, item.y))
    );

    return group;
  }
  __createSlimes() {
    const group = this.game.add.group();
    group.enableBody = true;
    const slimes = this.__findObjectsByType('slime', 'enemies');
    slimes.forEach((item) =>
      group.add(new Slime(this.game, item.x, item.y, this.map))
    );

    return group;
  }
  __createWaitresses() {
    const group = this.game.add.group();
    const waitresses = this.__findObjectsByType('waitress', 'enemies');
    waitresses.forEach((item, index) =>
      group.add(new Waitress(this.game, item.x, item.y, this.map, this.player))
    );

    return group;
  }

  __createCoin() {
    const group = this.game.add.group();
    group.enableBody = true;
    const items = this.__findObjectsByType('coin', 'collection');
    items.forEach((item, index) =>
      group.add(new Coin(this.game, item.x, item.y, this.map))
    );
    return group;
  }

  __createEnergy() {
    const group = this.game.add.group();
    group.enableBody = true;
    const items = this.__findObjectsByType('energy', 'collection');
    items.forEach((item, index) =>
      group.add(new Energy(this.game, item.x, item.y, this.map))
    );

    return group;
  }


  __createGarb() {
    const group = this.game.add.group();
    group.enableBody = true;
    const items = this.__findObjectsByType('garb', 'collection');
    items.forEach((item, index) =>
      group.add(new Garb(this.game, item.x, item.y, this.map))
    );

    return group;
  }

  __createExit() {
    const group = this.game.add.group();
    group.enableBody = true;
    const items = this.__findObjectsByType('exit', 'Exit');
    items.forEach((item, index) =>
      group.add(new Exit(this.game, item.x, item.y, this.map))
    );

    return group;
  }

  __findObjectsByType(targetType, layer) {
    return this.map.objects[layer].reduce((acc, obj) => {
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
