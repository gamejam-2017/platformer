import Player from '../prefabs/Player';
import slimeFactory from '../prefabs/Slime';
import waitressFactory from '../prefabs/Waitress';
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
    this.cannons = this.__createCannons();
    this.slimes = this.__createSlimes();
    this.waitresses = this.__createWaitresses();
    this.coins = this.__createCoin();
    this.energy = this.__createEnergy();
    this.garb = this.__createGarb();
    this.exit = this.__createExit();
    this.cannonBullets = this.cannons.children.map((cannon) => cannon.getWeapon().bullets);

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
  __touchEnemy(player, enemy) {
    if (player.body.touching.down && enemy.body.touching.up) {
      if (enemy.killWithAnimation) {
        enemy.killWithAnimation();
      } else {
        enemy.kill();
      }
    } else {
      if (player.invincible) {
        return;
      }
      player.damage(enemy.damageValue);
      if (!player.alive) {
        onNext(false);
      } else {
        player.makeInvincible();
      }
    }
  }

  __touchEnergy(_, item) {
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
    if (player.invincible) {
      return;
    }

    item.kill();
    player.damage(1);
    if (!player.alive) {
      onNext(false);
    } else {
      player.makeInvincible();
    }
  }
  __createLevel() {
    this.map = this.add.tilemap('playground_level');
    this.map.addTilesetImage('game_tiles', 'game_tiles');
    this.map.setCollisionBetween(0, 999, true, 'collision');

    this.decorationsLayer = this.map.createLayer('decorations');
    this.collisionLayer = this.map.createLayer('collision');
    this.collisionLayer.resizeWorld();

    this.map.forEach((tile) => {
      if (tile) {
        tile.collideDown = false;
      }
    }, this.game, 0, 0, this.map.width, this.map.height, this.collisionLayer);
  }
  __createPlayer() {
    const [data] = this.__findObjectsByType('player', 'players');
    return this.game.add.existing(new Player(this.game, data.x, data.y));
  }
  __createCannons() {
    return this.__createObjects('burger_cannon', 'enemies', () => BurgerCannon);
  }

  __createSlimes() {
    return this.__createObjects('slime', 'enemies', () => slimeFactory(this.map, 'collision'))
  }

  __createWaitresses() {
    return this.__createObjects('waitress', 'enemies', () => waitressFactory(this.player))
  }

  __createCoin() {
    return this.__createObjects('coin', 'collection', () => Coin, true);
  }

  __createEnergy() {
    return this.__createObjects('energy', 'collection', () => Energy, true);
  }

  __createGarb() {
    return this.__createObjects('garb', 'collection', () => Garb, true);
  }

  __createExit() {
    return this.__createObjects('exit', 'Exit', () => Exit, true);
  }

  __createObjects(type, layer, factoryFn, enableBody=false) {
    const group = this.game.add.group();
    group.enableBody = enableBody;

    const Clazz = factoryFn();

    const items = this.__findObjectsByType(type, layer);
    items.forEach((item) =>
      group.add(new Clazz(this.game, item.x, item.y))
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
