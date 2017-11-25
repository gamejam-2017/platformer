export default class IntroState extends Phaser.State {
  init() {
    this.pictureA = null;
    this.pictureB = null;

    this.timer = null;
    this.current = 3;

    this.game.stage.backgroundColor = '#2f9acc';
  }
  preload(game) {
    game.load.image('scene_1', 'assets/images/intro/scene-1.png');
    game.load.image('scene_2', 'assets/images/intro/scene-2.png');
    game.load.image('scene_3', 'assets/images/intro/scene-3.png');
    game.load.image('scene_4', 'assets/images/intro/scene-4.png');
    game.load.image('scene_5', 'assets/images/intro/scene-5.png');
    game.load.image('scene_6', 'assets/images/intro/scene-6.png');
    game.load.image('scene_7', 'assets/images/intro/scene-7.png');
  }
  create(game) {
    this.pictureA = this.__createPicture(game.world.centerX, game.world.centerY, 'scene_1');
    this.pictureB = this.__createPicture(game.world.centerX, game.world.centerY, 'scene_2');
    this.pictureB.alpha = 0;

    game.add.existing(this.pictureA);
    game.add.existing(this.pictureB);

    this.timer = game.time.create(false);
    this.timer.add(3000, this.__fade, this);
    this.timer.start();
  }
  __fade() {
    let tween;

    if (this.pictureA.alpha === 1) {
      tween = this.game.add.tween(this.pictureA).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.pictureB).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
    } else {
      this.game.add.tween(this.pictureA).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
      tween = this.game.add.tween(this.pictureB).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
    }
    tween.onComplete.add(this.__changePicture, this);
  }
  __changePicture() {
    if (this.pictureA.alpha === 0) {
      this.pictureA.loadTexture(`scene_${this.current}`);
    } else {
      this.pictureB.loadTexture(`scene_${this.current}`);
    }

    this.current++;

    if (this.current > 8) { // TODO Fix missing sprite bug
      this.timer.add(1000, this.__startGame, this);
    } else {
      this.timer.add(1000, this.__fade, this);
    }
  }
  __startGame() {
    this.state.start('Game');
  }
  __createPicture(x, y, sprite) {
    const picture = new Phaser.Sprite(this.game, x, y, sprite);
    picture.anchor.setTo(.5);
    picture.width = this.game.width;
    picture.height = this.game.height;
    return picture;
  }
}
