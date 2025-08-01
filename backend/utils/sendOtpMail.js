// utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
// dotenv.config({ path: path.resolve("backend/.env") });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

const sendOtp = async (email, userName = "User", data) => {
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

      #copy-feedback {
        display: none;
      }

      #otp.copied + #copy-feedback {
        display: block;
      }
    </style>
  </head>
  <body
    class="bg-gradient-to-tr from-black via-gray-900 to-black text-white min-h-screen flex items-center justify-center p-6"
  >
    <div
      class="w-full max-w-lg p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg"
    >
      <header class="text-center mb-6">
        <h2 class="text-3xl font-extrabold text-blue-300">Password Reset</h2>
        <p class="mt-2 text-gray-400 text-sm">
          OTP to securely update your credentials
        </p>
      </header>

      <main>
        <p class="text-base mb-4">
          Hi <span class="text-blue-400 font-semibold">${userName}</span>,
        </p>

        <p class="text-gray-300">
          We’ve received a request to reset the password for your account. Use
          the OTP below to continue:
        </p>

        <div class="mt-6 mb-2">
          <div
            id="otp"
            class="text-center text-4xl font-bold tracking-widest px-6 py-4 rounded-lg bg-white/10 text-blue-100 border border-white/10 cursor-pointer transition hover:bg-white/20"
          >
            ${data}
          </div>
          <div
            id="copy-feedback"
            class="text-sm text-green-400 text-center mt-2"
          >
            ✅ OTP copied to clipboard
          </div>
        </div>

        <p class="text-sm text-center text-gray-500 mt-4">
          This code will expire in 10 minutes. Please do not share it with
          anyone.
        </p>
      </main>

      <hr class="my-6 border-blue-800" />

      <footer class="text-sm text-center text-gray-400">
        If you didn’t request this reset, you can safely ignore this email.<br />
        This message was sent to:
        <span class="text-white font-medium">${email}</span>
      </footer>
    </div>

    <script>
      const otp = document.getElementById("otp");
      const feedback = document.getElementById("copy-feedback");

      otp.addEventListener("click", async () => {
        try {
          const text = otp.innerText.trim();
          await navigator.clipboard.writeText(text);
          otp.classList.add("copied");
          feedback.style.display = "block";
          setTimeout(() => {
            feedback.style.display = "none";
            otp.classList.remove("copied");
          }, 2500);
        } catch (err) {
          console.error("Failed to copy OTP", err);
        }
      });
    </script>
  </body>
</html>

`,
  });

  console.log(`Email sent : ${info.messageId}`);
};

export default sendOtp;
