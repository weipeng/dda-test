var GoNoGo = {};

GoNoGo.Preloader = function(game) {

};

GoNoGo.Preloader.prototype.preload = function() {
  this.load.image('red-circle', 'assets/red-circle.png');
  this.load.image('blue-circle', 'assets/blue-circle.png');
};

GoNoGo.Preloader.prototype.create = function() {
  this.state.start('Game');
};
