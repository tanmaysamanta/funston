const splitBy = (string, delimiter) => string.split(delimiter);
const convertIfNumber = (string) => +string || string;

const toObject = function (string, ...keys) {
  const object = {};
  const values = splitBy(string, /\s+/);
  keys.forEach((key, index) => {
    object[key] = values[index];
  });

  return object;
};

const parseOperands = function (operands) {
  if (!operands) {
    return [];
  }

  return splitBy(operands, ',').map(convertIfNumber);
};

const normalize = function (object) {
  const LN = convertIfNumber(object.LN);
  const operands = parseOperands(object.operands);

  return { LN, opcode: object.opcode, operands };
};

const stringToObject = (text) => {
  return splitBy(text, '\n').map((line) => {
    return normalize(toObject(line, 'LN', 'opcode', 'operands'));
  });
};

exports.stringToObject = stringToObject;
