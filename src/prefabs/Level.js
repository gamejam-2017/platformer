import * as levelType from '../constants/levelType';

export default class Level {
  constructor({
    type,
    text,
    isDone
  }) {
    this.isDone = isDone || false
    this.text = text || '',
    this.type = type || levelType.BASE
  }
}
