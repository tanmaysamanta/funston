const stop = require('../src/opcodes/stop.js').stop;
const assert = require('assert');

describe('stop', () => {
  it('Should set Next Line to null', () => {
    const actual = stop({ CL: 10, NL: 20 });
    const expected = { CL: 10, NL: null };
    assert.deepStrictEqual(actual, expected);
  });
});
