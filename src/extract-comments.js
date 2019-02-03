const { lexer } = require('./lexer');
const { parser, Tokens } = require('./parser');
const { reader } = require('./reader');

const extractComments = (filePath, options) => {
  let items = parser(lexer(reader(filePath, options)));

  items = items.filter(({ token }) => token === Tokens.COMMENT);

  for (const item of items) {
    delete item.token;
  }

  return items;
};

module.exports = { extractComments };
