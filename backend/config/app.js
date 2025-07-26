import express from "express";
import dotenvx from "@dotenvx/dotenvx";
import userRoute from "../routes/user.route.js";
import blogRoute from "../routes/blog.route.js";
import commentRoute from "../routes/comment.route.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import logger from "../utils/logger.js";
import codes from "../utils/codes.js";

dotenvx.config();
const app = express();


// default middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://nishu-blogs.vercel.app",
    credentials: true,
  })
);

// Middleware to parse file uploads
app.use(
  fileUpload({
    useTempFiles: true, // saves to /tmp by default
    tempFileDir: "/tmp/",
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max (optional)
  })
);

// Upload Route

const _dirname = path.resolve();

let baseRoute = "/api/v1/";

// apis
app.use(`${baseRoute}user`, userRoute);
app.use(`${baseRoute}blog`, blogRoute);
app.use(`${baseRoute}comment`, commentRoute);

app.use(express.static(path.join(_dirname, `/frontend/dist`)));

app.get("/{*splat}", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.all(`/{*splat}`, (req, res) => {
  return res
    .status(codes.notFound)
    .json(
      new ApiErrorResponse(
        "The route you are trying to reach does not exist",
        codes.notFound
      ).res()
    );
});

app.all(`/${baseRoute}{*splat}`, (req, res) => {
  return res
    .status(codes.notFound)
    .json(
      new ApiErrorResponse(
        "The route you are trying to reach does not exist",
        codes.notFound
      ).res()
    );
});

app.use((err, req, res, next) => {
  return res
    .status(codes.badRequest)
    .json(
      new ApiErrorResponse("Error occured", codes.badRequest, {}, err).res()
    );
});

export default app;
