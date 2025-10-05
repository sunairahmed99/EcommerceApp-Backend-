import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

// Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // aapka Gmail
    pass: process.env.GMAIL_PASS, // App Password (16-char password)
  },
});

// sendMail function
async function sendMail({ to, subject, text }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent via Gmail:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
}

export default sendMail;
