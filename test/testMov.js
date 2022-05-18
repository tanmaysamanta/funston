const assert = require('assert');
const mov = require('../src/opcodes/mov.js').mov;

describe('mov', () => {
  it('Should move value from register to register', () => {
    const actual = mov({ A: 10, B: 5 }, { LN: 10, opcode: 'MOV', operands: ['A', 'B'] });
    const expected = { A: 5, B: 5 };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should move value to register', () => {
    const actual = mov({ A: 0 },
      { LN: 10, opcode: 'MOV', operands: ['A', 10] });
    const expected = { A: 10 };
    assert.deepStrictEqual(actual, expected);
  });
});