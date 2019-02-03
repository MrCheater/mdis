const { lexer } = require('./lexer');
const { parser, Tokens } = require('./parser');
const { reader } = require('./reader');

const extractSource = (filePath, options = {}) => {
  let items = parser(lexer(reader(filePath, options)));

  let extract = false;

  const extractedItems = [];

  for (const item of items) {
    let isMdisComment = false;
    if (item.token === Tokens.COMMENT) {
      {
        const matchResult = item.string.match(
          /^mdis-start(\040([A-Za-z0-9_\-.]+))?/
        );
        if (matchResult !== null) {
          isMdisComment = true;
          const itemName = matchResult[2];
          if (itemName === options.name) {
            extract = true;
          }
        }
      }
      {
        const matchResult = item.string.match(
          /^mdis-stop(\040([A-Za-z0-9_\-.]+))?/
        );
        if (matchResult !== null) {
          isMdisComment = true;
          const itemName = matchResult[2];
          if (itemName === options.name) {
            extract = false;
          }
        }
      }
      if (extract && !isMdisComment && options.comments) {
        extractedItems.push(item);
      }
    } else if (extract) {
      extractedItems.push(item);
    }
  }

  return extractedItems.map(({ source }) => source).join('');
};

module.exports = { extractSource };
