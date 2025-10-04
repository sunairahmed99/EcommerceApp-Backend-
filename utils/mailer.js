import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

// ✅ Gmail SMTP config (recommended for production)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL connection
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
}

export default sendMail;
