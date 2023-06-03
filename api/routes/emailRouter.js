const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailRouter = express.Router();

emailRouter.post('/', async (req, res) => {
  const { title, email, message } = req.body;

  try {
    // Utworzenie transporteru dla serwera SMTP

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: "rickie.satterfield@ethereal.email",
        pass: "p4jMJBNyZbvJVnNugz",
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
