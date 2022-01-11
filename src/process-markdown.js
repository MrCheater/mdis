const fs = require('fs');

const { transformMarkdown } = require('./transform-markdown');

const processMarkdown = (filePath, options) => {
  const startTime = Date.now();

  options.logs = [];
  const result = transformMarkdown(filePath, options);

  if (result.transformed) {
    fs.writeFileSync(filePath, Buffer.from(result));
  }

  const endTime = Date.now();

  if (options.verbose) {
    options.logs.unshift([
      `Processed ${JSON.stringify(filePath)} ${endTime - startTime}ms`,
    ]);
    // eslint-disable-next-line no-console
    options.logs.forEach((logs) => console.log(...logs));
    options.logs = [];
  }
};

module.exports = {
  processMarkdown,
};
