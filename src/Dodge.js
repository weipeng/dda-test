var DDATest = DDATest || {};

DDATest.Dodge = function(game) {

};

DDATest.Dodge.prototype.create = function() {
  // vars
  this.velocity = 1000;
  this.fails = 0;
  this.counter = 0;
  // physics
  this.physics.startSystem(Phaser.Physics.ARCADE);
  // dda
  // TODO
  // juice
  // TODO
  // wabbit
  this.player = this.add.sprite(this.world.centerX, 700, 'wabbit');
  this.player.anchor.setTo(0.5, 0.5);
  this.physics.enable(this.player, Phaser.Physics.ARCADE);
  // ball
  this.ball = this.add.sprite(this.rnd.integerInRange(0, this.world.width), 20, 'ball');
  this.ball.anchor.setTo(0.5, 0.5);
  this.physics.enable(this.ball, Phaser.Physics.ARCADE);
  this.ball.checkWorldBounds = true;
  this.ball.events.onOutOfBounds.add(this.resetBall, this);
  this.resetBall();
};

DDATest.Dodge.prototype.update = function() {
  this.player.x = this.input.x;
  this.physics.arcade.overlap(this.player, this.ball, this.onHit, null, this);
};

DDATest.Dodge.prototype.onHit = function() {
  this.fails++;
  //this.juicy.shake();
  this.resetBall();
};

DDATest.Dodge.prototype.resetBall = function() {
  this.setVelocity();
  var x = this.rnd.integerInRange(-200, this.world.width + 200);
  var y = this.rnd.integerInRange(-50, -10);
  this.ball.reset(x, y);
  this.physics.arcade.moveToXY(this.ball, this.player.body.x, this.player.body.y, this.velocity);
};

DDATest.Dodge.prototype.setVelocity = function() {
  if (this.counter++ % 5 === 0) {
    if (this.fails > 1) {
      //TODO
      //this.dda.update('velocity', POSM.TOO_HARD);
    } else {
      //TODO
      //this.dda.update('velocity', POSM.TOO_EASY);
    }
    this.fails = 0;
    this.counter = 0;
  }
};
