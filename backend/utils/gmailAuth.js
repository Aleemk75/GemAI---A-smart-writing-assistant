import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.GMAIL);
console.log(process.env.GMAIL_APP_PASSWORD);


export async function sendMail(recipientEmail, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,            // 465 for SSL, or 587 for TLS
    secure: true,         // true for 465, false for 587
    auth: {
      user: process.env.GMAIL, // your Gmail account
      pass: process.env.GMAIL_APP_PASSWORD // e.g. "abcd efgh ijkl mnop" (no spaces when used)
    }
  });


  const info = await transporter.sendMail({
    from: `"GemAI" <${process.env.GMAIL}>`, // sender address
    to: recipientEmail,
    subject: subject,
    text: text
  });

  // console.log("Message sent:", info.messageId);


}