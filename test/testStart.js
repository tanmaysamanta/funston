const assert = require('assert');
const start = require('../src/opcodes/start.js').start;

describe('start', () => {
  it('Should reset flags and registers', () => {
    const actual = start({ A: 0, B: 0, C: 0, D: 0, EQ: true, NE: true, GT: false, LT: true });
    const expected = { A: 0, B: 0, C: 0, D: 0, EQ: false, NE: false, GT: false, LT: false };
    assert.deepStrictEqual(actual, expected);
  });
});