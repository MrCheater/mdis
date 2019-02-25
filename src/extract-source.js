const { lexer } = require('./lexer');
const { parser, Tokens } = require('./parser');
const { reader } = require('./reader');

const extractSource = (filePath, options = {}) => {
  let items = parser(lexer(reader(filePath, options)));

  let extract = false;
  let extractOnce = false;

  const extractedItems = [];

  let leftPad = 0;
  let lastLine;
  let prevExtractedItem = null;
  for (const item of items) {
    if (item.token !== Tokens.COMMENT) {
      const lines = item.source.match(/[^\r\n]+/g) || [''];
      for (const line of lines) {
        if (line.trim().length !== 0) {
          lastLine = line;
          leftPad = line.length - line.trimLeft().length;
        }
      }
    } else {
      switch (item.token) {
        case Tokens.COMMENT: {
          {
            const matchResult = item.string.match(
              /^mdis-start(\040([A-Za-z0-9_\-.]+))?/
            );
            if (matchResult !== null) {
              if (extractOnce) {
                let dots = '...';
                dots = dots.padStart(dots.length + leftPad);
                item.source = item.string = `\n${dots}\n`;
                item.token = Tokens.DOTS;
                prevExtractedItem.source = prevExtractedItem.source
                  .trimRight()
                  .replace(/[\r\n]$/, '');
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
      prevExtractedItem = item;
    }
  }

  const lines = extractedItems
    .map(({ source }) => source)
    .join('')
    .trimRight()
    .match(/[^\r\n]+/g) || [''];
  leftPad = Number.MAX_VALUE;
  for (const line of lines) {
    leftPad = Math.min(leftPad, line.length - line.trimLeft().length);
  }
  for (let index = 0; index < lines.length; index++) {
    lines[index] = lines[index].substr(leftPad);
  }

  return lines.join('\n');
};

module.exports = { extractSource };
