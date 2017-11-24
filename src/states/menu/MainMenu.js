import * as Phaser from 'phaser-ce';
import * as menuSize from '../../constants/menuSize';
const paddingItem = 10;
export default class MenuState extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#ccc';
    // this.background = game.add.tileSprite(0, 0, 800, 600, 'background');
    this.menuItems = [
      {
        name: 'start',
        onClick: this.onStartClick,
        index: 0
      },
      {
        name: 'level',
        onClick: this.onLevelClick,
        index: 1
      }
    ];
  }

  onStartClick() {
    console.log('click!');
    this.state.start('Game');

  }

  onLevelClick() {
    console.log('click123!');
    this.state.start('LevelsMenu');

  }

  preload(game) {
    this.load.image('preloader', 'assets/images/preloader-bar.png');
  }
  create(game) {
    this.menuItems.forEach((v, key) => {
      this.game.add.button(this.game.world.centerX - menuSize.MENU_WIDTH / 2,
        this.game.world.centerY - menuSize.MENU_HEIGHT / 2 + (key * (menuSize.MENU_HEIGHT + paddingItem)),
        'MenuButtons',
        v.onClick,
        this,
        v.index,
        v.index,
        v.index
      );
    })
  }
}
