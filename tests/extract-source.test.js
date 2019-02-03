const path = require('path');

const { extractSource } = require('../src/extract-source');

describe('extractSource', () => {
  test('"named-blocks.js - options = { name: undefined }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'))
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "imports" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'imports'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "Sample" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'Sample'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "render" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'render'
      })
    ).toMatchSnapshot();
  });

  test('"simple.js"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'simple.js'))
    ).toMatchSnapshot();
  });

  test('"strings-and-comments.js"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'strings-and-comments.js'))
    ).toMatchSnapshot();
  });
});
