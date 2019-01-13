const fs = require('fs');
const StateMachine = require('javascript-state-machine');

const Tokens = {
	UNKNOWN: Symbol(),
	EOL: Symbol(), // \n \r \r\n
	SINGLE_QUOTE: Symbol(), // '
	DOUBLE_QUOTE: Symbol(), // "
	BACK_TICK: Symbol(), // `
	BACK_SLASH: Symbol(), // \
	START_SINGLE_LINE_COMMENT: Symbol(), // //
	START_MULTI_LINE_COMMENT: Symbol(), // /*
	END_MULTI_LINE_COMMENT: Symbol(), // */
}

const Expressions = {
	[Tokens.EOL]: /\r?\n/,
	[Tokens.SINGLE_QUOTE]: /'/,
	[Tokens.DOUBLE_QUOTE]: /"/,
	[Tokens.BACK_TICK]: /`/,
	[Tokens.BACK_SLASH]: /\\/,
	[Tokens.START_SINGLE_LINE_COMMENT]: /\/\//,
	[Tokens.START_MULTI_LINE_COMMENT]: /\/\*/,
	[Tokens.END_MULTI_LINE_COMMENT]: /\*\//,
}

function extractToken(Input, Token) {
	const result = []
	for(const { token, source } of Input) {
		if(token !== Tokens.UNKNOWN) {
			continue
		}
		const items = source.split(Expressions[Token])
		const itemsCount = items.length
		let index = 0
		while (true) {
			const item = items[index++]
			result.push({
				token: Tokens.UNKNOWN,
				source: item
			})
			if(index === itemsCount) {
				break
			}
			result.push({
				token: Token,
				source: null
			})
		}
	}
	return result
}

function parse(filePath, encoding = 'utf8') {
	return new Promise(
		(resolve, reject) => {
			let data = []

			const readStream = fs.createReadStream(filePath, { encoding })
				.on('data', function(chunk) {
						const tokens = [{
							token: Tokens.UNKNOWN,
							source: chunk.toString()
						}]

				})
				.on('end', function() {
						resolve(data);
				})
				.on('error', function(error) {
						reject(error)
				})
		}
	)
}



module.exports = {
	parse
}
