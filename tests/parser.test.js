const { parser } = require('../src/parser');

test('parser should return syntax tree', async () => {
  parser([
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str1 = '
    },
    {
      lexeme: 'singleQuote',
      string: "'"
    },
    {
      lexeme: 'singleQuote',
      string: "'"
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str2 = '
    },
    {
      lexeme: 'singleQuote',
      string: "'"
    },
    {
      lexeme: 'unknown',
      string: 'dsada'
    },
    {
      lexeme: 'singleQuote',
      string: "'"
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str3 = '
    },
    {
      lexeme: 'doubleQuote',
      string: '"'
    },
    {
      lexeme: 'doubleQuote',
      string: '"'
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str4 = '
    },
    {
      lexeme: 'doubleQuote',
      string: '"'
    },
    {
      lexeme: 'unknown',
      string: 'dsada'
    },
    {
      lexeme: 'doubleQuote',
      string: '"'
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str5 = '
    },
    {
      lexeme: 'backTick',
      string: '`'
    },
    {
      lexeme: 'backTick',
      string: '`'
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str6 = '
    },
    {
      lexeme: 'backTick',
      string: '`'
    },
    {
      lexeme: 'unknown',
      string: 'dsada'
    },
    {
      lexeme: 'backTick',
      string: '`'
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar str7 = '
    },
    {
      lexeme: 'singleQuote',
      string: "'"
    },
    {
      lexeme: 'unknown',
      string: ' \t 1\t 2\t 3'
    },
    {
      lexeme: 'singleQuote',
      string: "'"
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\t '
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tvar num = 23'
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\t'
    },
    {
      lexeme: 'eol',
      string: '\n'
    },
    {
      lexeme: 'unknown',
      string: '\tconsole.log(42)'
    },
    {
      lexeme: 'eol',
      string: '\n'
    }
  ]);
});
