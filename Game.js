 var GoNoGo = GoNoGo || {};

/**
 * GoNoGo - constructor
 *
 * @param  {type} game the game this state belongs to
 * @return {type}
 */
GoNoGo.Game = function(game) {

};

/**
 * Game.prototype.create - creates the game
 *
 * @return {type}
 */
GoNoGo.Game.prototype.create = function() {
  // set the background to white
  this.stage.backgroundColor = "#ffffff";
  // add the sprites
  this.red = this.add.sprite(this.world.centerX, this.world.centerY, 'red-circle');
  this.red.anchor.set(0.5, 0.5);
  this.blue = this.add.sprite(this.world.centerX, this.world.centerY, 'blue-circle');
  this.blue.anchor.set(0.5, 0.5);
  this.mask = this.add.sprite(this.world.centerX, this.world.centerY, 'purple-circle');
  this.mask.anchor.set(0.5, 0.5);
  // success rate
  this.totalTrials = 0;
  this.correctTrials = 0;
  // set up the input key
  this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // duration of each trial
  this.duration = 1000;
  // set up DDA
  this.dda = new POSM.Posm();
  this.mask.alpha = this.dda.init('alpha', [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75]);
  // start the first trial
  this.trial();
};

/**
 * Game.prototype.check - checks which sprite is alive and updates success rate
 *
 * @return {type}
 */
GoNoGo.Game.prototype.onSpaceBarPressed = function() {
  if (this.red.alive) {
    this.correctTrials++
  }
  this.totalTrials++;
  this.trial();
};

/**
 * Game.prototype.onTimeout - checks which sprite is alive and updates success rate
 *
 * @return {type}
 */
GoNoGo.Game.prototype.onTimeout = function() {
  if (this.blue.alive) {
    this.correctTrials++
  }
  this.totalTrials++;
  this.trial();
};

/**
 * Game.prototype.trial - runs a new trial
 *
 * @return {type}
 */
GoNoGo.Game.prototype.trial = function() {
  this.updateAlpha();
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
 * Game.prototype.reset - resets keys and timer, and kills sprites
 *
 * @return {type}
 */
GoNoGo.Game.prototype.reset = function() {
  this.space.reset(true);
  this.time.events.removeAll();
  this.red.kill();
  this.blue.kill();
  this.mask.kill();
};

GoNoGo.Game.prototype.updateAlpha = function() {
  var success = this.correctTrials/this.totalTrials;
  if (success < 0.75) {
    this.mask.alpha = this.dda.update('alpha', POSM.TOO_HARD);
  } else {
    this.mask.alpha = this.dda.update('alpha', POSM.TOO_EASY);
  }
};
