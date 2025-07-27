// backend/controllers/sendMail.controller.js
import nodemailer from "nodemailer";
import "./config.env.js";
import codes from "./codes.js"
import ApiErrorResponse from "./ApiErrorResponse.js"
import ApiResponse from "./ApiResponse.js"

let sendSubscribe= async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL,
      to: process.env.MAIL,
      // to: "bloggernishu31@gmail.com",
      subject: `${email} opt for subscription`,
      html: `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
    </style>
  </head>
  <body>
        <div style="background: #111; color: #fff; padding: 20px;">
          <h2>Hello Dev team, it's a new subscriber <span style="color: #93c5fd">${email}</span></h2>
        </div>
      <hr class="border-t border-blue-900 my-6" />
    </body>
    </html>
      `,
    });

    return res.status(codes.ok).json(new ApiResponse("Mail posted successfully",codes.ok,{id: info.messageId }).res());
  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(codes.internalServerError).json(new ApiErrorResponse("Error posting mail.",codes.internalServerError,{},err).res());
  }
};


export default sendSubscribe