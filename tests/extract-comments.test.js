const path = require('path');

const { extractComments } = require('../src/extract-comments');

describe('extractComments', () => {
  test('"named-blocks.js"', () => {
    expect(
      extractComments(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8'
      })
    ).toMatchSnapshot();
  });

  test('"simple.js"', () => {
    expect(
      extractComments(path.join(__dirname, 'files', 'simple.js'), {
        encoding: 'utf8'
      })
    ).toMatchSnapshot();
  });

  test('"strings-and-comments.js"', () => {
    expect(
      extractComments(
        path.join(__dirname, 'files', 'strings-and-comments.js'),
        { encoding: 'utf8' }
      )
    ).toMatchSnapshot();
  });
});
