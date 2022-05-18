const operandValue = require('../helpers.js').operandValue;

const add = (registerSet, instruction) => {
  const [operand1, operand2] = instruction.operands;
  registerSet[operand1] += operandValue(operand2, registerSet);

  return registerSet;
};

exports.add = add;
