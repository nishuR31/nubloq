// utils/mailer.js
import nodemailer from "nodemailer";
import "./config.env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (email, userName = "User", data) => {
  const info = await transporter.sendMail({
    from: `Team <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Hi ${userName}, your OTP is ${data}. Please use this to reset your password.`,
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
  <body
    class="bg-gradient-to-tr from-black via-gray-900 to-black text-white flex items-center justify-center min-h-screen min-w-screen p-4"
  >
    <div
      class="w-full max-w-screen p-6 rounded-xl shadow-lg backdrop-blur-sm bg-black/50 border border-white/10"
    >
      <h2 class="text-2xl font-semibold mb-3">
        Hello, <span class="text-blue-300 font-bold">${userName}</span>
      </h2>

      <p class="mb-4">
        We received a request to reset your password. Use the OTP below to
        proceed:
      </p>

      <div
        id="otp"
        class="text-center pointer-click my-6 text-3xl font-bold tracking-widest px-6 py-4 rounded-lg bg-white/10 text-blue-100 shadow-inner border border-white/10"
        value="${data}"
      >
        ${data}
      </div>

      <p class="text-center mb-4 text-gray-500">
        If you didn’t request this, feel free to ignore this message.
      </p>

      <hr class="border-t border-blue-900 my-6" />

      <p class="text-sm text-gray-300 text-center">
        Never share your OTP or password with anyone.<br />
        This message was sent to:
        <span class="text-white font-medium">${email}</span>
      </p>
    </div>

    <script>
      let otp = document.querySelector("#otp");

      otp.addEventListener("click", async (e) => {
        const text = e.currentTarget.innerText.trim();
        await navigator.clipboard.writeText(text);
      });
    </script>
  </body>
</html>

`,
  });

  console.log(`Email sent : ${info.messageId}`);
};

export default sendMail;
