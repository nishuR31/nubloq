// backend/controllers/sendMail.controller.js
import nodemailer from "nodemailer";
import "./config.env.js";
import codes from "./codes.js"
import ApiErrorResponse from "./ApiErrorResponse.js"
import ApiResponse from "./ApiResponse.js"

let sendContact= async (req, res) => {
  const { email, name, message } = req.body;

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
      subject: `${name} filed for a reachout`,
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
          <h2>Hello Dev team, it's <span style="color: #93c5fd">${name}</span></h2>
          <p>${message}</p>
        </div>
      <hr class="border-t border-blue-900 my-6" />
      <p>From : <span>${email}</span></p>
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


export default sendContact