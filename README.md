# express-lambda

This folder contains a small Javascript app based on Node.js and Express.  It's purpose is to test deploying an Express based app as an AWS Lambda function from a simple Jenkins Job.

To facilitate this Express app being a lambda function the following code modifications were made:
* Added the `index.js` file, the Lambda entry point (Handler)
* Commented out the Express `listen` method (handled by Lambda)

Assuming that Node.js 12.x is installed on the build system, these commands are required once to configure the build system with required utilities.
* `npm install -g serverless`
* `serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx`
OR
* AWS credentials are acquired automatically in the usuall order
  * from a local `~/.aws/credentials` file
  * from IAM Role assigned if running on an EC2 instance

When first creating the application, these commands installed the dependencies and saved them to the `package.json` file.
These are not required for building after repo checkout.
* `npm install --save express cors serverless-http --save`

These commands are required after the repo is checked out for building and deploying:
* `cd express-lambda`
* `npm install`
* `export API_STAGE="dev"`
* `export REGION="us-west-2"`
* `export DEPLOYMENT_BUCKET="release-bucket"`
* `export LAMBDA_IAM_ROLE="arn:aws:iam::....."`
* `export VPC_ENDPOINT_ID="vpce-......"`
* `serverless deploy -v`
OR
* `serverless deploy -v --config serverless-private.yml`

This command will remove all AWS resources created during deploy.
* `serverless remove -v` For the Public API
* `serverless remove -v --config serverless-private.yml` For the Private API


## References
https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/
https://epsagon.com/development/aws-lambda-express-getting-started-guide/

## Creating a Private API
https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html
https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-vpc-connections/
https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html
https://github.com/serverless/serverless/pull/5080
https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-resource-policies.html
