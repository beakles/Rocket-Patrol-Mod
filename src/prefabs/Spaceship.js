// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);                              // add to existing scene
    
    this.points = pointValue;                              // store pointValue
    this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
  }

  update() {
    // move spaceship left
    this.x -= this.moveSpeed;

    // wrap around from left edge to right edge
    if (this.x <= 0 - this.width) {
      this.reset();
    }
  }

  // position reset
  reset() {
    this.x = game.config.width;
  }
}
