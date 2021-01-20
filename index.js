const Lexer = require('lex');
const Parser = require('./parser');

const lexer = new Lexer();

lexer.addRule(/\s+/, () => {
  // skip whitespace
});
lexer.addRule(/[0-9]+(?:\.[0-9]+)?/, (lexeme) => {
  // numbers
  return lexeme;
});
lexer.addRule(/[(+\-*/^)]/, (lexeme) => {
  // punctuation (i.e. "(", "+", "-", "*", "/", "^", ")")
  return lexeme;
});

const factor = { precedence: 2, associativity: 'left' };
const term = { precedence: 1, associativity: 'left' };
const parser = new Parser({
  '+': term,
  '-': term,
  '^': term,
  '*': factor,
  '/': factor,
});

function parse(input) {
  lexer.setInput(input);

  const tokens = [];
  let token;

  while ((token = lexer.lex())) {
    tokens.push(token);
  }

  return parser.parse(tokens);
}

const operator = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw Error('Division by zero');
    }

    return a / b;
  },
  '^': (a, b) => a ** b,
};
module.exports = (input) => {
  const stack = [];

  parse(input).forEach((c) => {
    switch (c) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
        // eslint-disable-next-line no-case-declarations
        const b = +stack.pop();
        // eslint-disable-next-line no-case-declarations
        const a = +stack.pop();
        stack.push(operator[c](a, b));
        break;
      default:
        stack.push(c);
    }
  });

  return stack.pop();
};
