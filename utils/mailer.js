import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

let sendMail;

if (isProduction) {
  console.log("🚀 Using Mailtrap (Production)");

  // Mailtrap Transport Setup
  const transport = nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAILTRAP_TOKEN, // API token from your Mailtrap account
      testInboxId: 4017448, // replace with your own Sandbox ID
    })
  );

  sendMail = async ({ to, subject, text }) => {
    try {
      const sender = {
        address: "sunairahmed9908@example.com",
        name: "E-Commerce App",
      };

      await transport.sendMail({
        from: sender,
        to: [to],
        subject,
        text,
        category: "Integration Test",
        sandbox: true, // true = sends to sandbox inbox
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
