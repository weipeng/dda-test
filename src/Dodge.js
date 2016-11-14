var DDATest = DDATest || {};

DDATest.Dodge = function(game) {

};

DDATest.Dodge.prototype.create = function() {
  // vars
  this.velocity = 1000;
  // physics
  this.physics.startSystem(Phaser.Physics.ARCADE);
  // wabbit
  this.player = this.add.sprite(this.world.centerX, 700, 'wabbit');
  this.player.anchor.setTo(0.5, 0.5);
  this.physics.enable(this.player, Phaser.Physics.ARCADE);
  // ball
  this.ball = this.add.sprite(this.rnd.integerInRange(0, this.world.width), 20, 'ball');
  this.ball.anchor.setTo(0.5, 0.5);
  this.physics.enable(this.ball, Phaser.Physics.ARCADE);
  this.ball.body.onCollide = new Phaser.Signal();
  this.ball.body.onCollide.add(this.resetBall, this);
  this.ball.checkWorldBounds = true;
  this.ball.events.onOutOfBounds.add(this.resetBall, this);
  this.resetBall();
};

DDATest.Dodge.prototype.update = function() {
  this.player.x = this.input.x;
  this.physics.arcade.overlap(this.player, this.ball);
};

DDATest.Dodge.prototype.resetBall = function() {
  var x = 0;
  var y = 0;
  // TODO make the ball start from any of N, S, E, W
  this.ball.reset(x, y);
  this.physics.arcade.moveToXY(this.ball, this.player.body.x, this.player.body.y, this.velocity);
};
