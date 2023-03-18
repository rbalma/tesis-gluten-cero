import { EMAIL_USERNAME, EMAIL_PASSWORD } from '../config/config.js';
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Gluten Cero <${EMAIL_USERNAME}>`,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendEmail;