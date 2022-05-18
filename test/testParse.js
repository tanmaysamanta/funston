const assert = require('assert');
const parse = require('../src/parseContent.js').parse;

describe('Parse', () => {
  it('should parse when no operands', () => {
    const actual = parse("10 START");
    const expected = [{ 'LN': 10, 'opcode': 'START', 'operands': [] }];
    assert.deepStrictEqual(actual, expected);
  });

  it('should parse when both operands are registers', () => {
    const actual = parse("10 MOV A,B");
    const expected = [{ 'LN': 10, 'opcode': 'MOV', 'operands': ['A', 'B'] }];
    assert.deepStrictEqual(actual, expected);
  });

  it('should parse when operand is number', () => {
    const actual = parse("10 JMP 40");
    const expected = [{ 'LN': 10, 'opcode': 'JMP', 'operands': [40] }];
    assert.deepStrictEqual(actual, expected);
  });

  it('should parse multiple lines', () => {
    const actual = parse("10 START\n20 STOP");
    const expected = [
      { 'LN': 10, 'opcode': 'START', 'operands': [] },
      { 'LN': 20, 'opcode': 'STOP', 'operands': [] }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
