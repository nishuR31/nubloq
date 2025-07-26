import express from "express";
import {
  getAllUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import  auth from "../middleware/auth.middleware.js";
import uploader from "../controllers/uploader.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(auth(false),login);
router.route("/logout").get(auth(),logout);
router
  .route("/profile/update")
  .put(auth(), uploader, updateProfile);
router.get("/all-users", getAllUsers);

export default router;
