const fs = require('fs');

const { transformMarkdown } = require('./transform-markdown');

const processMarkdown = (filePath, options) => {
  const startTime = Date.now();

  options.logs = [];
  const result = transformMarkdown(filePath, options);

  if (result.transformed) {
    fs.writeFileSync(filePath, result);
  }

  const endTime = Date.now();

  if (options.verbose) {
    options.logs.unshift([
      `Processed ${JSON.stringify(filePath)} ${endTime - startTime}ms`
    ]);
    options.logs.forEach(logs => console.log(...logs));
    options.logs = [];
  }
};

module.exports = {
  processMarkdown
};
