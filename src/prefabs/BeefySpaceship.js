// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

// Mod 13: create a new spaceship type that's smaller, moves faster, and is worth more points

class BeefySpaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);                              // add to existing scene
    
    this.points = pointValue;                              // store pointValue
    this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
    this.currentOffscreenTime = 0;                         // tracks time off screen
    this.resetTime = 200;                                  // time off-screen before resetting in milliseconds
  }

  update() {
    this.x += this.moveSpeed * 1.5;

    // wrap around from right edge to left edge
    if (this.x >= 0) {
      this.currentOffscreenTime += 1;
      if (this.currentOffscreenTime >= this.resetTime) {
        this.currentOffscreenTime = 0;
        this.reset();
      }
    }
  }

  // position reset
  reset() {
    this.x = -game.config.width;
  }
}
