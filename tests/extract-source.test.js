const path = require('path');

const { extractSource } = require('../src/extract-source');

// const trueConsoleLog = console.log.bind(console)
// console.log = (...args) => {
//   trueConsoleLog('!',...args, '!')
// }

describe('extractSource', () => {
  test('"named-blocks.js - options = { name: undefined }"', () => {
    console.log(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'))
    );
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'))
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "imports" }"', () => {
    console.log(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'imports'
      })
    );
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'imports'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "Sample" }"', () => {
    console.log(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'Sample'
      })
    );
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'Sample'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "render" }"', () => {
    console.log(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'render'
      })
    );
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'render'
      })
    ).toMatchSnapshot();
  });

  test('"named-blocks.js - options = { name: "for-i-j" }"', () => {
    console.log(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'for-i-j'
      })
    );
    expect(
      extractSource(path.join(__dirname, 'files', 'named-blocks.js'), {
        name: 'for-i-j'
      })
    ).toMatchSnapshot();
  });

  test('"simple.js"', () => {
    console.log(extractSource(path.join(__dirname, 'files', 'simple.js')));
    expect(
      extractSource(path.join(__dirname, 'files', 'simple.js'))
    ).toMatchSnapshot();
  });

  test('"strings-and-comments.js"', () => {
    console.log(
      extractSource(path.join(__dirname, 'files', 'strings-and-comments.js'))
    );
    expect(
      extractSource(path.join(__dirname, 'files', 'strings-and-comments.js'))
    ).toMatchSnapshot();
  });
});
