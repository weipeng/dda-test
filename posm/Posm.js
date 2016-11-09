var POSM = POSM || {};

POSM.TOO_HARD = 1;

POSM.TOO_EASY = 0;

POSM.LEARNING_RATE = 0.5;

POSM.Posm = function() {

};

POSM.Posm.prototype.init = function(name, values) {
  this[name] = {
    values: values,
    belief: []
  };
  for (var value in values) {
    this[name].belief.push(1);
  }
  this.current = Math.floor(values.length / 2);
  return this[name].values[this.current];
};

POSM.Posm.prototype.update = function(name, observation) {
  if (observation === POSM.TOO_HARD) {
    for (var i = this.current; i < this[name].values.length; i++) {
      this[name].belief[i] *= POSM.LEARNING_RATE;
    }
  } else {
    for (var i = this.current; i > -1; i--) {
      this[name].belief[i] *= POSM.LEARNING_RATE;
    }
  }
  var currentBelief = this[name].belief[this.current];
  for (var j = 0; j < this[name].values.length; j++) {
    var belief = this[name].belief[j];
    if (belief > currentBelief) {
      this.current = j;
    }
  }
  return this[name].values[this.current];
};
