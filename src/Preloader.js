var DDATest = {};

DDATest.Preloader = function(game) {

};

DDATest.Preloader.prototype.preload = function() {
  this.load.image('red-circle', 'assets/red-circle.png');
  this.load.image('blue-circle', 'assets/blue-circle.png');
  this.load.image('purple-circle', 'assets/purple-circle.png');
};

DDATest.Preloader.prototype.create = function() {
  this.state.start('Menu');
};
