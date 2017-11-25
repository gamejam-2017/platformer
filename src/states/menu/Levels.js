import Level from '../../prefabs/Level';
const marginX = 20;
const marginY = 20;

const styleText = {
  paddingTop: 16,
  paddingLeft: 19
};
export default class LevelsState extends Phaser.State {
  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.stage.backgroundColor = 'blue';
    this.levels = [
      new Level({
        text: '1',
        isDone: true
      }),
      new Level({
        text: '2'
      }),
      new Level({
        text: '3'
      }),
      new Level({
        text: '4'
      }),
      new Level({
        text: '5'
      })
    ];
  }
  onLevelClick(v) {
    console.log(v.text);
  }

  onLevelDoneClick(v) {
    console.log('done', v.text);
  }

  preload(game) {
  }

  create(game) {
    const style = { font: '10px', fill: '#000', align: 'center' };
    this.levels.forEach((v, key) => {
      if (v.isDone) {
        this.game.add.button(
          marginX + key * 42,
          marginY,
          'levelDoneButtons',
          this.onLevelDoneClick.bind(this, v),
          this, 0, 0, 0);
      } else {
        this.game.add.button(marginX + key * 42,
          marginY,
          'levelButtons',
          this.onLevelClick.bind(this, v),
          this, 0, 0, 0);
        this.game.add.text(marginX + key * 42 + styleText.paddingLeft,
          marginY + styleText.paddingTop,
          v.text,
          style);
      }

    });
  }
}
