test('logger outputs mesages', ()=>{
	const logger = require('../logger')
	logger.info({foo: 'bar', price: 123})
	logger.warn({foo: 'bar', price: 123})
	logger.error({foo: 'bar', price: 123})
	logger.debug({foo: 'bar', price: 123})
})
