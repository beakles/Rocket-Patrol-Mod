// Code adapted from https://pre83.com/CMPM120/Project%2001%20%20Phaser%203%20Rocket%20Patrol%20Tutorial.html

class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    this.load.audio('music_loop', './assets/item-obtained-123644.mp3')

    this.load.audio('sfx_explosion1', './assets/explosion1.wav');
    this.load.audio('sfx_explosion2', './assets/explosion2.wav');
    this.load.audio('sfx_explosion3', './assets/explosion3.wav');
    this.load.audio('sfx_explosion4', './assets/explosion4.wav');
  }

  create() {
    let menuConfig = {
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

    // show menu text
    this.add.text(game.config.width/2, game.config.height/2 - 200, ' ROCKET PATROL 2 \n ELECTRIC BOOGALOO ', menuConfig).setOrigin(0.5).setAlign("center");
    this.add.text(game.config.width/2 - 200, game.config.height/2 - 100, ' CONTROLS ', menuConfig).setOrigin(0.5).setAlign("center");
    this.add.text(game.config.width/2 - 200, game.config.height/2, ' ← → = MOVE \n [F] = FIRE ', menuConfig).setOrigin(0.5).setAlign("center");
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2 + 200, game.config.height/2 - 100, ' DIFFICULTY ', menuConfig).setOrigin(0.5).setAlign("center");
    this.add.text(game.config.width/2 + 200, game.config.height/2, ' ← = EASY \n → = HARD ', menuConfig).setOrigin(0.5).setAlign("center");
    /*
    this.add.text(20, 20, "Rocket Patrol Menu");
    this.scene.start("playScene");
    */

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        chosenDifficulty: "easy",
      }
      difficultyTime = 60000;
      gameTime = difficultyTime;
      currentGameTime = 0;
      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        chosenDifficulty: "hard",
      }
      difficultyTime = 45000;
      gameTime = difficultyTime;
      currentGameTime = 0;
      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
  }
}
