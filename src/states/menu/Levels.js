import Level from '../../prefabs/Level';
import storage from '../../utils/localStorageFacade';
import * as stateNameLevels from '../../constants//stateNameLevels';

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
    const dataByStorage = storage.getData()
    this.levels = [
      new Level({
        text: '1',
        isDone: dataByStorage[stateNameLevels.GameLevel_1] && !!dataByStorage[stateNameLevels.GameLevel_1].isDone,
        onClick: () => this.state.start(stateNameLevels.GameLevel_1)
      }),
      new Level({
        text: '2',
        isDone: dataByStorage[stateNameLevels.GameLevel_2] && dataByStorage[stateNameLevels.GameLevel_2].isDone,
        onClick: () => this.state.start(stateNameLevels.GameLevel_2)
      }),
      new Level({
        text: '3',
        isDone: dataByStorage[stateNameLevels.GameLevel_3] && dataByStorage[stateNameLevels.GameLevel_3].isDone,
        onClick: () => this.state.start(stateNameLevels.GameLevel_3)
      }),
      new Level({
        text: '4',
        isDone: dataByStorage[stateNameLevels.GameLevel_4] && dataByStorage[stateNameLevels.GameLevel_4].isDone,
        onClick: () => this.state.start(stateNameLevels.GameLevel_4)
      }),
      new Level({
        text: '5',
        isDone: dataByStorage[stateNameLevels.GameLevel_5] && dataByStorage[stateNameLevels.GameLevel_5].isDone,
        onClick: () => this.state.start(stateNameLevels.GameLevel_5)
      })
    ];
  }
  onLevelClick(v) {
    console.log(v.text);
    v.onClick();
  }

  onLevelDoneClick(v) {
    console.log('done', v.text);
    v.onClick();
  }

  preload(game) {
  }

  __renderLevels() {
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

  create(game) {
    this.__renderLevels();
    const clearData = this.game.add.text(100,
      150,
      'сбросить данные',
      { font: '15px', fill: '#fff', align: 'center' });

    clearData.inputEnabled = true;
    clearData.events.onInputDown.add(() => {
      storage.clearData();
      this.state.start('LevelsMenu')
    }, this);
  }
}
