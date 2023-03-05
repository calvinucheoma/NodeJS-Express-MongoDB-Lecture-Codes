const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  var transport = nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  return transport.sendMail({
    //we don't have to use await since we are returning a promise regardless
    from: '"Chukwuma Ucheoma" <chuks@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });

  //   let info = await transport.sendMail({
  //     from: '"Chukwuma Ucheoma" <chuks@example.com>', // sender address
  //     to, // list of receivers
  //     subject, // Subject line
  //     text, // plain text body
  //     html // html body
  //   });
};

module.exports = sendEmail;
