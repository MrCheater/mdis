const fs = require('fs');

const { transformMarkdown } = require('./transform-markdown');

const processMarkdown = (filePath, options) => {
  const result = transformMarkdown(filePath, options);

  if (result.transformed) {
    fs.writeFileSync(filePath, result);
  }
};

module.exports = {
  processMarkdown
};
