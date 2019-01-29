const { Lexemes } = require('./lexer');

const Tokens = {
  COMMENT: 'COMMENT',
  SINGLE_LINE_COMMENT: 'SINGLE_LINE_COMMENT',
  MULTI_LINE_COMMENT: 'MULTI_LINE_COMMENT',
  STRING: 'STRING',
  SINGLE_QUOTE_STRING: 'SINGLE_QUOTE_STRING',
  DOUBLE_QUOTE_STRING: 'DOUBLE_QUOTE_STRING',
  BACK_TICK_STRING: 'BACK_TICK_STRING',
  UNKNOWN: 'UNKNOWN'
};

const normalize = ({ string, token, ...item }) => {
  switch (token) {
    case Tokens.SINGLE_LINE_COMMENT: {
      string = string
        .replace(/\n$/, '')
        .replace(/\r\n$/, '')
        .replace(/^\/\//, '')
        .trim();

      return {
        ...item,
        token: Tokens.COMMENT,
        string
      };
      break;
    }
    case Tokens.MULTI_LINE_COMMENT: {
      string = string
        .replace(/\*\/$/, '')
        .replace(/^\/\*/, '')
        .trim();

      while (true) {
        if (string[string.length - 1] === '\n') {
          string = string.substr(0, string.length - 1);
        } else if (string[string.length - 2] === '\r\n') {
          string = string.substr(0, string.length - 2);
        } else {
          break;
        }
      }

      return {
        ...item,
        token: Tokens.COMMENT,
        string
      };
      break;
    }
    case Tokens.SINGLE_QUOTE_STRING: {
      return {
        ...item,
        token: Tokens.STRING,
        string: string.replace(/'$/, '').replace(/^'/, '')
      };
      break;
    }
    case Tokens.DOUBLE_QUOTE_STRING: {
      return {
        ...item,
        token: Tokens.STRING,
        string: string.replace(/"$/, '').replace(/^"/, '')
      };
      break;
    }
    case Tokens.BACK_TICK_STRING: {
      return {
        ...item,
        token: Tokens.STRING,
        string: string.replace(/`$/, '').replace(/^`/, '')
      };
      break;
    }
    default: {
      return { string, token, ...item };
    }
  }
};

const trim = tokens => {
  while (tokens[0].token === Tokens.UNKNOWN && tokens[0].source === '') {
    tokens.shift();
  }

  while (
    tokens[tokens.length - 1].token === Tokens.UNKNOWN &&
    tokens[tokens.length - 1].source === ''
  ) {
    tokens.pop();
  }

  return tokens;
};

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
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S0,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S0,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  // Single quote string
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S0,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S1,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S1,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S1,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S1,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S1,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S1,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S1,
    to: States.S2,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S2,
    to: States.S1,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S1,
    to: States.S0,
    token: Tokens.SINGLE_QUOTE_STRING
  },
  // Double quote string
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S0,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S3,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S3,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S3,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S3,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S3,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S3,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S3,
    to: States.S4,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S4,
    to: States.S3,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S3,
    to: States.S0,
    token: Tokens.DOUBLE_QUOTE_STRING
  },
  // Back tick string
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S0,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S5,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S5,
    to: States.S6,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S6,
    to: States.S5,
    token: Tokens.BACK_TICK_STRING
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S5,
    to: States.S0,
    token: Tokens.BACK_TICK_STRING
  },
  // Single line comment
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S0,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S7,
    to: States.S7,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S7,
    to: States.S0,
    token: Tokens.SINGLE_LINE_COMMENT
  },
  // Multi line comment
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S0,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S8,
    to: States.S8,
    token: Tokens.MULTI_LINE_COMMENT
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S8,
    to: States.S0,
    token: Tokens.MULTI_LINE_COMMENT
  },
  /// Back slash
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S0,
    to: States.S9,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.UNKNOWN,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.EOL,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.SINGLE_QUOTE,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.DOUBLE_QUOTE,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.BACK_TICK,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.BACK_SLASH,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.START_SINGLE_LINE_COMMENT,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.START_MULTI_LINE_COMMENT,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  },
  {
    lexeme: Lexemes.END_MULTI_LINE_COMMENT,
    from: States.S9,
    to: States.S0,
    token: Tokens.UNKNOWN
  }
];

const transitions = {};
for (const { lexeme, from, to, token } of ParserRules) {
  if (!transitions[from]) {
    transitions[from] = {};
  }
  transitions[from][lexeme] = { to, token };
}

const parser = items => {
  let prevState;
  let state = States.S0;

  const tokens = [];
  let item = { source: '', string: '', token: Tokens.UNKNOWN };
  for (const { lexeme, source } of items) {
    prevState = state;
    state = transitions[prevState][lexeme].to;

    if (item.token !== transitions[prevState][lexeme].token) {
      tokens.push(normalize(item));
      item = {
        source: '',
        string: '',
        token: transitions[state][lexeme].token
      };
    }

    item.source += source;
    item.string += source;
  }
  tokens.push(normalize(item));

  return trim(tokens);
};

module.exports = {
  parser,
  normalize,
  trim,
  States,
  Tokens,
  ParserRules
};
