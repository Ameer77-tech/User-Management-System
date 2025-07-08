const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to,code)=>{
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

const mailOptions = {
  from: `"HACKER_77"`,
  to, 
  subject: "Your Verification Code",
  html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <p>Hello!</p>
      <p>Your verification code is:</p>
      <h2 style="color: #4CAF50;">${code}</h2>
      <p>Thank you!</p>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending mail:", error);
    return false
  } else {
    console.log("Email sent:", info.response);
    return true
  }
});

}   

module.exports = sendMail