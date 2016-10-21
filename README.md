elasticbeanstalk-deploy
=============================

A tiny util for deploying application to AWS elasticbeanstalk — Edit


## install

```
npm install -D elasticbeanstalk-deploy
```

## usage

### Envs

#### Step 1

Set environment variables.

- `S3_BUCKET`: s3 bucket name in which codes will be put.
- `APP_NAME`: APP name to deploy (e.g. `MyFirstApp`)
- `APP_ENV_NAME`: Environment name(e.g. `production`)
- `ARTIFACT`: bundle file name(may be zipped coeds)
  -  FYI: bundle file can be created with following:  `zip -j /tmp/artifact.zip sample_application/*`

Set AWS related variables if needed.

- `AWS_SECRET_ACCESS_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_DEFAULT_REGION`

#### Step 2


```
$(npm bin)/elasticbeanstalk-deploy
```
