const fs = require('fs');
const path = require('path');
const { extractSource } = require('./extract-source');

const regExpGlobal = /(?:^|\n|\*)\s{0,4}?\[[^\]]+?\]\:\#\s\([^)]+?\)\s*?\n\s*?\`\`\`(?:\w+)?\n(?:.|\n)*?\`\`\`/gis;

const regExpLocal = /((?:^|\n|\*)\s{0,4}?)\[([^\]]+?)\]\:\#\s\(([^)]+?)\)\s*?\n\s*?\`\`\`((?:\w+)?)\n(?:.|\n)*?\`\`\`/is;

const parseChunk = (chunk, filePath, options) => {
  const [
    ,
    whitespaces,
    preambule,
    relativePathAndFragment,
    language
  ] = chunk.match(regExpLocal);
  if (preambule !== 'mdis') {
    return chunk;
  }

  const [relativePath, fragment] = relativePathAndFragment.split('#');
  const absolutePath = path.join(path.dirname(filePath), relativePath);
  const content = extractSource(absolutePath, { ...options, name: fragment });

  return [
    `${whitespaces}[mdis]:# (${relativePathAndFragment})`,
    `\`\`\`${language}\n${content}`,
    '```'
  ].join('\n');
};

const transformMarkdown = (filePath, options) => {
  options = options != null ? options : {};
  options.encoding = options.encoding != null ? options.encoding : 'utf8';
  const source = fs.readFileSync(filePath, { encoding: options.encoding });

  const matches = source.match(regExpGlobal);
  if (matches == null) {
    return source;
  }

  const chunks = [];
  let lastIndex = 0;
  for (const match of matches) {
    const nextIndex = source.indexOf(match, lastIndex);
    chunks.push(source.substring(lastIndex, nextIndex));

    chunks.push(parseChunk(match, filePath, options));

    lastIndex = nextIndex + match.length;
  }

  chunks.push(source.substring(lastIndex));

  return chunks.join('');
};

module.exports = {
  transformMarkdown
};
