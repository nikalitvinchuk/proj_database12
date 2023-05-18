const express = require('express');
const AWS = require('aws-sdk');

require('dotenv').config();

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'eu-central-1'
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const emailRouter = express.Router();

emailRouter.post('/', (req, res) => {
  const { title, email, message } = req.body;

  const params = {
    Destination: {
      ToAddresses: ['michal.m1234@interia.pl']
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Author: ${email}, Message: ${message}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${title}`
      }
    },
    Source: 'mmordarski@int.pl',
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.status(500).send('Error sending email');
    } else {
      console.log(data);
      res.send('Email sent successfully');
    }
  });
});

module.exports = emailRouter;
