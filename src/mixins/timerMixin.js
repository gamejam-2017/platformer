import storage from '../utils/localStorageFacade';
import { styleWhite } from '../utils/styles';

export default function(levelName) {
  return function(SuperClass) {
    let counter = 0;
    let time;
    return class extends SuperClass {
      create() {
        super.create();
        const timerText = this.game.add.text(this.game.width - 50, 10, `${counter} сек`, styleWhite);
        timerText.fixedToCamera = true;
        time = this.game.time.events.loop(Phaser.Timer.SECOND, () => {
          counter++;
          timerText.setText(`${counter} сек`);
        });
      }

      shutdown() {
        super.shutdown();
        if (!levelName) return;
        const storageInfo = storage.getItem(levelName)
        if (storageInfo.time && storageInfo.time < counter) return;

        storageInfo.time = counter;
        storage.setItem(levelName, storageInfo)

        counter = 0;
      }
    }
  }
}
