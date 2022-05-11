const fs = require('fs');

const row = (fields) => '|' + fields.join('|') + '|\n';
const divider = (fieldsCount) =>
  '|' + Array(fieldsCount).fill('---').join('|') + '|\n';

const generateTable = function (records) {
  let table = '';
  const headers = Object.keys(records[0]);
  table += row(headers);
  table += divider(headers.length);

  records.forEach(record => {
    table += row(Object.values(record));
  });

  fs.writeFileSync('./table.md', table, 'utf8');
  return table;
};

exports.generateTable = generateTable;
