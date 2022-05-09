const opcodes = require('./opcodes.js').opcodes;
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

const printTraceTable = function (instruction, registerSet) {
  console.table(instruction);
  console.table(registerSet);
};

const executeInstruction = function (registerSet, currentIns) {
  const opcode = currentIns.opcode;
  opcodes[opcode](registerSet, currentIns);

  return registerSet;
};

const getIndex = (instructions, lineNum) => {
  const index = instructions.indexOf(instructions.find((ins) => ins.LN === lineNum));

  return index < 0 ? instructions.length : index;
};

const isPresent = (item, list) => list.includes(item);

const updateNextLine = function (registerSet, currentIns, nextIns) {
  const jumpInstructions = ['JMP', 'STOP'];
  if (isPresent(currentIns.opcode, jumpInstructions)) {
    return registerSet;
  }

  return registerSet.NL = nextIns.LN;
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
