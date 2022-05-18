const assert = require('assert');
const add = require('../src/opcodes/add.js').add;

describe('add', () => {
  it('should add value of B to A', () => {
    const actual = add({ A: 3, B: 2 }, { LN: 10, opcode: 'ADD', operands: ['A', 'B'] });
    const expected = { A: 5, B: 2 };
    assert.deepStrictEqual(actual, expected);
  });

  it('should add value to A', () => {
    const actual = add({ A: 3 }, { LN: 10, opcode: 'ADD', operands: ['A', 2] });
    const expected = { A: 5 };
    assert.deepStrictEqual(actual, expected);
  });
});
