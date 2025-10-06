import sendMail from "./utils/mailer";



// 🔹 Test Email Send
sendMail({
  to: "sunairahmed121@gmail.com", // koi bhi valid email
  subject: "Mailtrap Test 🚀",
  text: "Congrats! Mailtrap via Nodemailer is working perfectly 🎉",
});
