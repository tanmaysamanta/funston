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

const operandValue = (operand, registerSet) => {
  return isNumber(operand) ? operand : registerSet[operand];
};

const operandValues = (operands, registerSet) => operands.map((operand) => {
  return operandValue(operand, registerSet);
});

const isNumber = (text) => +text === text;

exports.resetFlags = resetFlags;
exports.resetRegisters = resetRegisters;
exports.operandValues = operandValues;
exports.operandValue = operandValue;
