import express from "express";
import {
  getAllUsers,
  login,
  logout,
  register,
  updateProfile,
  profile,
} from "../controllers/user.controller.js";
import  auth from "../middleware/auth.middleware.js";
import uploader from "../controllers/uploader.controller.js";
import sendContact from "../utils/sendContact.js";
import sendSubscribe from "../utils/sendSubscribe.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(auth(false),login);
router.route("/logout").get(auth(),logout);
router.route("/contact").post(sendContact);
router.route("/profile/:id").get(profile);
router.route("/subscribe").post(sendSubscribe);
router.route("/profile/update").put(auth(), uploader, updateProfile);
router.route("/all-users").get(getAllUsers);

export default router;
