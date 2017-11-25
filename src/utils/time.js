import { styleWhite } from "./styles";

export const createTime = (game) => {
  let counter = 0;
  const timerText = game.add.text(game.width - 50, 10, `${counter} сек`, styleWhite);
  timerText.fixedToCamera = true;
  game.time.events.loop(Phaser.Timer.SECOND, () => {
    counter++;
    timerText.setText(`${counter} сек`);
  });
  return timerText;
}
