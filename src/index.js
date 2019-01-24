const fs = require('fs');

const { lexer } = require('./lexer');

function parse(filePath, encoding = 'utf8') {
  const source = fs.readFileSync(filePath, { encoding });

  return lexer(source);
}

module.exports = {
  parse
};
