import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const resend = new Resend(process.env.resendkey);

async function sendMail({ to, subject, text, html }) {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent via Resend:", data);
    return data;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
}

export default sendMail;
