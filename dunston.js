const fs = require('fs');
const OPCODES = require('./opcodes.js').OPCODES;
const stringToObject = require('./stringToObject').stringToObject;
const generateTable = require('./traceTable.js').generateTable;

const TRACETABLE = [];
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
const getLineIndex = (lineNum, instructions) => {
  const index = instructions.indexOf(instructions.find((ins) =>
    ins.LN === lineNum));

  return index < 0 ? instructions.length : index;
};

const updateTraceTable = function (instruction, registerSet) {
  TRACETABLE.push(JSON.parse(JSON.stringify(
    { ...instruction, ...registerSet })));
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
  registerSet = OPCODES[opcode](registerSet, currentIns);

  return registerSet;
};

const runInstructions = function (instructions, registerSet) {
  registerSet.NL = instructions[0].LN;

  let index = 0;
  while (index < instructions.length) {
    const currentIns = instructions[index];
    registerSet.CL = currentIns.LN;
    registerSet = executeInstruction(registerSet, currentIns);
    registerSet = updateNextLine(
      registerSet, currentIns, instructions[index + 1]);
    updateTraceTable(currentIns, registerSet);
    index = getLineIndex(registerSet.NL, instructions);
  }

  return registerSet;
};

const main = function (filename) {
  const instructionsAsString = fs.readFileSync(filename, 'utf-8');
  const instructions = stringToObject(instructionsAsString);
  runInstructions(instructions, registerSet);
  generateTable(TRACETABLE);
};

main(process.argv.slice(2)[0]);
