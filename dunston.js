const opcodes = require('./opcodes.js').opcodes;

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
    A: 10,
    B: 0,
    C: 0,
    D: 0
  },
  flags: {
    EQ: true,
    NE: false,
    GT: false,
    LT: false
  }
};

const updateNextLine = function (instructionPointers) {
  const lineNumber = instructionPointers.NL;
  instructionPointers.NL = lineNumber && lineNumber + 10;

  return instructionPointers;
};

const printTraceTable = function (instruction, registerSet) {
  console.table(instruction);
  console.table(registerSet);
};

const executeInstruction = function (instruction, registerSet) {
  registerSet.instructionPointers.CL = registerSet.instructionPointers.NL;

  const opcode = instruction.opcode;
  opcodes[opcode](registerSet, instruction);
  updateNextLine(registerSet.instructionPointers);

  printTraceTable(instruction, registerSet);
  return registerSet;
};

const runInstructions = function (instructions, registerSet) {
  let nextLine = registerSet.instructionPointers.NL;

  while (nextLine) {
    executeInstruction(instructions[nextLine], registerSet);
    nextLine = registerSet.instructionPointers.NL;
  }

  return registerSet;
};

runInstructions(instructions, registerSet);
