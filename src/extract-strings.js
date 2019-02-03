const { lexer } = require('./lexer');
const { parser, Tokens } = require('./parser');
const { reader } = require('./reader');

const extractStrings = (filePath, options) => {
  let items = parser(lexer(reader(filePath, options)));

  items = items.filter(({ token }) => token === Tokens.STRING);

  for (const item of items) {
    delete item.token;
  }

  return items;
};

module.exports = { extractStrings };
