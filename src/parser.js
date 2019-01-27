const { Lexemes } = require('./lexer');

const States = {
  S0: 'S0',
  S1: 'S1',
  S2: 'S2',
  S3: 'S3',
  S4: 'S4',
  S5: 'S5',
  S6: 'S6',
  S7: 'S7',
  S8: 'S8',
  S9: 'S9'
};

const ParserRules = [
  { lexeme: Lexemes.UNKNOWN, from: States.S0, to: States.S0 },
  { lexeme: Lexemes.EOL, from: States.S0, to: States.S0 },
  // Single quote string
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S0, to: States.S1 },
  { lexeme: Lexemes.UNKNOWN, from: States.S1, to: States.S1 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S1, to: States.S1 },
  { lexeme: Lexemes.BACK_TICK, from: States.S1, to: States.S1 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S1, to: States.S1 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S1, to: States.S1 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S1, to: States.S1 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S1, to: States.S2 },
  { lexeme: Lexemes.UNKNOWN, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.EOL, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.BACK_TICK, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S2, to: States.S1 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S1, to: States.S0 },
  // Double quote string
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S0, to: States.S3 },
  { lexeme: Lexemes.UNKNOWN, from: States.S3, to: States.S3 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S3, to: States.S3 },
  { lexeme: Lexemes.BACK_TICK, from: States.S3, to: States.S3 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S3, to: States.S3 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S3, to: States.S3 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S3, to: States.S3 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S3, to: States.S4 },
  { lexeme: Lexemes.UNKNOWN, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.EOL, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.BACK_TICK, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S4, to: States.S3 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S3, to: States.S0 },
  // Back tick string
  { lexeme: Lexemes.BACK_TICK, from: States.S0, to: States.S5 },
  { lexeme: Lexemes.UNKNOWN, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.EOL, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S5, to: States.S5 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S5, to: States.S6 },
  { lexeme: Lexemes.BACK_TICK, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.UNKNOWN, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.EOL, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S6, to: States.S5 },
  { lexeme: Lexemes.BACK_TICK, from: States.S5, to: States.S0 },
  // Single line comment
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S0, to: States.S7 },
  { lexeme: Lexemes.UNKNOWN, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.BACK_TICK, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S7, to: States.S7 },
  { lexeme: Lexemes.EOL, from: States.S7, to: States.S0 },
  // Multi line comment
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S0, to: States.S8 },
  { lexeme: Lexemes.UNKNOWN, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.EOL, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.BACK_TICK, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S8, to: States.S8 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S8, to: States.S8 },
  /// Back slash
  { lexeme: Lexemes.BACK_SLASH, from: States.S0, to: States.S9 },
  { lexeme: Lexemes.UNKNOWN, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.EOL, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.SINGLE_QUOTE, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.DOUBLE_QUOTE, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.BACK_TICK, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.BACK_SLASH, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.START_MULTI_LINE_COMMENT, from: States.S9, to: States.S0 },
  { lexeme: Lexemes.END_MULTI_LINE_COMMENT, from: States.S9, to: States.S0 }
];

const transitions = {};
for (const { lexeme, from, to } of ParserRules) {
  if (!transitions[from]) {
    transitions[from] = {};
  }
  transitions[from][lexeme] = to;
}

const parser = items => {
  let prevState;
  let state = States.S0;

  for (const { lexeme } of items) {
    prevState = state;
    state = transitions[state][lexeme];
    console.log(prevState, '->', state);
  }
};

module.exports = {
  parser,
  States
};
