import * as levelType from '../constants/levelType';

export default class Level {
  constructor({
    type,
    text,
    isDone,
    storageData,
    onClick
  }) {
    this.isDone = isDone || false;
    this.storageData = storageData || null;
    this.text = text || '';
    this.type = type || levelType.BASE;
    this.onClick = onClick;
  }
}
