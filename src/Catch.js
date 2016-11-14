var DDATest = DDATest || {};

DDATest.Catch = function(game) {

};

DDATest.Catch.prototype.create = function() {
  // add quit hotkey
  var quit = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  quit.onDown.add(function() {
    this.state.start('Menu');
  }, this);
  // instructions
  this.add.text(10, 500, 'catch the balls', { font: "24px Arial", fill: "#000000", align: "center" });
  this.add.text(10, 550, 'mouse to move', { font: "24px Arial", fill: "#000000", align: "center" });
  this.add.text(10, 600, 'ESC to quit', { font: "24px Arial", fill: "#000000", align: "center" });
  // hide the cursor
  document.getElementById("gameContainer").style.cursor = "none";
  // vars
  this.caught = 0;
  this.counter = -1;
  // physics
  this.physics.startSystem(Phaser.Physics.ARCADE);
  // dda
  this.dda = new POSM.Posm();
  this.velocities = [200, 300, 400, 500, 600, 700, 800,900, 1000, 1100, 1200,
                    1300, 1400,1500, 1600, 1700, 1800, 1900, 2000,2100, 2200,
                    2300, 2400, 2500, 2600,2700, 2800, 2900, 3000, 3100, 3200];
  this.velocity = this.dda.init('velocity', this.velocities);
  // wabbit
  this.player = this.add.sprite(this.world.centerX, 700, 'wabbit');
  this.player.anchor.setTo(0.5, 0.5);
  this.physics.enable(this.player, Phaser.Physics.ARCADE);
  // ball
  this.ball = this.add.sprite(this.rnd.integerInRange(0, this.world.width), 20, 'ball');
  this.ball.anchor.setTo(0.5, 0.5);
  this.physics.enable(this.ball, Phaser.Physics.ARCADE);
  this.resetBall();
};

DDATest.Catch.prototype.update = function() {
  this.player.x = this.input.x;
  if (this.ball.y > this.player.y) {
    this.resetBall();
  }
  this.game.debug.text('difficulty setting: ' + this.velocities.indexOf(this.velocity), 10, 30, 'black');
};

DDATest.Catch.prototype.onHit = function() {

};

DDATest.Catch.prototype.resetBall = function() {
  if (Phaser.Rectangle.intersects(this.player.getBounds(), this.ball.getBounds())) {
    if (this.counter >= 0) {this.caught++;};
  }
  if (this.counter % 3 === 0) {
    this.setVelocity();
  }
  this.ball.kill();
  var x0 = this.rnd.integerInRange(-200, this.world.width + 200);
  var y0 = this.rnd.integerInRange(-50, -10);
  var x1 = this.rnd.integerInRange(100, this.world.width - 100);
  var y1 = this.world.height + 100;
  this.ball.reset(x0, y0);
  this.physics.arcade.moveToXY(this.ball, x1, y1, this.velocity);
  this.counter++;
};

DDATest.Catch.prototype.setVelocity = function() {
  if (this.caught === 3) {
    this.velocity = this.dda.update('velocity', POSM.TOO_EASY);
  } else {
    this.velocity = this.dda.update('velocity', POSM.TOO_HARD);
  }
  this.caught = 0;
  console.log(this.velocity)
};
