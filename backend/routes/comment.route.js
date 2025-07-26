import express from "express";

import  auth from "../middleware/auth.middleware.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllCommentsOnMyBlogs,
  getCommentsOfPost,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:id/create", auth(), createComment);
router.delete("/:id/delete", auth(), deleteComment);
router.put("/:id/edit", auth(), editComment);
router.route("/:id/comment/all").get(getCommentsOfPost);
router.get("/:id/like", auth(), likeComment);
router.get("/my-blogs/comments", auth(), getAllCommentsOnMyBlogs);

export default router;
