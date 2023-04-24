// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;