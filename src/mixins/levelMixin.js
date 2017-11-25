import storage from '../utils/localStorageFacade';
import { styleWhite } from '../utils/styles';

export default function({
  levelName,
  playground,
  onNext
}) {
  return function(SuperClass) {
    let counter = 0;
    let time;
    return class extends SuperClass {
      onSaveAndNext(data = { isDone: false }) {
        super.onSaveAndNext();
        if (data.isDone) {
          storage.setItem(levelName, data);
        }
        onNext(data.isDone);
      }
    }
  }
}
