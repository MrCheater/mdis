const fs = require('fs');
const path = require('path');

const { extractSource } = require('./extract-source');

const regExpGlobal =
  /(?:^|\n|\*)\s{0,4}?\[[^\]]+?\]\:\#\s\([^)]+?\)\s*?\n\s*?\`\`\`(?:[^\n]+)?\n(?:.|\n)*?\`\`\`/gis;

const regExpLocal =
  /((?:^|\n|\*)\s{0,4}?)\[([^\]]+?)\]\:\#\s\(([^)]+?)\)\s*?\n\s*?\`\`\`((?:[^\n]+)?)\n(?:.|\n)*?\`\`\`/is;

const parseChunk = (chunk, filePath, options) => {
  const [, whitespaces, preambule, relativePathAndFragment, language] =
    chunk.match(regExpLocal);
  if (preambule !== 'mdis') {
    return chunk;
  }

  const [relativePath, fragment] = relativePathAndFragment.split('#');
  const absolutePath = path.join(path.dirname(filePath), relativePath);
  const content = extractSource(absolutePath, { ...options, fragment });

  if (options.verbose) {
    options.logs.push([`${relativePath}#${fragment}`]);
  }

  return [
    `${whitespaces}[mdis]:# (${relativePathAndFragment})`,
    `\`\`\`${language}\n${content}`,
    '```',
  ].join('\n');
};

const transformMarkdown = (filePath, options) => {
  const source = fs.readFileSync(filePath, { encoding: options.encoding });
  let result = new String(source);

  const matches = source.match(regExpGlobal);
  if (matches == null) {
    result.transformed = false;
    return result;
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

  result = new String(chunks.join(''));
  result.transformed = result != source;

  return result;
};

module.exports = {
  transformMarkdown,
};
