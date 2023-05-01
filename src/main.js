/*
Brannon Eakles
Rocket Patrol 2: Electric Boogaloo
Approximate time taken to complete the project: ~8-10 hours roughly

mods implemented:

5-Point Tier
+ Track a high score that persists across scenes and display it in the UI (5)
  - Created a global variable that updates whenever the current score exceeds the saved high score. This score persists across repeated games (unless you refresh the page).
+ Implement the 'FIRE' UI text from the original game (5)
  - Created the 'FIRE' UI that becomes visible when the rocket is fired and disappears when the rocket resets.
+ Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
  - Wanted to try to make my own music but it's too difficult and time-consuming, so I grabbed a copyright-free track from https://www.pixabay.com
  - Plays when the game starts, stops when restarting the game or returning to the menu.
+ Implement the speed increase that happens after 30 seconds in the original game (5)
  - Created a global variable that triggers faster spaceship movement after 30 seconds of the game has passed.
+ Randomize each spaceship's movement direction at the start of each play (5)
  - Used Phaser's Math.Between function that generates a number between x and y, inclusive. Rotates each normal ship depending on whether the result is below or above 50.
+ Create a new scrolling tile sprite for the background (5)
  - Created a starstreak effect to imply the sense of speed.
+ Allow the player to control the Rocket after it's fired (5)
  - Removed the code that prevents the rocket from moving after being fired.

10-Point Tier
+ Create 4 new explosion sound effects and randomize which one plays on impact (10)
  - Used jsfxr to create 4 explosion sounds, then used Phaser's Math.Between function to generate domains such that each sound has roughly a 20% chance of being played.
+ Display the time remaining (in seconds) on the screen (10)
  - Overhauled the time management of the game to instead use a global variable that ticks down over time. This allows me to display the remaining time accurately.
+ Create a new title screen (e.g., new artwork, typography, layout) (10)
  - Moved the prompts to the side-corners of the screen and moved the title to the top.
+ Implement parallax scrolling for the background (10)
  - Created a planet background that moves very slowly to give the sense of moving through space. This is supposed to complement the starstreaks and the original starfield.

15-Point Tier
+ Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
  - Added my own spaceship artwork, then created a new BeefySpaceship class that essentially functions like the normal Spaceship class but has a higher speed multiplier.
+ Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
  - With the overhaul of the time management in the game, time can now be added based on the score of the ship (ex. 50 points = 5 more seconds).

Total points: 105 (assuming everything works properly)

Citations:
Sound effects created via jsfxr: https://sfxr.me/
Rocket patrol codebase adapted from Nathan Altice: https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html
Background music by Lesiakower from Pixabay: https://pixabay.com/music/video-games-item-obtained-123644/
Phaser API documentation extensively used for the project: https://newdocs.phaser.io/docs/3.60.0
*/

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