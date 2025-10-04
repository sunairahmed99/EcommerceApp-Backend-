import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config({quiet:true})


const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT || 2525),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

async function sendMail({ to, subject, text, html }) {
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    html,
  });
}

export default sendMail
