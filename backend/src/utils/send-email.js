const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Read the HTML file
const emailTemplate = fs.readFileSync(
  path.join(__dirname + "/emailTemplate", "welcome-message.html"),
  "utf8"
);

// Create a transporter
const EmailService = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // Replace with your SMTP server address
  port: 587, // Replace with your SMTP server port (usually 587 or 465)
  secure: false, // true for 465, false for other ports
  auth: {
    user: "nikhil@theshopbusiness.com", // Replace with your SMTP server email
    pass: "8T3i:G2m&h+ETc.", // Replace with your SMTP server password
  },
});

// Setup email data
const mailOptions = {
  from: '"Nikhil Kumar" <nikhil@theshopbusiness.com>', // Sender address
  to: "nk90600@gmail.com", // List of recipients
  subject: "Thanks for Signing Up to TheShopBusiness", // Subject line
  text: "Hello world?", // Plain text body
  html: emailTemplate, // HTML body
};

// Send mail
EmailService.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = { EmailService };
