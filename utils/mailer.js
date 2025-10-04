import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

// ✅ Gmail ke liye transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail ka built-in SMTP service
  auth: {
    user: process.env.GMAIL_USER, // tumhara Gmail address
    pass: process.env.GMAIL_PASS, // Gmail App Password (16-character)
  },
});

// ✅ Email send karne ka function
async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL, // jis email se bhejna hai
      to,                            // recipient ka email (user ka)
      subject,
      text,
      html,
    });

    console.log('✅ Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('❌ Email send failed:', error);
    throw error;
  }
}

export default sendMail;
