/*
Brannon Eakles
Rocket Patrol 2: Electric Boogaloo
*/

// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let highestScore = 0;
let gameTime = 0;
let currentGameTime = 0;
let difficultyTime = 0;
let gameTimeDebounce = false;
let rocketMoving = false;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;