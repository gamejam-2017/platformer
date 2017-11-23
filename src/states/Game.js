export default class GameState extends Phaser.State {
  init() {
    // TODO Init game parameters here
  }
  create() {
    // TODO Create initial game entities here
  }
  update() {
    // TODO Implement game logic here
  }
  restart() {
    this.game.state.start('Game');
  }
  render() {
    // TODO Add debug logic here if needed
  }
}
