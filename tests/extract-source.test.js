const path = require('path');

const { extractSource } = require('../src/extract-source');

describe('extractSource', () => {
  test('"named-blocks.js - options = { fragment: undefined }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { fragment: "imports" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8',
        fragment: 'imports',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { fragment: "Sample" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8',
        fragment: 'Sample',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { fragment: "render" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8',
        fragment: 'render',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { fragment: "for-i-j" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        encoding: 'utf8',
        fragment: 'for-i-j',
      })
    ).toMatchSnapshot();
  });

  ///////////////////////

  test('"named-blocks-chaos.js - options = { fragment: undefined }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { fragment: "imports" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        encoding: 'utf8',
        fragment: 'imports',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { fragment: "Sample" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        encoding: 'utf8',
        fragment: 'Sample',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { fragment: "render" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        encoding: 'utf8',
        fragment: 'render',
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { fragment: "for-i-j" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        encoding: 'utf8',
        fragment: 'for-i-j',
      })
    ).toMatchSnapshot();
  });

  ////////////////////

  test('"simple.js"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'simple.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });

  test('"strings-and-comments.js"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'strings-and-comments.js'), {
        encoding: 'utf8',
      })
    ).toMatchSnapshot();
  });
});
