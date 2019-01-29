const fs = require('fs');

const { lexer } = require('./lexer');
const { parser } = require('./parser');

function parse(filePath, encoding = 'utf8') {
  const source = fs.readFileSync(filePath, { encoding });

  return parser(lexer(source));
}

module.exports = {
  parse
};
