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
  // success rate
  this.totalTrials = 0;
  this.correctTrials = 0;
  // set up the input key
  this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // set up DDA
  this.dda = new POSM.Posm();
  this.interval = this.dda.init('interval', [2000, 1500, 1000, 500, 250]);
  console.log(this.interval)
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
  this.updateInterval();
  this.reset();
  this.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    if (this.rnd.integerInRange(0, 10) < 5) {
      this.red.revive();
    } else {
      this.blue.revive();
    }
    this.space.onDown.addOnce(this.onSpaceBarPressed, this);
    this.time.events.add(this.interval, this.onTimeout, this);
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
};

GoNoGo.Game.prototype.updateInterval = function() {
  var success = this.correctTrials/this.totalTrials;
  if (success < 0.75) {
    this.interval = this.dda.update('interval', POSM.TOO_HARD);
  } else {
    this.interval = this.dda.update('interval', POSM.TOO_EASY);
  }
  console.log(this.interval);
};
