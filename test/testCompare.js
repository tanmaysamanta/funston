const assert = require('assert');
const compare = require('../src/opcodes/compare.js').compare;

describe('compare', () => {
  it('should set EQ if equal', () => {
    const actual = compare({ A: 2, B: 2, EQ: false, NE: false, GT: false, LT: false }, { LN: 20, opcode: 'CMP', operands: ['A', 'B'] });
    const expected = { A: 2, B: 2, EQ: true, NE: false, GT: false, LT: false };
    assert.deepStrictEqual(actual, expected);
  });

  it('should set NE and LT if less than', () => {
    const actual = compare({ A: 1, B: 2, EQ: false, NE: false, GT: false, LT: false }, { LN: 20, opcode: 'CMP', operands: ['A', 'B'] });
    const expected = { A: 1, B: 2, EQ: false, NE: true, GT: false, LT: true };
    assert.deepStrictEqual(actual, expected);
  });

  it('should set NE and GT if greater than', () => {
    const actual = compare({ A: 5, EQ: false, NE: false, GT: false, LT: false }, { LN: 20, opcode: 'CMP', operands: ['A', 3] });
    const expected = { A: 5, EQ: false, NE: true, GT: true, LT: false };
    assert.deepStrictEqual(actual, expected);
  });
});
