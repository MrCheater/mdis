const { lexer } = require('../src/lexer');

test('lexer should return lexemes', async () => {
  const source = `
	var str1 = ''
	var str2 = 'dsada'
	var str3 = ""
	var str4 = "dsada"
	var str5 = \`\`
	var str6 = \`dsada\`
	var str7 = ' \
	 1\
	 2\
	 3'
	 
	var num = 23
	
	console.log(42)
`;

  const lexemes = lexer(source);

  expect(lexemes.map(({ string }) => string).join('')).toEqual(source);
});
