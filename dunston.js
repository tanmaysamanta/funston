const instructions = {
  '10': {
    lineNumber: 10,
    opcode: 'START'
  },
  '20': {
    lineNumber: 20,
    opcode: 'MOV',
    operand1: 'A',
    operand2: 10
  }
};

const registerSet = {
  instructionPointers: {
    CL: 0,
    NL: 10
  },
  dataRegisters: {
    A: 0,
    B: 1,
    C: 10,
    D: 0
  },
  flags: {
    EQ: true,
    NE: false,
    GT: false,
    LT: false
  }
};

const resetFlags = function (flags) {
  for (const flag in flags) {
    flags[flag] = false;
  }
};

const resetDataRegisters = function (registers) {
  for (const register in registers) {
    registers[register] = 0;
  }
};

const start = function (registerSet) {
  resetDataRegisters(registerSet.dataRegisters);
  resetFlags(registerSet.flags);

  return registerSet;
};

const mov = function (registerSet, instruction) {
  const destinationRegister = instruction.operand1;
  registerSet.dataRegisters[destinationRegister] = instruction.operand2;

  return registerSet;
};

const executeInstruction = function (instruction, registerSet) {
  console.table(instruction);

  registerSet.instructionPointers.CL = registerSet.instructionPointers.NL;
  const opcode = instruction.opcode;
  opcodes[opcode](registerSet, instruction);
  registerSet.instructionPointers.NL += 10;

  return registerSet;
};

const opcodes = {
  START: start,
  MOV: mov
};

console.table(registerSet);
console.table(executeInstruction(instructions['10'], registerSet));
console.table(executeInstruction(instructions['20'], registerSet));
