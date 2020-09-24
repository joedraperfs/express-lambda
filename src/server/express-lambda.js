/**
 * express-lambda
 * 
 * This is a small Express app to test as an AWS Lambda function deployed via a 
 * simple Jenkins job.
 * 
 * @author Joe Draper
 */
const express = require('express');
const cors = require('cors');
const app = express();
const { retrieveSecrets2 } = require('./secretsManager');
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true, strict: false }));
app.use(express.json());
app.all('*', retrieveSecrets2);

const jsonReply = {
  status: 'success',
  message: 'Hello World!',
  version: '0.0.4'
};

msg('From express-lambda function.');

app.get('/test', (req, res) => {
  res.json(jsonReply);
})

app.get('/secrets', (req, res) => {

  let secrets = {
    AC_TOKEN: process.env.AC_TOKEN,
    AC_URL: process.env.AC_URL,
  }
  res.json(secrets);
})


app.listen(port, () => {
  msg('Example app listening at http://localhost: ' + port);
});

module.exports = app

function msg(message) {
  if(arguments.length > 1) {
    console.log(...arguments);
  }
  else {
    if (typeof message === 'object') {
      message = JSON.stringify(message, null, 2);
    }
    console.log(message);
  }
}
