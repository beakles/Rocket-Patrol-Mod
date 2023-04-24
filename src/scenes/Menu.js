// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  create() {
    this.add.text(20, 20, "Rocket Patrol Menu");
    this.scene.start("playScene");
  }
}