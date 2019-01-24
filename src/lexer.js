const Lexemes = {
  UNKNOWN: 'unknown',
  EOL: 'eol', // \n \r \r\n
  SINGLE_QUOTE: 'singleQuote', // '
  DOUBLE_QUOTE: 'doubleQuote', // "
  BACK_TICK: 'backTick', // `
  BACK_SLASH: 'backSlash', // \
  START_SINGLE_LINE_COMMENT: 'startSingleLineComment', // //
  START_MULTI_LINE_COMMENT: 'startMultiLineComment', // /*
  END_MULTI_LINE_COMMENT: 'endMultiLineComment' // */
};

const LexerRules = [
  { string: '\r\n', lexeme: Lexemes.EOL },
  { string: '\n', lexeme: Lexemes.EOL },
  { string: '\\', lexeme: Lexemes.BACK_SLASH },
  { string: "'", lexeme: Lexemes.SINGLE_QUOTE },
  { string: '"', lexeme: Lexemes.DOUBLE_QUOTE },
  { string: '`', lexeme: Lexemes.BACK_TICK },
  { string: '//', lexeme: Lexemes.START_SINGLE_LINE_COMMENT },
  { string: '/*', lexeme: Lexemes.START_MULTI_LINE_COMMENT },
  { string: '*/', lexeme: Lexemes.END_MULTI_LINE_COMMENT }
];

function lexer(source) {
  let items = [
    {
      lexeme: Lexemes.UNKNOWN,
      string: source
    }
  ];
  let nextItems = [];

  for (const rule of LexerRules) {
    let item;
    while (true) {
      item = items.shift();
      if (item === undefined) {
        break;
      }

      if (item.lexeme !== Lexemes.UNKNOWN) {
        nextItems.push(item);
        continue;
      }

      let fromIndex = 0;
      let prevPosition,
        position = 0;
      while (true) {
        prevPosition = position;
        position = item.string.indexOf(rule.string, fromIndex);
        if (position === -1) {
          break;
        }

        const string = item.string.substring(fromIndex, position);
        if (string !== '') {
          nextItems.push({
            lexeme: Lexemes.UNKNOWN,
            string
          });
        }

        nextItems.push({
          lexeme: rule.lexeme,
          string: rule.string
        });

        fromIndex = position + rule.string.length;
      }

      const string = item.string.substring(fromIndex, item.string.length);
      if (string !== '') {
        nextItems.push({
          lexeme: Lexemes.UNKNOWN,
          string
        });
      }
    }

    items = nextItems;
    nextItems = [];
  }

  return items;
}

module.exports = {
  lexer,
  Lexemes,
  LexerRules
};
