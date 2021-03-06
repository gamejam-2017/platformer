import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

const BOIL = 'boil';
const FRY = 'fry';

export default class GameFood extends Phaser.State {
  init() {
    this.win = false;
    this.products = [
      {
        name: 'apple',
        protein: 1,
        calories: 50,
        validUntil: new Date(2017, 11, 30),
      }, {
        name: 'chicken',
        protein: 40,
        calories: 220,
        validUntil: new Date(2017, 12, 2),
      }, {
        name: 'fish',
        protein: 30,
        calories: 150,
        validUntil: new Date(2017, 12, 4),
      }, {
        name: 'lemon',
        protein: 0,
        calories: 0,
        validUntil: new Date(2017, 12, 8),
      }, {
        name: 'milk',
        protein: 6,
        calories: 100,
        validUntil: new Date(2017, 11, 24),
      }, {
        name: 'soda',
        protein: 0,
        calories: 0,
        validUntil: new Date(2017, 12, 24),
      },
    ];
    this.game.stage.backgroundColor = '#FFCCFF';
    this.timer = 0;
    this.timeText = null;
    this.preparedFood = {
      boil: [],
      fry: []
    };
    this.draggedFood = {
      boil: [],
      fry: []
    };
  }
  preload(game) {
    for (let product of this.products) {
      game.load.image(product.name, `assets/images/food/32/${product.name}.png`);
    }
    game.load.image('fry', `assets/images/food/32/fry.png`);
    game.load.image('boil', `assets/images/food/32/boil.png`);
    game.load.spritesheet('timerButtons', 'assets/button/timerButtons.png', 84, 21);
  }
  create(game) {
    this.fry = game.add.sprite(140, game.height - 50, FRY);
    this.fry.inputEnabled = true;
    this.fry.alive = true;

    this.boil = game.add.sprite(240, game.height - 50, BOIL);
    this.boil.inputEnabled = true;
    this.boil.alive = true;

    let i = 0;
    for (let product of this.products) {
      const x = 95 + (++i)*46 - (i >= 4 ? 138 : 0);
      const y = 20 + (i >= 4 ? 44 : 0);
      const sprite = game.add.sprite( x, y, product.name);
      sprite.product = product;
      sprite.inputEnabled = true;
      sprite.input.enableDrag();
      sprite.events.onDragStart.add(this.startDrag, this);
      sprite.events.onDragStop.add(this.stopDrag, this);
    }

    let buttonUp = game.add.button(10, 90, 'timerButtons', this.handleIncreaseTimer, this, 0, 0, 0);
    let buttonDown = game.add.button(10, 110, 'timerButtons', this.handleDecreaseTimer, this, 1, 1, 1);
    let buttonStart = game.add.button(10, 130, 'timerButtons', this.handleStartTimer, this, 2, 2, 2);
    buttonUp.scale.setTo(0.9, 0.9);
    buttonDown.scale.setTo(0.9, 0.9);
    buttonStart.scale.setTo(0.9, 0.9);
  }
  render() {
    this.timeText && this.timeText.destroy();
    this.timeText = this.game.add.text(15, 160, `Время: ${this.timer}`, {font: '16px Arial', fill: '#fff'} );
  }
  handleIncreaseTimer = () => {
    ++this.timer;
  };
  handleDecreaseTimer = () => {
    if (this.timer > 0) {
      --this.timer;
    }
  };
  handleStartTimer = () => {
    if (this.draggedFood[BOIL].length) {
      this.preparedFood[BOIL] = this.draggedFood[BOIL];
      this.draggedFood[BOIL] = [];
      this.boil.alive = false;
      this.boil.destroy();
    }
    if (this.draggedFood[FRY].length) {
      this.preparedFood[FRY] = this.draggedFood[FRY];
      this.draggedFood[FRY] = [];
      this.fry.alive = false;
      this.fry.destroy();
    }
    this.game.add.button(7, 68, 'timerButtons', this.countScore(this.timer), this, 3, 3, 3);
    this.timer = 0;
  };
  countScore = (time) => () => {
    let food = this.preparedFood;
    let score = [];
    let mainRating = 0;
    let hasProduct = (arr, name) => arr.findIndex((val) => val.name === name) !== -1;

    if (food.fry.length) {
      let result = 0;
      if (hasProduct(food.fry, 'lemon')) {
        ++result;
      }
      if (hasProduct(food.fry, 'fish') ^ hasProduct(food.fry, 'chicken')) {
        result += 3;
        if (hasProduct(food.fry, 'fish') && time >= 5 && time <= 15) {
          result += 2;
        } else {
          result -= 1;
        }
        if (hasProduct(food.fry, 'chicken') && time >= 15 && time <= 30) {
          result += 2;
        } else {
          result -= 1;
        }
      }
      if (hasProduct(food.fry, 'milk')) {
        result = Math.max(0, result - 2);
      }
      score.push(result);
    }

    if (food.boil.length) {
      let result = 0;
      if (hasProduct(food.boil, 'soda')) {
        ++result;
      }
      if (hasProduct(food.boil, 'fish') ^ hasProduct(food.boil, 'chicken')) {
        result += 3;
        if (hasProduct(food.boil, 'fish') && time >= 10 && time <= 30) {
          result += 2;
        } else {
          result -= 1;
        }
        if (hasProduct(food.boil, 'chicken') && time >= 35 && time <= 60) {
          result += 2;
        } else {
          result -= 1;
        }
      }
      if (hasProduct(food.boil, 'milk')) {
        result = Math.max(0, result - 2);
      }
      score.push(result);
    }

    if (score.length === 2) {
      mainRating = 1 + (score[0] + score[1]) / 2
    } else {
      mainRating = score[0];
    }

    if (mainRating >= 3) {
      this.state.start('End');
      console.log('Вы выиграли');
    } else {
      this.state.start('End');
      console.log('Вы проиграли');
    }
  };
  startDrag = (sprite) => {
    this.setText(sprite.product.name, 10, 15);
    this.setText(`Белки: ${sprite.product.protein}`, 10, 30);
    this.setText(`Калории: ${sprite.product.calories}`, 10, 45);
    this.setText(`Годен до: ${sprite.product.validUntil.toLocaleDateString("ru-ru")}`, 10, 60);
  };
  stopDrag = (sprite) => {
    this.setText('', 0, 0);
    if (sprite.y >= 135 && sprite.y <= 180) {
      if (sprite.x >= 130 && sprite.x <= 160 && this.fry.alive) {
        sprite.inputEnabled = false;
        sprite.alpha = 0;
        this.draggedFood[FRY].push(sprite.product);
      } else if (sprite.x >= 225 && sprite.x <= 255 && this.boil.alive) {
        sprite.inputEnabled = false;
        sprite.alpha = 0;
        this.draggedFood[BOIL].push(sprite.product);
      }
    }
  };

  setText = (text, x, y) => {
    this.game.debug.text(text, x, y, '#ffffff', '12px Arial');
  };
}
