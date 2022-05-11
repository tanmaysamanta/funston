const isNumber = (text) => +text === text;
const setRegistersTo = (registerSet, value, ...registers) => {
  registers.forEach((register) => registerSet[register] = value);

  return registerSet;
};

const operandValue = (operand, registerSet) => {
  return isNumber(operand) ? operand : registerSet[operand];
};

const operandValues = (operands, registerSet) => operands.map((operand) => {
  return operandValue(operand, registerSet);
});

const getRelation = function (operand1, operand2) {
  const statusFlags = {
    true: { false: ['EQ'] },
    false: { true: ['NE', 'LT'], false: ['NE', 'GT'] }
  };

  return statusFlags[operand1 === operand2][operand1 < operand2];
};

const start = function (registerSet) {
  setRegistersTo(registerSet, 0, 'A', 'B', 'C', 'D');
  setRegistersTo(registerSet, false, 'EQ', 'NE', 'GT', 'LT');

  return registerSet;
};

const mov = function (registerSet, instruction) {
  const [operand1, operand2] = instruction.operands;
  registerSet[operand1] = operandValue(operand2, registerSet);

  return registerSet;
};

const stop = (registerSet) => {
  registerSet.NL = null;
  return registerSet;
};

const add = (registerSet, instruction) => {
  const [operand1, operand2] = instruction.operands;
  registerSet[operand1] += operandValue(operand2, registerSet);

  return registerSet;
};

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
  setRegistersTo(registerSet, false, 'EQ', 'NE', 'GT', 'LT');
  const [operand1, operand2] = operandValues(instruction.operands, registerSet);
  setRegistersTo(registerSet, true, ...getRelation(operand1, operand2));

  return registerSet;
};

const jumpIfEqual = (registerSet, instruction) => {
  return registerSet.EQ ? jump(registerSet, instruction) : registerSet;
};

const jumpIfNotEqual = (registerSet, instruction) => {
  return registerSet.NE ? jump(registerSet, instruction) : registerSet;
};

const jumpIfGreaterThan = (registerSet, instruction) => {
  return registerSet.GT ? jump(registerSet, instruction) : registerSet;
};

const jumpIfLessThan = (registerSet, instruction) => {
  return registerSet.LT ? jump(registerSet, instruction) : registerSet;
};

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