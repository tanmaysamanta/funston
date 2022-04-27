const resetRegistersTo = function (registers, value) {
  for (const register in registers) {
    registers[register] = value;
  }

  return registers;
};

const start = function (registerSet) {
  resetRegistersTo(registerSet.dataRegisters, 0);
  resetRegistersTo(registerSet.flags, false);

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

const opcodes = {
  START: start,
  MOV: mov,
  STOP: stop
};

exports.opcodes = opcodes;