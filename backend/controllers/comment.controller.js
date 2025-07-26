import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import codes from "../utils/codes.js";
import isEmpty from "../utils/isEmpty.js";

export const createComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const commenter = req.user.id;
  const { content } = req.body;

  const blog = await Blog.findById(postId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found", codes.notFound).res());
  }
  if (!content) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Comment is required.", codes.badRequest).res()
      );
  }

  const comment = await Comment.create({
    content,
    userId: commenter,
    postId: postId,
  });

  await comment.populate({
    path: "userId",
    select: "firstName lastName photoUrl",
  });

  blog.comments.push(comment._id);
  await blog.save();
  {
    return res
      .status(codes.found)
      .json(new ApiResponse("Comment added successfully.", codes.found).res());
  }
});

////////////////////////////////////////////

export const getCommentsOfPost = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const comments = await Comment.find({ postId: blogId })
    .populate({ path: "userId", select: "firstName lastName photoUrl" })
    .sort({ createdAt: -1 });

  if (!comments) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "No comments found for this blog",
          codes.notFound
        ).res()
      );
  }
  {
    return res.status(codes.found).json(
      new ApiResponse("Comments found", codes.found, {
        comments: comments,
      }).res()
    );
  }
});

///////////////////////////////////////////////////////////////////

export const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const authorId = req.user.id;
  if (isEmpty([commentId])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Comment id not found", codes.badRequest).res()
      );
  }
  const comment = await Comment.findById(commentId);
  console.log(commentId);

  if (!comment) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "Comment not found to delete",
          codes.notFound
        ).res()
      );
  }

  if (comment.userId.toString() !== authorId) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User is Unauthorized to delete this comment",
          codes.unauthorized
        ).res()
      );
  }

  const blogId = comment.postId;

  // Delete the comment
  let deleted = await Comment.findByIdAndDelete(commentId);
  if (!deleted) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Error deleting comment.",
          codes.internalServerError
        ).res()
      );
  }

  // Remove comment ID from blog's comments array
  let updated = await Blog.findByIdAndUpdate(blogId, {
    $pull: { comments: commentId },
  });
  if (!updated) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Error updating comment.",
          codes.internalServerError
        ).res()
      );
  }

  return res
    .status(codes.ok)
    .json(new ApiResponse("Comment deleted successfully", codes.ok).res());
});

/////////////////////////////////////////////////////////

export const editComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;
  const commentId = req.params.id;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("Comment not found to edit", codes.notFound).res()
      );
  }
  // check if the user owns the comment
  if (comment.userId.toString() !== userId) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Not authorized to edit this comment",
          codes.unauthorized
        ).res()
      );
  }

  comment.content = content;
  comment.editedAt = new Date();

  await comment.save();

  return res
    .status(codes.ok)
    .json(new ApiResponse("Comment updated successfully", codes.ok).res());
});

/////////////////////////////////////////////////////////////////////////////////

export const likeComment = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming you're using auth middleware to get user ID
  const commentId = req.params.id;

  const comment = await Comment.findById(commentId).populate("userId");
  if (!comment) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("Comment not found to like", codes.notFound).res()
      );
  }

  const alreadyLiked = comment.likes.includes(userId);

  if (alreadyLiked) {
    // If already liked, unlike it
    comment.likes = comment.likes.filter((id) => id !== userId);
    comment.numberOfLikes -= 1;
  } else {
    // If not liked yet, like it
    comment.likes.push(userId);
    comment.numberOfLikes += 1;
  }
  await comment.save();

  return res.status(codes.ok).json(
    new ApiResponse(`Blog comment ${alreadyLiked} `, codes.ok, {
      updatedComment: comment,
    }).res()
  );
});

///////////////////////////////////////////////////////

export const getAllCommentsOnMyBlogs = asyncHandler(async (req, res) => {
  const userId = req.user.id; // assuming you're using auth middleware

  // Step 1: Find all blog posts created by the logged-in user
  const myBlogs = await Blog.find({ author: userId }).select("_id");

  const blogIds = myBlogs.map((blog) => blog._id);

  if (blogIds.length === 0) {
    return res.status(codes.ok).json(
      new ApiErrorResponse("Blog not found", codes.ok, {
        totalComments: 0,
        comments: [],
      }).res()
    );
  }
  // Step 2: Find all comments on these blogs
  const comments = await Comment.find({ postId: { $in: blogIds } })
    .populate("userId", "firstName lastName email")
    .populate("postId", "title");

  if (!comments) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "Failed to get your comments.",
          codes.notFound
        ).res()
      );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Your comments are found successfully.", codes.ok, {
      totalComments: comments.length,
      comments: comments,
    }).res()
  );
});
