const fs = require('fs');
const OPCODES = require('./opcodes.js').OPCODES;
const parse = require('./parseContent.js').parse;
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

const getLineIndex = (lineNum, instructions) => {
  const index = instructions.indexOf(instructions.find((ins) =>
    ins.LN === lineNum));

  return index < 0 ? instructions.length : index;
};

const updateTraceTable = function (instruction, registerSet) {
  TRACETABLE.push(JSON.parse(JSON.stringify(
    { ...instruction, ...registerSet })));
};

const executeInstruction = (registerSet, currentIns) => {
  return OPCODES[currentIns.opcode](registerSet, currentIns);
};

const runInstructions = function (instructions, registerSet) {
  registerSet.NL = instructions[0].LN;

  let index = 0;
  while (index < instructions.length) {
    const currentIns = instructions[index];
    const nextIns = instructions[index + 1];

    registerSet.CL = currentIns.LN;
    registerSet.NL = nextIns ? nextIns.LN : null;
    registerSet = executeInstruction(registerSet, currentIns);
    updateTraceTable(currentIns, registerSet);

    index = getLineIndex(registerSet.NL, instructions);
  }

  return registerSet;
};

const readFile = function (filename) {
  try {
    return fs.readFileSync(filename, 'utf-8');
  } catch (error) {
    throw filename + ' not found'
  }
};

const main = function (filename) {
  const instructionsAsString = readFile(filename);
  const instructions = parse(instructionsAsString);
  runInstructions(instructions, registerSet);
  generateTable(TRACETABLE);
};

exports.main = main;
