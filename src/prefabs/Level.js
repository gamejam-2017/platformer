import * as levelType from '../constants/levelType';

export default class Level {
  constructor({
    type,
    text,
    isDone,
    onClick
  }) {
    this.isDone = isDone || false;
    this.text = text || '';
    this.type = type || levelType.BASE;
    this.onClick = onClick;
  }
}
