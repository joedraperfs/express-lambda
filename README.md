# express-lambda

This folder contains a small Javascript app based on Node.js and Express.  It's purpose is to test deploying an Express based app as an AWS Lambda function from a simple Jenkins Job.

To facilitate this Express app being a lambda function the following code modifications were made:
* Added the `index.js` file, the Lambda entry point (Handler)
* Commented out the Express `listen` method (handled by Lambda)

Assuming that Node.js 12.x is installed on the build system, these commands are required once to configure the build system with required utilities.
* `npm install -g serverless`
* `serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx`

When first creating the application, these commands installed the dependencies and saved them to the `package.json` file.
These are not required for building after repo checkout.
* `npm install --save express cors serverless-http --save`

These commands are required after the repo is checked out for building and deploying:
* `cd express-lambda`
* `npm install`
* `serverless deploy`

This command will remove all AWS resources created during deploy.
* `serverless remove`

## References
https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/
https://epsagon.com/development/aws-lambda-express-getting-started-guide/

