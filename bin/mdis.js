#!/usr/bin/env node

const find = require('glob').sync;
const minimist = require('minimist');

const { processMarkdown } = require('../src/process-markdown');

const options = {
  encoding: 'utf8',
  verbose: true,
  ...minimist(process.argv.slice(2))
};

for (const filePath of find('./**/*.md', {
  cwd: process.cwd(),
  absolute: true
})) {
  if (filePath.includes('node_modules')) {
    continue;
  }

  processMarkdown(filePath, options);
}
