const path = require('path');

const { extractStrings } = require('../src/extract-strings');

describe('extractStrings', () => {
  test('"named-blocks.js"', () => {
    expect(
      extractStrings(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });

  test('"simple.js"', () => {
    expect(
      extractStrings(path.join(__dirname, 'files', 'simple.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });

  test('"strings-and-comments.js"', () => {
    expect(
      extractStrings(path.join(__dirname, 'files', 'strings-and-comments.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });
});
