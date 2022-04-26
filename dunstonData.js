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
    CL: 10,
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