// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);                              // add to existing scene
    
    this.points = pointValue;                              // store pointValue
    this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
    this.moveDirection = 'left';
  }

  update() {
    // move spaceship
    if (this.moveDirection == 'left') {
      this.x -= this.moveSpeed;
    } else {
      this.x += this.moveSpeed;
    }

    // wrap around from left edge to right edge
    if (this.moveDirection == 'left') {
      if (this.x <= 0 - this.width) {
        this.reset();
      }
    } else {
      if (this.x > game.config.width + this.width) {
        this.reset();
      }
    }
  }

  changeDirection(direction) {
    if (direction == 'left') {
      this.moveDirection = 'left';
    } else {
      this.moveDirection = 'right;'
    }
  }

  // position reset
  reset() {
    if (this.moveDirection == 'left') {
      this.x = game.config.width;
    } else {
      this.x = 0 - this.width;
    }
  }
}
