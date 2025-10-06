import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

dotenv.config();

console.log("📧 Using Mailtrap API for all environments...");

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN, // Your API token from Mailtrap
    testInboxId: 4017448, // Your Sandbox Inbox ID (from Mailtrap dashboard)
  })
);

const sendMail = async ({ to, subject, text }) => {
  try {
    const sender = {
      address: "no-reply@ecommerce.com",
      name: "E-Commerce App",
    };

    const mailOptions = {
      from: sender,
      to: [{ email: to }], // 👈 Mailtrap expects array of objects, not plain strings
      subject,
      text,
      category: "Integration Test",
      sandbox: true, // Always true in sandbox mode
    };

    await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully via Mailtrap API");
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
};

export default sendMail;
