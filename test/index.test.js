const fs = require('fs')
const path = require('path')

const { parse } = require('../src/index')

test('named-block should works correctly', async () => {
	console.log(
		await parse(
			path.join(
				__dirname,
				'named-blocks.js'
			)
		)
	)
})