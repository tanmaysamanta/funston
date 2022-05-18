const start = require('./opcodes/start.js').start;
const stop = require('./opcodes/stop.js').stop;
const mov = require('./opcodes/mov.js').mov;
const add = require('./opcodes/add.js').add;
const operandValues = require('./helpers.js').operandValues;
const operandValue = require('./helpers.js').operandValue;
const resetFlags = require('./helpers.js').resetFlags;

const sub = (registerSet, instruction) => {
  const [operand1, operand2] = instruction.operands;
  registerSet[operand1] -= operandValue(operand2, registerSet);

  return registerSet;
};

const jump = (registerSet, instruction) => {
  registerSet.NL = instruction.operands[0];

  return registerSet;
};

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

const jumpIfFlag = (flag, registerSet, instruction) => {
  return registerSet[flag] ? jump(registerSet, instruction) : registerSet;
};

const jumpIfEqual = jumpIfFlag.bind(null, 'EQ');
const jumpIfNotEqual = jumpIfFlag.bind(null, 'NE');
const jumpIfGreaterThan = jumpIfFlag.bind(null, 'GT');
const jumpIfLessThan = jumpIfFlag.bind(null, 'LT');

const jumpIfGTOrEQ = (registerSet, instruction) => {
  return registerSet.GT || registerSet.EQ ?
    jump(registerSet, instruction) : registerSet;
};

const jumpIfLTOrEQ = (registerSet, instruction) => {
  return registerSet.LT || registerSet.EQ ?
    jump(registerSet, instruction) : registerSet;
};

const OPCODES = {
  START: start,
  MOV: mov,
  STOP: stop,
  JMP: jump,
  ADD: add,
  SUB: sub,
  CMP: compare,
  JE: jumpIfEqual,
  JNE: jumpIfNotEqual,
  JGT: jumpIfGreaterThan,
  JLT: jumpIfLessThan,
  JGE: jumpIfGTOrEQ,
  JLE: jumpIfLTOrEQ
};

exports.OPCODES = OPCODES;
