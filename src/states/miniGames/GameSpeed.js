import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import storage from '../../utils/localStorageFacade';

const SCORE_TO_WIN = 5;

export default ({
  levelName,
  onNext
}) => class GameSpeed extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#000066';
    this.colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
    this.figuresAmount = -1;
    this.radius = 50;
    this.inAreaX = this.game.width - 2*this.radius;
    this.score = 0;
    this.win = false;
  }
  create(game) {
    setInterval(this.drawCircle, 1000);
  }
  render() {
    if (!this.win) {
      if (this.score >= SCORE_TO_WIN) {
        this.game.debug.text('Вы выиграли', 10, 20);
        storage.setItem(levelName, {
          isDone: true,
          // TODO можно добавить время прохождения
          time: ''
        });
        onNext(true);
      } else {
        this.game.debug.text('Счет: ' + this.score, 10, 20);
      }
    }
  }
  drawCircle = () => {
    let rand = Math.floor(Math.random() * this.colors.length);
    let circleX = Math.floor(Math.random() * this.inAreaX);
    const graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(this.colors[rand]);
    const circle = graphics.drawCircle(circleX, -this.radius, this.radius);
    graphics.endFill();

    circle.interactive = true;
    circle.inputEnabled = true;
    circle.buttonMode = true;
    circle.live = true;
    this.figuresAmount++;
    circle.num = this.figuresAmount;
    this.game.add.tween(circle)
      .to({y: this.game.height + this.radius*2}, 2000, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        if (circle.live && !this.win) {
          this.score -= 5;
        }
      });
    circle.events.onInputDown.add((data) => {
      if (data.live) {
        data.live = false;
        data.alpha = 0;
        ++this.score;
      }
    });
  };
}



