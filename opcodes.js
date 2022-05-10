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
  registerSet.NL = 0;
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

const jmp = (registerSet, instruction) => {
  registerSet.NL = instruction.operands[0];

  return registerSet;
};

const cmp = (registerSet, instruction) => {
  setRegistersTo(registerSet, false, 'EQ', 'NE', 'GT', 'LT');
  const [operand1, operand2] = operandValues(instruction.operands, registerSet);
  setRegistersTo(registerSet, true, ...getRelation(operand1, operand2));

  return registerSet;
};

const OPCODES = {
  START: start,
  MOV: mov,
  STOP: stop,
  JMP: jmp,
  ADD: add,
  SUB: sub,
  CMP: cmp
};

exports.OPCODES = OPCODES;