const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the follwing link: 
  <a href="${verifyEmail}">Verify Email </a> </p>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4>Hello ${name}</h4>, ${message}`,
  }); // we are already returning a promise in our authController code so no need for await here
};

module.exports = sendVerificationEmail;
