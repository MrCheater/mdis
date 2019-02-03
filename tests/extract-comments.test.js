const path = require('path');

const { extractComments } = require('../src/extract-comments');

describe('extractComments', () => {
  test('"named-blocks.js"', () => {
    expect(
      extractComments(path.join(__dirname, 'files', 'named-blocks.js'))
    ).toMatchSnapshot();
  });

  test('"simple.js"', () => {
    expect(
      extractComments(path.join(__dirname, 'files', 'simple.js'))
    ).toMatchSnapshot();
  });

  test('"strings-and-comments.js"', () => {
    expect(
      extractComments(path.join(__dirname, 'files', 'strings-and-comments.js'))
    ).toMatchSnapshot();
  });
});
