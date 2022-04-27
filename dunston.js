const instructions = {
  '10': {
    lineNumber: 10,
    opcode: 'START'
  },
  '20': {
    lineNumber: 20,
    opcode: 'MOV',
    operand1: 'B',
    operand2: 10
  },
  '30': {
    lineNumber: 30,
    opcode: 'STOP'
  }
};

const registerSet = {
  instructionPointers: {
    CL: 0,
    NL: 10
  },
  dataRegisters: {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  },
  flags: {
    EQ: false,
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

const stop = function (registerSet) {
  registerSet.instructionPointers.NL = 0;

  return registerSet;
};

const executeInstruction = function (instruction, registerSet) {
  console.table(instruction);

  registerSet.instructionPointers.CL = registerSet.instructionPointers.NL;
  const opcode = instruction.opcode;
  opcodes[opcode](registerSet, instruction);

  const nextLine = registerSet.instructionPointers.NL;
  registerSet.instructionPointers.NL = nextLine && nextLine + 10;

  return registerSet;
};

const opcodes = {
  START: start,
  MOV: mov,
  STOP: stop
};

console.table(executeInstruction(instructions['10'], registerSet));
console.table(executeInstruction(instructions['20'], registerSet));
console.table(executeInstruction(instructions['30'], registerSet));
