import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.google_app_user_mail,
    pass: config.google_app_password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const nodeMailerSender = async (
  id: string,
  resetPasswordLink: string
) => {
  const info = await transporter.sendMail({
    from: '"This is reset link : 👻" <www.biplob@gmail.com>',
    to: "www.biplob@gmail.com",
    subject: "Reset Password Link ✔",
    // text: "Hello world?",
    html: `
       <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #000000;
        border: 1px solid white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        padding: 20px;
        text-align: center;
        color: white;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #ffffff;
        font-size: 20px;
      }
      .content p {
        color: #ffffff;
        font-size: 16px;
        line-height: 1.5;
      }
      .reset-btn {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 10px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header Section -->
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>

      <!-- Content Section -->
      <div class="content">
        <h2>Hello,</h2>
        <p>
          You recently requested to reset your password for your account. Click
          the button below to reset it. This password reset link is only valid
          for the next 1 hour.
        </p>
        <a href="${resetPasswordLink}" class="reset-btn">Reset Your Password</a>
        <p>
          If you did not request a password reset, please ignore this email or
          contact support if you have any questions.
        </p>
      </div>

      <!-- Footer Section -->
      <div class="footer">
        <p>© 2024. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

    `,
  });
  console.log("Message sent: %s", info.messageId);
};
