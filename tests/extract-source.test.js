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

  test('"named-blocks.js - options = { name: "for-i-j" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'for-i-j'
      })
    ).toMatchSnapshot();
  });

  ///////////////////////

  test('"named-blocks-chaos.js - options = { name: undefined }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'))
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { name: "imports" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        name: 'imports'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { name: "Sample" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        name: 'Sample'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { name: "render" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        name: 'render'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks-chaos.js - options = { name: "for-i-j" }"', () => {
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks-chaos.js'), {
        name: 'for-i-j'
      })
    ).toMatchSnapshot();
  });

  ////////////////////

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
