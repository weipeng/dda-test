var DDATest = DDATest || {};

DDATest.Menu = function(game) {

};

DDATest.Menu.prototype.create = function() {
  // set the background to white
  this.stage.backgroundColor = "#ffffff";
  this.gonogo = this.add.text(this.world.centerX, this.world.centerY - 20, 'play go/no-go >>');
  this.gonogo.anchor.set(0.5, 0.5);
  this.gonogo.inputEnabled = true;
  this.gonogo.events.onInputUp.add(function() {
    this.state.start('GoNoGo');
  }, this);
  //
  this.asteroids = this.add.text(this.world.centerX, this.world.centerY + 20, 'play some other game');
  this.asteroids.anchor.set(0.5, 0.5);
  this.asteroids.inputEnabled = true;
  this.asteroids.events.onInputUp.add(function() {
    // do nothing
  }, this);
};
