const Lexemes = {
  UNKNOWN: 'UNKNOWN',
  EOL: 'EOL', // \n \r \r\n
  SINGLE_QUOTE: 'SINGLE_QUOTE', // '
  DOUBLE_QUOTE: 'DOUBLE_QUOTE', // "
  BACK_TICK: 'BACK_TICK', // `
  BACK_SLASH: 'BACK_SLASH', // \
  START_SINGLE_LINE_COMMENT: 'START_SINGLE_LINE_COMMENT', // //
  START_MULTI_LINE_COMMENT: 'START_MULTI_LINE_COMMENT', // /*
  END_MULTI_LINE_COMMENT: 'END_MULTI_LINE_COMMENT' // */
};

const LexerRules = [
  { string: '\r\n', lexeme: Lexemes.EOL },
  { string: '\n', lexeme: Lexemes.EOL },
  { string: '\\', lexeme: Lexemes.BACK_SLASH },
  { string: '\'', lexeme: Lexemes.SINGLE_QUOTE },
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
      source,
      start: { column: 1 },
      end: { column: source.length }
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
        position = item.source.indexOf(rule.string, fromIndex);
        if (position === -1) {
          break;
        }

        const source = item.source.substring(fromIndex, position);
        if (source !== '') {
          nextItems.push({
            lexeme: Lexemes.UNKNOWN,
            source,
            start: { column: item.start.column + fromIndex },
            end: { column: item.start.column + position }
          });
        }

        nextItems.push({
          lexeme: rule.lexeme,
          source: rule.string,
          start: { column: item.start.column + position },
          end: { column: item.start.column + position + rule.string.length }
        });

        fromIndex = position + rule.string.length;
      }

      const source = item.source.substring(fromIndex, item.source.length);
      if (source !== '') {
        nextItems.push({
          lexeme: Lexemes.UNKNOWN,
          source,
          start: { column: item.start.column + fromIndex },
          end: { column: item.start.column + item.source.length }
        });
      }
    }

    items = nextItems;
    nextItems = [];
  }

  let line = 1;
  let eolEnd = 0;
  for (const item of items) {
    item.start.line = line;
    item.end.line = line;
    if (item.lexeme === Lexemes.EOL) {
      line++;
      let prevEolEnd = eolEnd;
      eolEnd = item.end.column - 1;

      item.start.column -= prevEolEnd;
      item.end.column -= prevEolEnd;
      continue;
    }
    item.start.column -= eolEnd;
    item.end.column -= eolEnd;
  }

  return items;
}

module.exports = {
  lexer,
  Lexemes,
  LexerRules
};
