const AWS = require('aws-sdk')
const fs = require('fs')
const moment = require('moment')

// logger
const logger = require('../logger')
const createVersion = require('./appversion')

//clients
const s3 = new AWS.S3()
const EB = new AWS.ElasticBeanstalk()

const S3_BUCKET = process.env.S3_BUCKET
const APP_NAME = process.env.APP_NAME
const ARTIFACT = process.env.ARTIFACT
const APP_ENV_NAME = process.env.APP_ENV_NAME
const S3KEY_SUFFIX = '-app.zip'

function version2S3Key(version){
	return APP_NAME + '/' + version + S3KEY_SUFFIX
}

function upload_to_s3(artifact, version){
	const stream = fs.createReadStream(artifact)
	const key = version2S3Key(version)
	const params = {
		Bucket: S3_BUCKET,
		Key: key,
		Body: stream
	}
	logger.info(`Uploading new version: ${version} to ${S3_BUCKET}/${key}`)
	return new Promise((resolve, reject) => s3.upload(params, (err, data) => {
		if(err){
			reject(er)
		}else{
			logger.info('upload done')
			resolve(data)
		}
	}))
}

function create_new_version(version){
	const params = {
		ApplicationName: APP_NAME,
		SourceBundle: {
			S3Bucket: S3_BUCKET,
			S3Key: version2S3Key(version)
		},
		VersionLabel: version
	}
	logger.info(`Creating new version: ${APP_NAME}::${version}`)
	return new Promise((resolve, reject)=> EB.createApplicationVersion(params, (err, data)=>{
		if(err){
			reject(err)
		}else{
			logger.info(`New version app has been created: ${APP_NAME}::${version}`)
			resolve(data)
		}
	}))
}


function deploy_new_version(version){
	const params = {
		EnvironmentName: APP_ENV_NAME,
		VersionLabel: version
	}
	logger.info(`Deploying app: ${APP_ENV_NAME}:${version}`)
	return new Promise((resolve, reject)=>{
		EB.updateEnvironment(params, (err, data)=>{
			if(err){
				reject(err)
			}else{
				logger.info('Deploying started')
				resolve(data)
			}
		})
	})
}

function check_args(){
	const args = {S3_BUCKET, APP_NAME, ARTIFACT, APP_ENV_NAME}
	Object.keys(args).forEach(key=> {
		if(typeof args[key] !== 'string'){
			throw new Error(`Enviroment variable ${key} is required`)
		}
	})
}



// check required const
try {
	check_args()
}catch(e){
	logger.error(e.message)
	throw e
}

//start
const version = createVersion(moment())

upload_to_s3(ARTIFACT, version)
  .then(()=>create_new_version(version))
  .then(()=>deploy_new_version(version))
  .catch((e)=>{
	  logger.error(e)
	  process.exit(2)
  })

