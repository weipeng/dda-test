var DDATest = DDATest || {};

DDATest.Menu = function(game) {

};

DDATest.Menu.prototype.create = function() {
  // show the cursor
  document.getElementById("gameContainer").style.cursor = "default";
  // set the background to white
  this.stage.backgroundColor = "#ffffff";
  this.gonogo = this.add.text(this.world.centerX, this.world.centerY - 20, 'play go/no-go >>');
  this.gonogo.anchor.set(0.5, 0.5);
  this.gonogo.inputEnabled = true;
  this.gonogo.events.onInputUp.add(function() {
    this.state.start('GoNoGo');
  }, this);
  //
  this.dodge = this.add.text(this.world.centerX, this.world.centerY + 20, 'play dodge game >>');
  this.dodge.anchor.set(0.5, 0.5);
  this.dodge.inputEnabled = true;
  this.dodge.events.onInputUp.add(function() {
    this.state.start('Catch');
  }, this);
};
