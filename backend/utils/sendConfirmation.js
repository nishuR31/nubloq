// backend/controllers/sendMail.controller.js
import nodemailer from "nodemailer";
import "./config.env.js";
import codes from "./codes.js";
import ApiErrorResponse from "./ApiErrorResponse.js";
import ApiResponse from "./ApiResponse.js";

let sendSubscribe = async (req, res) => {
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
      to: email,
      // to: "bloggernishu31@gmail.com",
      subject: `Confirmation mail.`,
      html: `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Email</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
    </style>
  </head>
  <body>
    <div
      class="bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 text-white min-h-screen p-6 flex items-center justify-center"
    >
      <div
        class="max-w-2xl w-full bg-black/30 backdrop-blur-sm p-8 rounded-lg shadow-lg"
      >
        <header class="mb-6 border-b border-purple-600 pb-4 text-center">
          <h1 class="text-3xl font-bold text-purple-300">
             Welcome to Our Service!
          </h1>
        </header>

        <main class="space-y-4 text-lg">
          <p>Dear<span class="text-purple-400 font-semibold">User</span>,</p>
          <p>
            Thank you for reaching out to our services. We’re excited to have you
            on board!
          </p>
          <p>
            We've registered your email as:
            <span class="text-blue-400 font-mono">${email}</span>
          </p>
          <p>
            You’ll soon receiving replies, updates, announcements, and exclusive content
            shortly
          </p>

          <div class="text-center mt-6">
            <a
              href="https://nishu-blogs.vercel.app/"
              class="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 transition text-white rounded-full font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Your Dashboard
            </a>
          </div>
        </main>

        <footer
          class="mt-10 text-sm text-gray-400 text-center border-t border-purple-800 pt-4"
        >
          &copy; ${new Date().getFullYear()} Nishu Blogs. All rights reserved.
        </footer>
      </div>
    </div>
  </body>
</html>
      `,
    });

    return res.status(codes.ok).json(
      new ApiResponse("Mail posted successfully", codes.ok, {
        id: info.messageId,
      }).res()
    );
  } catch (error) {
    console.error("Error sending mail:", error);
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Error posting mail.",
          codes.internalServerError,
          {},
          err
        ).res()
      );
  }
};

export default sendSubscribe;
