import express from "express"

import auth from "../middleware/auth.middleware.js"
import uploader  from "../controllers/uploader.controller.js"
import {createBlog, deleteBlog, dislikeBlog, getAllBlogs,getBlog, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blog.controller.js"
 
const router = express.Router()

router.route("/create").post(auth(), createBlog)
router.route("/get-all-blogs").get(getAllBlogs) ////
router.route("/get-published-blogs").get(getPublishedBlog) //////
router.route("/get-own-blogs").get(auth(), getOwnBlogs)
router.get('/my-blogs/likes', auth(), getMyTotalBlogLikes) /////
router.route("/:blogId").patch(auth(), uploader, updateBlog) 
router.route("/:blogId").get(getBlog)  /////
router.route("/:blogId/publish").get(togglePublishBlog);
// router.route("/:blogId").patch(togglePublishBlog); 
router.route("/delete/:id").delete(auth(), deleteBlog); 
router.get("/:blogId/like", auth(), likeBlog);
router.get("/:blogId/dislike", auth(), dislikeBlog);
 
export default router;