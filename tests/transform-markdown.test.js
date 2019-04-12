const path = require('path');

const { transformMarkdown } = require('../src/transform-markdown');

describe('transformMarkdown', () => {
  test('"named-blocks.js"', () => {
    const markdown = transformMarkdown(
      path.join(__dirname, 'files', 'markdown.md')
    );
    expect(markdown).toMatchSnapshot();
  });
});
