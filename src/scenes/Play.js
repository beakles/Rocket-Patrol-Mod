// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html
// Music by Lesiakower from Pixabay: https://pixabay.com/music/video-games-item-obtained-123644/

class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('spaceshipbeefy', './assets/spaceshipbeefy.png');
    this.load.image('starfield', './assets/starfield.png');
    this.load.image('starstreaks', './assets/starstreaks.png');
    this.load.image('planet', './assets/planet.png');

    // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
  }

  create() {

    currentGameTime = 0;

    // place tile sprite
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

    // place light streaks
    this.starstreaks = this.add.tileSprite(0, 0, 640, 480, 'starstreaks').setOrigin(0, 0);
    this.starstreaks.alpha = 0.25;

    // place planet
    this.planet = this.add.tileSprite(0, 0, 640, 480, 'planet').setOrigin(0, 0);
    this.planet.alpha = 0.75;

    // green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

    // white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);

    // add beefy spaceship (x1)
    this.beefyShip01 = new BeefySpaceship(this, -game.config.width, borderUISize*6 + borderPadding*10, 'spaceshipbeefy', 0, 50).setOrigin(0, 0);

    // randomize ship rotations
    let diceRoll = Phaser.Math.Between(1, 100);
    if (diceRoll < 50) {
      this.ship01.setX(0 - this.ship03.width - borderUISize*6)
      this.ship01.flipX = true;
      this.ship01.changeDirection('right');
    }
    diceRoll = Phaser.Math.Between(1, 100);
    if (diceRoll < 50) {
      this.ship02.setX(0 - this.ship03.width - borderUISize*3)
      this.ship02.flipX = true;
      this.ship02.changeDirection('right');
    }
    diceRoll = Phaser.Math.Between(1, 100);
    if (diceRoll < 50) {
      this.ship03.setX(0 - this.ship03.width)
      this.ship03.flipX = true;
      this.ship03.changeDirection('right');
    }

    // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    // animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
      frameRate: 30
    })

    // initialize score
    this.p1Score = 0;

    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }

    // display high score
    let highScoreConfig = {
      fontFamily: 'Courier',
      fontSize: '14px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'center',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
    // this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

    // score tracker
    this.scoreText = this.add.text(game.config.width/2 - 200, borderUISize + borderPadding*2, "SCORE", highScoreConfig).setOrigin(0.5, 0);
    this.scoreLeft = this.add.text(game.config.width/2 - 200, borderUISize + borderPadding*2 + 20, highestScore, highScoreConfig).setOrigin(0.5, 0);

    // high score tracker
    this.highScoreText = this.add.text(game.config.width/2, borderUISize + borderPadding*2, "HIGH SCORE", highScoreConfig).setOrigin(0.5, 0);
    this.highScoreCounter = this.add.text(game.config.width/2, borderUISize + borderPadding*2 + 20, highestScore, highScoreConfig).setOrigin(0.5, 0);

    // time tracker
    this.timeText = this.add.text(game.config.width/2 + 200, borderUISize + borderPadding*2, "TIME", highScoreConfig).setOrigin(0.5, 0);
    this.timeCounter = this.add.text(game.config.width/2 + 200, borderUISize + borderPadding*2 + 20, gameTime, highScoreConfig).setOrigin(0.5, 0);

    // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    /*
    this.clock = this.time.delayedCall(5000, () => {
      this.ship01.moveSpeed += 1;
      this.ship02.moveSpeed += 1;
      this.ship03.moveSpeed += 1;
      this.beefyShip01.moveSpeed += 1;
    }, null, this);
    */

    // Music by Lesiakower from Pixabay: https://pixabay.com/music/video-games-item-obtained-123644/
    this.music = this.sound.add('music_loop');
    this.music.setVolume(0.5);
    this.music.setLoop(true);
    this.music.play();

    // fire text that appears when the rocket fires
    let fireConfig = {
      fontFamily: 'Courier',
      fontSize: '14px',
      backgroundColor: '#FF8080',
      color: '#843605',
      align: 'center',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 50
    }

    // set to invisible, reveals itself when the player fires the rocket
    this.fireText = this.add.text(game.config.width/2 - 100, borderUISize + borderPadding*2, "FIRE", fireConfig).setOrigin(0.5, 0);
    this.fireText.setVisible(false);
  }

// https://phaser.discourse.group/t/different-game-speed-depending-on-monitor-refresh-rate/7231
// used the above resource to have the game's runtime not be affected by my monitor's refresh rate
// phaser's update() function automatically provides the time and delta.
  update(time, delta) {

    increment = 60 / delta; // how many frames per second

    if (gameTime <= 0 && !this.gameOver) {
      this.gameOver = true;
      let gameOverConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
      }
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', gameOverConfig).setOrigin(0.5);
    }

    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      gameTime = difficultyTime;
      currentGameTime = 0;
      gameTimeDebounce = false;
      this.music.stop();
      this.scene.restart();
      /*
      if (game.settings.chosenDifficulty == "easy") {
        gameTime = 60000;
      } else {
        gameTime = 45000;
      }
      */
    }

    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.music.stop();
      gameTime = 0;
      currentGameTime = 0;
      difficultyTime = 0;
      this.scene.start("menuScene");
    }

    this.starfield.tilePositionX -= 2;
    this.starstreaks.tilePositionX -= 4;
    this.planet.tilePositionX -= 0.1;
    this.planet.tilePositionY -= 0.01;

    currentGameTime += increment;// (1000 / 120);

    if (rocketMoving) {
      this.fireText.setVisible(true);
    } else {
      this.fireText.setVisible(false);
    }

    if (currentGameTime > 30000 && !gameTimeDebounce) {
      gameTimeDebounce = true;
      this.timeText.setBackgroundColor('#FF8080');
      this.timeCounter.setBackgroundColor('#FF8080');
      this.ship01.moveSpeed += 1;
      this.ship02.moveSpeed += 1;
      this.ship03.moveSpeed += 1;
      this.beefyShip01.moveSpeed += 1;
    }

    if (!this.gameOver) {
      this.p1Rocket.update();             // update rocket sprite
      this.ship01.update();               // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
      this.beefyShip01.update();          // update beefy spaceship (x1)
      gameTime -= increment;// (1000 / 120);
      this.timeCounter.text = Math.ceil(gameTime / 1000);
    }

    // check collisions
    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }

    if (this.checkCollision(this.p1Rocket, this.beefyShip01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.beefyShip01);
    }
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
      return true;
    } else {
      return false;
    }
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;

    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });

    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    if (highestScore < this.p1Score) {
      highestScore = this.p1Score;
    }

    this.highScoreCounter.text = highestScore;
    gameTime += ship.points * 100;

    let explosionDiceRoll = Phaser.Math.Between(1, 100);
    // console.log(explosionDiceRoll);
    if (explosionDiceRoll <= 19) {
      this.sound.play('sfx_explosion');
    } else if (explosionDiceRoll <= 39) {
      this.sound.play('sfx_explosion1');
    } else if (explosionDiceRoll <= 59) {
      this.sound.play('sfx_explosion2');
    } else if (explosionDiceRoll <= 79) {
      this.sound.play('sfx_explosion3');
    } else if (explosionDiceRoll <= 100) {
      this.sound.play('sfx_explosion4');
    }
  }
}
