const OPCODES = require('./opcodes.js').OPCODES;
const stringToObject = require('./stringToObject').stringToObject;
const fs = require('fs');

const registerSet = {
  CL: 0,
  NL: 0,
  A: 0,
  B: 0,
  C: 0,
  D: 20,
  EQ: true,
  NE: false,
  GT: false,
  LT: false
};

const isPresent = (item, list) => list.includes(item);
const getIndex = (instructions, lineNum) => {
  const index = instructions.indexOf(instructions.find((ins) => ins.LN === lineNum));

  return index < 0 ? instructions.length : index;
};

const printTraceTable = function (instruction, registerSet) {
  console.table(instruction);
  console.table(registerSet);
};

const isNextLineUpdated = (registerSet, opcode) => {
  const jumpIns = ['JMP', 'STOP', 'JE', 'JNE', 'JLT', 'JGT', 'JLE', 'JGE'];
  return isPresent(opcode, jumpIns) && registerSet.CL !== registerSet.NL;
};

const updateNextLine = function (registerSet, currentIns, nextIns) {
  if (isNextLineUpdated(registerSet, currentIns.opcode)) {
    return registerSet;
  }

  registerSet.NL = nextIns.LN;
  return registerSet;
};

const executeInstruction = function (registerSet, currentIns) {
  const opcode = currentIns.opcode;
  OPCODES[opcode](registerSet, currentIns);

  return registerSet;
};

const runInstructions = function (instructions, registerSet) {
  registerSet.NL = instructions[0].LN;

  let index = 0;
  while (index < instructions.length) {
    const currentIns = instructions[index];
    registerSet.CL = currentIns.LN;
    executeInstruction(registerSet, currentIns);
    updateNextLine(registerSet, currentIns, instructions[index + 1]);
    printTraceTable(currentIns, registerSet);
    index = getIndex(instructions, registerSet.NL);
  }

  return registerSet;
};

const instructionsAsString = fs.readFileSync("./instructions.txt", "utf-8");
const instructions = stringToObject(instructionsAsString);

runInstructions(instructions, registerSet);
