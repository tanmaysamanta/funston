const helpers = require('../helpers.js');

const start = function (registerSet) {
  helpers.resetRegisters(registerSet);
  helpers.resetFlags(registerSet);

  return registerSet;
};

exports.start = start;
