import express from "express"

import auth from "../middleware/auth.middleware.js"
import uploader  from "../controllers/uploader.controller.js"
import {createBlog, deleteBlog, dislikeBlog, getAllBlogs, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blog.controwller.js"

const router = express.Router()

router.route("/create").post(auth(), createBlog)
router.route("/:blogId").put(auth(), uploader, updateBlog) 
router.route("/:blogId").patch(auth(),togglePublishBlog);
router.route("/get-all-blogs").get(getAllBlogs)
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/get-own-blogs").get(auth(), getOwnBlogs)
router.route("/delete/:id").delete(auth(), deleteBlog);
router.get("/:id/like", auth(), likeBlog);
router.get("/:id/dislike", auth(), dislikeBlog);
router.get('/my-blogs/likes', auth(), getMyTotalBlogLikes)

export default router;