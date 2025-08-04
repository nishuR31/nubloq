import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import codes from "../utils/codes.js";
import isEmpty from "../utils/isEmpty.js";
import mongoose from "mongoose";

// CREATE COMMENT
export const createComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const commenter = req.user._id;
  const { content } = req.body;

  const blog = await Blog.findById(postId);
  if (!blog) {
    return res.status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found", codes.notFound).res());
  }

  if (!content) {
    return res.status(codes.badRequest)
      .json(new ApiErrorResponse("Comment is required.", codes.badRequest).res());
  }

  const comment = await Comment.create({ content, userId: commenter, postId });

  await comment.populate({ path: "userId", select: "firstName lastName userName photoUrl" });

  blog.comments.push(comment._id);
  await blog.save();

  return res.status(codes.ok)
    .json(new ApiResponse("Comment added successfully.", codes.ok, { comment }).res());
});

// GET COMMENTS OF A BLOG POST
export const getCommentsOfPost = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid Blog ID", codes.badRequest).res());
  }

  const comments = await Comment.find({ postId: blogId })
    .populate({ path: "userId", select: "firstName lastName photoUrl userName" })
    .sort({ createdAt: -1 });

  return res.status(codes.ok)
    .json(new ApiResponse("Comments found", codes.ok, { comments: comments ?? [] }).res());
});

// DELETE COMMENT
export const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const authorId = req.user._id;

  if (isEmpty([commentId])) {
    return res.status(codes.badRequest)
      .json(new ApiErrorResponse("Comment id not found", codes.badRequest).res());
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(codes.notFound)
      .json(new ApiErrorResponse("Comment not found to delete", codes.notFound).res());
  }

  if (comment.userId.toString() !== authorId) {
    return res.status(codes.unauthorized)
      .json(new ApiErrorResponse("User is Unauthorized to delete this comment", codes.unauthorized).res());
  }

  const blogId = comment.postId;

  await Comment.findByIdAndDelete(commentId);
  await Blog.findByIdAndUpdate(blogId, { $pull: { comments: commentId } });

  return res.status(codes.ok)
    .json(new ApiResponse("Comment deleted successfully", codes.ok).res());
});

// EDIT COMMENT
export const editComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;
  const commentId = req.params.id;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(codes.notFound)
      .json(new ApiErrorResponse("Comment not found to edit", codes.notFound).res());
  }

  if (comment.userId.toString() !== userId) {
    return res.status(codes.unauthorized)
      .json(new ApiErrorResponse("Not authorized to edit this comment", codes.unauthorized).res());
  }

  comment.content = content;
  await comment.save();

  return res.status(codes.ok)
    .json(new ApiResponse("Comment updated successfully", codes.ok, { comment }).res());
});

// LIKE COMMENT
export const likeComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const commentId = req.params.id;

  const comment = await Comment.findById(commentId).populate("userId");
  if (!comment) {
    return res.status(codes.notFound)
      .json(new ApiErrorResponse("Comment not found", codes.notFound).res());
  }

  const alreadyLiked = comment.likes.includes(userId);

  if (alreadyLiked) {
    comment.likes = comment.likes.filter(id => id.toString() !== userId);
    comment.numberOfLikes -= 1;
  } else {
    comment.likes.push(userId);
    comment.numberOfLikes += 1;
    // Remove dislike if previously disliked
    if (comment.dislikes.includes(userId)) {
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
      comment.numberOfDislikes -= 1;
    }
  }

  await comment.save();

  return res.status(codes.ok)
    .json(new ApiResponse(alreadyLiked ? "Comment unliked" : "Comment liked", codes.ok, { comment }).res());
});

// DISLIKE COMMENT
export const dislikeComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const commentId = req.params.id;

  const comment = await Comment.findById(commentId).populate("userId");
  if (!comment) {
    return res.status(codes.notFound)
      .json(new ApiErrorResponse("Comment not found", codes.notFound).res());
  }

  const alreadyDisliked = comment.dislikes.includes(userId);

  if (alreadyDisliked) {
    comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    comment.numberOfDislikes -= 1;
  } else {
    comment.dislikes.push(userId);
    comment.numberOfDislikes += 1;
    // Remove like if previously liked
    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
      comment.numberOfLikes -= 1;
    }
  }

  await comment.save();

  return res.status(codes.ok)
    .json(new ApiResponse(alreadyDisliked ? "Comment undisliked" : "Comment disliked", codes.ok, { comment }).res());
});

// GET ALL COMMENTS ON MY BLOGS
export const getAllCommentsOnMyBlogs = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const myBlogs = await Blog.find({ author: userId }).select("_id");
  const blogIds = myBlogs.map(blog => blog._id);

  if (blogIds.length === 0) {
    return res.status(codes.ok)
      .json(new ApiErrorResponse("Blog not found", codes.ok, { totalComments: 0, comments: [] }).res());
  }

  const comments = await Comment.find({ postId: { $in: blogIds } })
    .populate("userId", "firstName lastName email userName")
    .populate("postId", "title");

  if (!comments) {
    return res.status(codes.notFound)
      .json(new ApiErrorResponse("Failed to get your comments.", codes.notFound).res());
  }

  return res.status(codes.ok)
    .json(new ApiResponse("Your comments are found successfully.", codes.ok, {
      totalComments: comments.length,
      comments,
    }).res());
});
