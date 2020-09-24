/*
 *  Util to get sensitive information from AWS Secret Manager and set that information as env variables
 */
const AWS = require('aws-sdk');

const region = 'us-west-2';
const secretName = 'CartAbandonment';

// Create a Secrets Manager client
const client = new AWS.SecretsManager({
  region
});

const retrieveSecrets = () => {
  return new Promise((resolve, reject) => {
    if (! process.env.AC_TOKEN) {
      console.log('Retreiving secrets from Secrets Manager...');
      client.getSecretValue({ SecretId: secretName }, (err, data) => {
        if (err) {
          reject(err);
        }
        // Decrypts secret using the associated KMS CMK.
        if ('SecretString' in data) {
          const secrets = JSON.parse(data.SecretString);
          Object.keys(secrets).forEach((secret) => {
            process.env[secret] = secrets[secret];
          });
          console.log('Secrets retrieved.');
          resolve(true);
        }
      });
    }
    else {
      console.log('secrets have already been loaded.');
      resolve(true);
    }
  });
};

const retrieveSecrets2 = (req, res, next) => {
  if (! process.env.AC_TOKEN) {
    console.log('Retreiving secrets from Secrets Manager...');
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        console.log('Error getting secrets from Secrets Manager');
        console.log(err);
      }
      // Decrypts secret using the associated KMS CMK.
      if ('SecretString' in data) {
        const secrets = JSON.parse(data.SecretString);
        Object.keys(secrets).forEach((secret) => {
          process.env[secret] = secrets[secret];
        });
        console.log('Secrets retrieved.');
        next();
      }
    });
  }
  else {
    console.log('secrets have already been loaded.');
    next();
  }

};

module.exports = { 
  retrieveSecrets,
  retrieveSecrets2
};