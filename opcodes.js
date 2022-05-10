const isNumber = (text) => +text === text;
const resetRegistersTo = (registerSet, value, ...registers) => {
  registers.forEach((register) => registerSet[register] = value);

  return registerSet;
};

const start = function (registerSet) {
  resetRegistersTo(registerSet, 0, 'A', 'B', 'C', 'D');
  resetRegistersTo(registerSet, false, 'EQ', 'NE', 'GT', 'LT');

  return registerSet;
};

const mov = function (registerSet, instruction) {
  const [operand1, operand2] = instruction.operands;
  const value = isNumber(operand2) ? operand2 : registerSet[operand2];
  registerSet[operand1] = value;

  return registerSet;
};

const stop = (registerSet) => {
  registerSet.NL = 0;
  return registerSet;
};

const jmp = (registerSet, instruction) => {
  registerSet.NL = instruction.operands[0];

  return registerSet;
};

const add = (registerSet, instruction) => {
  const [operand1, operand2] = instruction.operands;
  const value = isNumber(operand2) ? operand2 : registerSet[operand2];
  registerSet[operand1] += value;

  return registerSet;
};

const sub = (registerSet, instruction) => {
  const [operand1, operand2] = instruction.operands;
  const value = isNumber(operand2) ? operand2 : registerSet[operand2];
  registerSet[operand1] -= value;

  return registerSet;
};

const opcodes = {
  START: start,
  MOV: mov,
  STOP: stop,
  JMP: jmp,
  ADD: add,
  SUB: sub
};

exports.opcodes = opcodes;