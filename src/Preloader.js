var DDATest = {};

DDATest.Preloader = function(game) {

};

DDATest.Preloader.prototype.preload = function() {
  // gonogo
  this.load.image('red-circle', 'assets/red-circle.png');
  this.load.image('blue-circle', 'assets/blue-circle.png');
  this.load.image('purple-circle', 'assets/purple-circle.png');
  // Catch
  this.load.image('wabbit', 'assets/wabbit.png');
  this.load.image('ball', 'assets/small-red-circle.png');
  this.load.audio('collect-coin', ['assets/collect-coin.ogg', 'assets/collect-coin.m4a'])
};

DDATest.Preloader.prototype.create = function() {
  this.state.start('Menu');
};
