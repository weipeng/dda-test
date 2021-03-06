 var DDATest = DDATest || {};

/**
 * DDATest - constructor
 *
 * @param  {type} game the game this state belongs to
 * @return {type}
 */
DDATest.GoNoGo = function(game) {

};

/**
 * GoNoGo.prototype.create - creates the game
 *
 * @return {type}
 */
DDATest.GoNoGo.prototype.create = function() {
  // hide the cursor
  document.getElementById("gameContainer").style.cursor = "none";
  // add quit hotkey
  var quit = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  quit.onDown.add(function() {
    this.state.start('Menu');
  }, this);
  // add the sprites
  this.red = this.add.sprite(this.world.centerX, this.world.centerY, 'red-circle');
  this.red.anchor.set(0.5, 0.5);
  this.blue = this.add.sprite(this.world.centerX, this.world.centerY, 'blue-circle');
  this.blue.anchor.set(0.5, 0.5);
  this.mask = this.add.sprite(this.world.centerX, this.world.centerY, 'purple-circle');
  this.mask.anchor.set(0.5, 0.5);
  // success rate
  this.totalTrials = 1;
  this.correctTrials = 1;
  // set up the input key
  this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // duration of each trial
  this.duration = 1000;
  // set up DDA
  this.dda = new POSM.Posm();
  this.alphaSettings = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 0.99, 1];
  this.mask.alpha = this.dda.init('alpha', this.alphaSettings);
  // instructions
  this.add.text(10, 500, 'red: go', { font: "24px Arial", fill: "#000000", align: "center" });
  this.add.text(10, 550, 'blue: no go', { font: "24px Arial", fill: "#000000", align: "center" });
  this.add.text(10, 600, 'ESC to quit', { font: "24px Arial", fill: "#000000", align: "center" });
  // counts the number of trials
  this.counter = 0;
  // start the first trial
  this.trial();
};

/**
 * GoNoGo.prototype.update - displays debug info
 *
 * @return {type}
 */
DDATest.GoNoGo.prototype.update = function() {
  this.game.debug.text('success rate: ' + this.correctTrials/this.totalTrials, 10, 10, 'black');
  this.game.debug.text('difficulty setting: ' + this.alphaSettings.indexOf(this.mask.alpha), 10, 30, 'black');
};

/**
 * GoNoGo.prototype.check - checks which sprite is alive and updates success rate
 *
 * @return {type}
 */
DDATest.GoNoGo.prototype.onSpaceBarPressed = function() {
  if (this.red.alive) {
    this.correctTrials++
  }
  this.totalTrials++;
  this.trial();
};

/**
 * GoNoGo.prototype.onTimeout - checks which sprite is alive and updates success rate
 *
 * @return {type}
 */
DDATest.GoNoGo.prototype.onTimeout = function() {
  if (this.blue.alive) {
    this.correctTrials++
  }
  this.totalTrials++;
  this.trial();
};

/**
 * GoNoGo.prototype.trial - runs a new trial
 *
 * @return {type}
 */
DDATest.GoNoGo.prototype.trial = function() {
  if (++this.counter % 5 ===0) {
    this.updateAlpha();
  }
  this.reset();
  this.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    if (this.rnd.integerInRange(0, 10) < 5) {
      this.red.revive();
    } else {
      this.blue.revive();
    }
    this.mask.revive();
    this.space.onDown.addOnce(this.onSpaceBarPressed, this);
    this.time.events.add(this.duration, this.onTimeout, this);
  }, this);
};

/**
 * GoNoGo.prototype.reset - resets keys and timer, and kills sprites
 *
 * @return {type}
 */
DDATest.GoNoGo.prototype.reset = function() {
  this.space.reset(true);
  this.time.events.removeAll();
  this.red.kill();
  this.blue.kill();
  this.mask.kill();
};

DDATest.GoNoGo.prototype.updateAlpha = function() {
  var success = this.correctTrials/this.totalTrials;
  this.correctTrials = 1;
  this.totalTrials = 1;
  if (success < 0.75) {
    this.mask.alpha = this.dda.update('alpha', POSM.TOO_HARD);
  } else {
    this.mask.alpha = this.dda.update('alpha', POSM.TOO_EASY);
  }
};
