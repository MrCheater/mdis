const fs = require('fs');

const { transformMarkdown } = require('./transform-markdown');

const processMarkdown = (filePath, options) => {
  options = options != null ? options : {};
  options.encoding = options.encoding != null ? options.encoding : 'utf8';
  const result = transformMarkdown(filePath, options);

  fs.writeFileSync(filePath, result);
};

module.exports = {
  processMarkdown
};
