const toArray = (string, delimiter) => string.split(delimiter);
const convertIfNumber = (string) => +string || string;

const toObject = function (instruction) {
  const [LN, opcode, operands] = toArray(instruction, " ");

  return { LN, opcode, operands };
};

const parseOperands = function (operands) {
  if (!operands) {
    return [];
  }

  return toArray(operands, ',').map(convertIfNumber);
};

const parseObject = function (instruction) {
  const LN = convertIfNumber(instruction.LN);
  const operands = parseOperands(instruction.operands);

  return { LN, opcode: instruction.opcode, operands };
};

const stringToObject = (instructionsAsString) => {
  return toArray(instructionsAsString, "\n").map((instruction) => {
    return parseObject(toObject(instruction));
  });
};

exports.stringToObject = stringToObject;
