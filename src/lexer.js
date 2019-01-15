const { Lexemes, LexerRules } = require('./constants');

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
  lexer
};
