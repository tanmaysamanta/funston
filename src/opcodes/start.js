const resetRegisters = (registerSet) => {
  registerSet.A = 0;
  registerSet.B = 0;
  registerSet.C = 0;
  registerSet.D = 0;

  return registerSet;
};

const resetFlags = (registerSet) => {
  registerSet.EQ = false;
  registerSet.NE = false;
  registerSet.GT = false;
  registerSet.LT = false;

  return registerSet;
};

const start = function (registerSet) {
  resetRegisters(registerSet);
  resetFlags(registerSet);

  return registerSet;
};

exports.start = start;
