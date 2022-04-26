const getOpcode = function (instruction) {
  return instruction[0];
};

const firstOperand = function (instruction) {
  return instruction[1];
};

const secondOperand = function (instruction) {
  return instruction[2];
};

const start = function (instruction, registerSet) {
  for (register in registerSet) {
    registerSet[register] = 0;
  }

  return registerSet;
};

const mov = function (instruction, registerSet) {
  const operand1 = firstOperand(instruction)
  const operand2 = secondOperand(instruction)
  registerSet[operand1] = operand2;

  return registerSet;
};

const executeInstruction = function (instruction, registerSet) {
  const opcode = getOpcode(instruction);
  opcodes[opcode](instruction, registerSet);

  return registerSet;
};

const registerSet = {
  A: 0,
  B: 0,
  C: 0,
  D: 1
};

const opcodes = {
  START: start,
  MOV: mov
};

const instructions = [['START'], ['MOV', 'A', 10]];

console.log(instructions[0], ':', executeInstruction(instructions[0], registerSet));

console.log(instructions[1], ':', executeInstruction(instructions[1], registerSet));
