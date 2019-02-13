const { lexer } = require('./lexer');
const { parser, Tokens } = require('./parser');
const { reader } = require('./reader');

const extractSource = (filePath, options = {}) => {
  let items = parser(lexer(reader(filePath, options)));

  let extract = false;
  let extractOnce = false;

  const extractedItems = [];

  let prevItem;
  for (const item of items) {
    if (item.token === Tokens.COMMENT) {
      switch (item.token) {
        case Tokens.COMMENT: {
          {
            const matchResult = item.string.match(
              /^mdis-start(\040([A-Za-z0-9_\-.]+))?/
            );
            if (matchResult !== null) {
              if (extractOnce) {
                item.source = item.string = ''; //`\n...\n`
                item.token = Tokens.DOTS;
              } else {
                item.source = item.string = '';
              }
              const itemName = matchResult[2];
              if (itemName === options.name) {
                extract = true;
                extractOnce = true;
                break;
              }
            }
          }
          {
            const matchResult = item.string.match(
              /^mdis-stop(\040([A-Za-z0-9_\-.]+))?/
            );
            if (matchResult !== null) {
              item.source = item.string = '';
              const itemName = matchResult[2];
              if (itemName === options.name) {
                extract = false;
                break;
              }
            }
          }
        }
      }
    }
    if (extract) {
      extractedItems.push(item);
    }
    prevItem = item;
  }

  const lines = [];

  for (const item of extractedItems) {
  }

  return extractedItems.map(({ source }) => source).join('');
};

module.exports = { extractSource };
