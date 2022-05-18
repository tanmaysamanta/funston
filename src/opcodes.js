const start = require('./opcodes/start.js').start;
const stop = require('./opcodes/stop.js').stop;
const mov = require('./opcodes/mov.js').mov;
const add = require('./opcodes/add.js').add;
const sub = require('./opcodes/sub.js').sub;
const compare = require('./opcodes/compare.js').compare;

const jump = (registerSet, instruction) => {
  registerSet.NL = instruction.operands[0];

  return registerSet;
};

const jumpIfFlag = (flag, registerSet, instruction) => {
  return registerSet[flag] ? jump(registerSet, instruction) : registerSet;
};

const jumpIfEqual = jumpIfFlag.bind(null, 'EQ');
const jumpIfNotEqual = jumpIfFlag.bind(null, 'NE');
const jumpIfGreaterThan = jumpIfFlag.bind(null, 'GT');
const jumpIfLessThan = jumpIfFlag.bind(null, 'LT');

const jumpIfGTOrEQ = (registerSet, instruction) => {
  return registerSet.GT || registerSet.EQ ?
    jump(registerSet, instruction) : registerSet;
};

const jumpIfLTOrEQ = (registerSet, instruction) => {
  return registerSet.LT || registerSet.EQ ?
    jump(registerSet, instruction) : registerSet;
};

const OPCODES = {
  START: start,
  MOV: mov,
  STOP: stop,
  JMP: jump,
  ADD: add,
  SUB: sub,
  CMP: compare,
  JE: jumpIfEqual,
  JNE: jumpIfNotEqual,
  JGT: jumpIfGreaterThan,
  JLT: jumpIfLessThan,
  JGE: jumpIfGTOrEQ,
  JLE: jumpIfLTOrEQ
};

exports.OPCODES = OPCODES;
