const operandValues = require('../helpers.js').operandValues;
const resetFlags = require('../helpers.js').resetFlags;

const compare = (registerSet, instruction) => {
  resetFlags(registerSet);
  const [operand1, operand2] = operandValues(instruction.operands, registerSet);

  if (operand1 === operand2) {
    registerSet['EQ'] = true;
  } else {
    registerSet['NE'] = true;
    const flag = operand1 > operand2 ? 'GT' : 'LT';
    registerSet[flag] = true;
  }

  return registerSet;
};

exports.compare = compare; 
