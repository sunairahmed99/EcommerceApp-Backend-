import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

let sendMail;

if (isProduction) {
  console.log("🚀 Using Mailtrap API (Production)");
  const client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

  sendMail = async ({ to, subject, text }) => {
    try {
      await client.send({
        from: { email: "no-reply@ecommerce.com", name: "E-Commerce App" },
        to: [{ email: to }],
        subject,
        text,
      });
      console.log("✅ Email sent successfully via Mailtrap API");
    } catch (err) {
      console.error("❌ Email send failed:", err.message);
    }
  };
} else {
  console.log("🧪 Using Gmail (Local)");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  sendMail = async ({ to, subject, text }) => {
    try {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
      });
      console.log("✅ Email sent:", info.response);
    } catch (err) {
      console.error("❌ Email send failed:", err.message);
    }
  };
}

export default sendMail;
