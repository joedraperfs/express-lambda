/**
 * index
 * 
 * This is the Lambda entry point (Handler).
 * 
 * @author Joe Draper
 */
const serverless = require('serverless-http');
const app = require('./server/express-lambda');
const handler = serverless(app);

module.exports.server = async (event, context) => {
  console.log('Lambda calling handler: serverless(app)');
  return await handler(event, context);
};
