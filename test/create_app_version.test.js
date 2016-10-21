const moment = require('moment')
const appversion = require('../appversion')

test('create app version based on current datetime', () => {
	const now = moment('2013-02-08 09:30:26.123')
	expect(appversion(now)).toBe('app-20130208_093026');
})
