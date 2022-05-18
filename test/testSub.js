const assert = require('assert');
const sub = require('../src/opcodes/sub.js').sub;

describe('sub', () => {
  it('should subtract B from A ', () => {
    const actual = sub({ A: 10, B: 3 },
      { LN: 20, opcode: 'SUB', operands: ['A', 'B'] });
    const expected = { A: 7, B: 3 };

    assert.deepStrictEqual(actual, expected);
  });

  it('should subtract value from A ', () => {
    const actual = sub({ A: 10 },
      { LN: 20, opcode: 'SUB', operands: ['A', 3] });
    const expected = { A: 7 };

    assert.deepStrictEqual(actual, expected);
  });
});
