const fs = require('fs');

function reader(filePath, { encoding = 'utf8' } = {}) {
  const source = fs.readFileSync(filePath, { encoding });

  return source;
}

module.exports = {
  reader,
};
