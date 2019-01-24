const StateMachine = require('javascript-state-machine');

const { Lexemes } = require('./lexer');

const States = {
  S0: 'S0',
  S1: 'S1',
  S2: 'S2',
  S3: 'S3',
  S4: 'S4'
};

const stateMachine = new StateMachine({
  init: 'S0',
  transitions: [
    { name: Lexemes.UNKNOWN, from: States.S0, to: States.S0 },
    { name: Lexemes.EOL, from: States.S0, to: States.S0 },
    { name: Lexemes.SINGLE_QUOTE, from: States.S0, to: States.S0 },
    { name: Lexemes.DOUBLE_QUOTE, from: States.S0, to: States.S0 },
    { name: Lexemes.BACK_TICK, from: States.S0, to: States.S0 },
    { name: Lexemes.BACK_SLASH, from: States.S0, to: States.S0 },
    { name: Lexemes.START_SINGLE_LINE_COMMENT, from: States.S0, to: States.S0 },
    { name: Lexemes.START_MULTI_LINE_COMMENT, from: States.S0, to: States.S0 },
    { name: Lexemes.END_MULTI_LINE_COMMENT, from: States.S0, to: States.S0 }
  ],
  methods: {
    onTransition: function({ transition, from, to }) {
      console.log({ transition, from, to });
    }
  }
});

const parser = items => {
  for (const { lexeme } of items) {
    stateMachine[lexeme]();
  }
};

module.exports = {
  parser,
  stateMachine,
  States
};
