const path = require('path');

const { transformMarkdown } = require('../src/transform-markdown');

test('"transformMarkdown"', () => {
  const markdown = transformMarkdown(
    path.join(__dirname, 'files', 'markdown.md'),
    { encoding: 'utf8' }
  );

  expect(`${markdown}`).toMatchSnapshot();
});
