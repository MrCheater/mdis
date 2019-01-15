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
  { string: "'", lexeme: Lexemes.SINGLE_QUOTE },
  { string: '"', lexeme: Lexemes.DOUBLE_QUOTE },
  { string: '`', lexeme: Lexemes.BACK_TICK },
  { string: '//', lexeme: Lexemes.START_SINGLE_LINE_COMMENT },
  { string: '/*', lexeme: Lexemes.START_MULTI_LINE_COMMENT },
  { string: '*/', lexeme: Lexemes.END_MULTI_LINE_COMMENT }
];

module.exports = {
  Lexemes,
  LexerRules
};
