const operandValue = require('../helpers.js').operandValue;

const sub = (registerSet, instruction) => {
  const [operand1, operand2] = instruction.operands;
  registerSet[operand1] -= operandValue(operand2, registerSet);

  return registerSet;
};

exports.sub = sub;
