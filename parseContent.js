const convertIfNumber = (string) => !isNaN(string) ? +string : string;

const parseOperands = function (operands) {
  if (!operands) {
    return [];
  }

  return operands.split(',').map(convertIfNumber);
};

const parseLine = (line) => {
  const [LN, opcode, operands] = line.split(/\s+/);
  return { LN: +LN, opcode, operands: parseOperands(operands) };
}

const parse = (content) => {
  return content.split('\n').map(parseLine);
};

exports.parse = parse;
