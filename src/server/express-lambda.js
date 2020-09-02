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
//const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true, strict: false }));
app.use(express.json());

const jsonReply = {
  status: 'success',
  message: 'Hello World!'
};

msg('From express-lambda function.');

app.get('/test', (req, res) => {
  res.json(jsonReply);
})

module.exports = app

//app.listen(port, () => {
//  msg('Example app listening at http://localhost: ' + port);
//})

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
