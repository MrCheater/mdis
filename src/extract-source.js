const { lexer } = require('./lexer');
const { parser, Tokens } = require('./parser');
const { reader } = require('./reader');

const regExpEndSpaces = /^((?:.|\n)*?)([ \t]+)$/;
const regExpStartEOL = /^(\n)((?:.|\n)*?)$/;

const extractSource = (filePath, options) => {
  const source = reader(filePath, options);

  const items = parser(lexer(source));

  let extract = false;
  let extractOnce = false;

  let extractedItems = [];

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
      const mdisStart = item.string.match(
        /^mdis-start(\040([A-Za-z0-9_\-.]+))?/
      );
      if (mdisStart != null) {
        item.mdis = true;
        const itemName = mdisStart[2];
        item.mdisName = itemName;

        if (itemName === options.fragment) {
          if (extractOnce) {
            item.token = Tokens.DOTS;
            item.leftPad = leftPad;
          }
          extract = true;
          extractOnce = true;
        }
      }
      const mdisStop = item.string.match(/^mdis-stop(\040([A-Za-z0-9_\-.]+))?/);
      if (mdisStop != null) {
        item.mdis = true;
        const itemName = mdisStop[2];
        item.mdisName = itemName;
        if (itemName === options.fragment) {
          extract = false;
        }
      }
    }

    if (extract) {
      extractedItems.push(item);
      prevExtractedItem = item;
    }
  }

  for (let itemIndex = items.length - 1; itemIndex >= 0; itemIndex--) {
    const item = items[itemIndex];
    const prevItem = items[itemIndex - 1];
    const nextItem = items[itemIndex + 1];

    if (item != null && item.mdis) {
      if (prevItem != undefined) {
        const match = prevItem.source.match(regExpEndSpaces);
        if (match != null) {
          prevItem.source = match[1];
          item.source = match[2] + item.source;
        }
      }
      if (nextItem != undefined) {
        const match = nextItem.source.match(regExpStartEOL);
        if (match != null) {
          nextItem.source = match[2];
          item.source = item.source + match[1];
        }
      }
    }
  }

  for (let itemIndex = items.length - 1; itemIndex >= 0; itemIndex--) {
    const item = items[itemIndex];
    if (item == null) {
      continue;
    }
    if (item.mdis && item.token === Tokens.COMMENT) {
      item.source = item.string = '';
    } else if (
      item.mdis &&
      item.token === Tokens.DOTS &&
      item.mdisName === options.fragment
    ) {
      item.source = item.string = '';
      const prevItem = items[itemIndex - 1];
      if (prevItem != null) {
        const leftPad = item.leftPad;
        item.source = item.string = ''.padStart(leftPad) + '...\n';
      }
    }
  }

  extractedItems = extractedItems.filter(({ source }) => source !== '');

  const lastExtractedItem = extractedItems[extractedItems.length - 1];
  if (lastExtractedItem != null && lastExtractedItem.token === Tokens.DOTS) {
    extractedItems.pop();
  }

  const firstExtractedItem = extractedItems[0];
  if (firstExtractedItem != null && firstExtractedItem.token === Tokens.DOTS) {
    extractedItems.shift();
  }

  const lines = extractedItems
    .map(({ source }) => source)
    .join('')
    .trimRight()
    .replace(/^[\n]+/, '')
    .split('\n');

  leftPad = Number.MAX_VALUE;
  for (const line of lines) {
    leftPad = Math.min(leftPad, line.length - line.trimLeft().length);
  }
  for (let index = 0; index < lines.length; index++) {
    lines[index] = lines[index].substr(leftPad);
  }

  const result = lines.join('\n');

  const isEmptyResult = result.trim() === '';

  if (isEmptyResult && options.fragment != null) {
    throw new Error(`Unknown fragment ${options.fragment}`);
  }

  return result;
};

module.exports = { extractSource };
