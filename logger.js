 "use strict";

const eyes = require('eyes')

class Logger {


	info(msg){
		eyes.inspect(msg, 'INFO')
	}

	error(msg){
		eyes.inspect(msg, 'ERROR')
	}

	warn(msg){
		eyes.inspect(msg, 'WARN')
	}


	debug(msg){
		eyes.inspect(msg, 'DEBUG')
	}

}

const logger = new Logger()
module.exports = logger
