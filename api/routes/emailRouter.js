const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailRouter = express.Router();

//https://ethereal.email/

emailRouter.post('/', async (req, res) => {
  const { title, email, message } = req.body;

  try {
    // Utworzenie transporteru dla serwera SMTP

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_LOG,
        pass: process.env.EMAIL_PSWD,
      }
    });

    // Wysłanie wiadomości e-mail

    let info = transporter.sendMail({
      from: email,
      to: "pztz@info.pl",
      subject: title,
      text: message,
    });

    console.log(info.messageId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = emailRouter;
