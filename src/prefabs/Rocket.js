// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);                       // add to existing, displayList, updateList
    
    this.isFiring = false;                          // track rocket's firing status
    this.moveSpeed = 2;                             // pixels per frame

    this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
  }

  update() {
    // left/right movement
    // Mod 7: allow the player to control the rocket after it's fired
    // if (!this.isFiring) {
      if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
        this.x -= this.moveSpeed;
      } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        this.x += this.moveSpeed;
      }
    // }

    // fire button
    if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
      this.isFiring = true;
      this.sfxRocket.play();                        // play sfx
      rocketMoving = true;
    }

    // if fired, move up
    if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
      this.y -= this.moveSpeed;
    }

    // reset on miss
    if (this.y <= borderUISize * 3 + borderPadding) {
      this.reset();
    }
  }

  // reset rocket to "ground"
  reset() {
    this.isFiring = false;
    this.y = game.config.height - borderUISize - borderPadding;
    rocketMoving = false;
  }
}
