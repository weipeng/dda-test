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
    // update the belief of the current setting, and those more difficult
    for (var i = this.current; i < this[name].values.length; i++) {
      this[name].belief[i] *= POSM.LEARNING_RATE;
    }
    // get the next easiest setting with more belief
    var currentBelief = this[name].belief[this.current];
    for (var j = 0; j < this[name].values.length; j++) {
      var belief = this[name].belief[j];
      if (belief > currentBelief) {
        this.current = j;
      }
    }
  } else {
    // update the belief of the current setting, and those less difficult
    for (var i = this.current; i > -1; i--) {
      this[name].belief[i] *= POSM.LEARNING_RATE;
    }
    // get the next more dificult setting with more belief
    var currentBelief = this[name].belief[this.current];
    for (var k = 0; k < this[name].values.length; k++) {
      var belief = this[name].belief[k];
      if (belief > currentBelief) {
        this.current = k;
        break;
      }
    }
  }
  console.log(this.current);
  return this[name].values[this.current];
};
