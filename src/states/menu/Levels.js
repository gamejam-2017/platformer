import Level from '../../prefabs/Level';
import storage from '../../utils/localStorageFacade';
import * as stateNameLevels from '../../constants//stateNameLevels';

const marginX = 10;
const marginY = 20;

const styleText = {
  paddingTop: 16,
  paddingLeft: 19
};
const styleWhite = { font: '13px', fill: '#fff', align: 'center' };

export default class LevelsState extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = 'blue';
    const dataByStorage = storage.getData();
    this.levels = [
      new Level({
        text: '1',
        // isDone: dataByStorage[stateNameLevels.GameLevel_1] && !!dataByStorage[stateNameLevels.GameLevel_1].isDone,
        storageData: dataByStorage[stateNameLevels.GameLevel_1],
        onClick: () => this.state.start(stateNameLevels.GameLevel_1)
      }),
      new Level({
        text: '2',
        storageData: dataByStorage[stateNameLevels.GameLevel_2],
        onClick: () => this.state.start(stateNameLevels.GameLevel_2)
      }),
      new Level({
        text: '3',
        storageData: dataByStorage[stateNameLevels.GameLevel_3],
        onClick: () => this.state.start(stateNameLevels.GameLevel_3)
      }),
      new Level({
        text: '4',
        storageData: dataByStorage[stateNameLevels.GameLevel_4],
        onClick: () => this.state.start(stateNameLevels.GameLevel_4)
      }),
      new Level({
        text: '5',
        storageData: dataByStorage[stateNameLevels.GameLevel_5],
        onClick: () => this.state.start(stateNameLevels.GameLevel_5)
      }),
      new Level({
        text: '6',
        storageData: dataByStorage[stateNameLevels.GameLevel_6],
        onClick: () => this.state.start(stateNameLevels.GameLevel_6)
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

  __addTextCount(bindItem, collectedResources, key) {
    if (collectedResources && collectedResources[key] >=  0) {
      const item = bindItem();
      this.game.add.text(item.x + item.width, item.y, collectedResources[key], styleWhite);
    }
  }
  __renderLevels() {
    const style = { font: '10px', fill: '#000', align: 'center' };
    const sizeBtn = 42;
    this.levels.forEach((v, key) => {
      const x = key * marginX + key * sizeBtn + styleText.paddingLeft;
      const y = marginY;
      if (v.storageData && v.storageData.isDone) {
        if (v.storageData.time) {
          this.game.add.text(x, y + sizeBtn, v.storageData.time + 'сек', styleWhite);
        }
        this.game.add.button(x, y, 'levelDoneButtons', this.onLevelDoneClick.bind(this, v), this, 0, 0, 0);
        const coin = this.game.add.tileSprite.bind(this, x, y + sizeBtn + 14, 21, 21, 'game_tiles', 78);
        this.__addTextCount(coin, v.storageData.collectedResources, 'coins');
        const energy = this.game.add.tileSprite.bind(this, x, y + sizeBtn + 28, 21, 21, 'game_tiles', 14);
        this.__addTextCount(energy, v.storageData.collectedResources, 'energy');
        const garb = this.game.add.tileSprite.bind(this, x, y + sizeBtn + 42, 21, 21, 'game_tiles', 285);
        this.__addTextCount(garb, v.storageData.collectedResources, 'garb');


      } else {
        this.game.add.button(x,
          marginY,
          'levelButtons',
          this.onLevelClick.bind(this, v),
          this, 0, 0, 0);
        this.game.add.text(x + styleText.paddingLeft,
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
