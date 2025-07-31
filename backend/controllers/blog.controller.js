import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import codes from "../utils/codes.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// Create a new blog post

export const createBlog = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized,please login before creating Blog.",
          codes.unauthorized
        ).res()
      );
  }

  const { title } = req.body;
  if (!title) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Title is mandatory", codes.badRequest).res());
  }

  const blog = await Blog.create({
    title: title,
    author: req.user._id,
  });

  if (!blog) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Blog creation failed",
          codes.internalServerError
        ).res()
      );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Blog successfully created.", codes.ok, {
      blog: blog,
    }).res()
  );
});

/////////////////////////////////////////////////////////////

export const updateBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;
  const { title, subtitle, bio, category } = req.body;
  const file = req.file;

  let blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found.", codes.notFound).res());
  }

  const updateData = {
    title,
    subtitle,
    bio,
    category,
    author: req.user._id,
    // thumbnail: req.file.url || "",
    ...(req.file?.url && { thumbnail: req.file.url }),
  };
  blog = await Blog.findByIdAndUpdate(
    blogId,
    { $set: updateData },
    { $upsert: true, new: true }
  );
  if (!blog) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Blog updatation failed",
          codes.internalServerError
        ).res()
      );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Blog successfully updated.", codes.ok, {
      blog: blog,
    }).res()
  );
});

//////////////////////////////////////////////////////////////////////

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "firstName lastName photoUrl userName",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl userName",
      },
    });

  return res.status(codes.ok).json(
    new ApiResponse("All blogs found successfully", codes.ok, {
      blogs: blogs ?? [],
    }).res()
  );
});

///////////////////////////////////////////////////////

export const getBlog = asyncHandler(async (req, res) => {
  let blogId = req.params.blogId;
  const blog = await Blog.findById(blogId)
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "firstName lastName photoUrl userName",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl userName",
      },
    });

  return res.status(codes.ok).json(
    new ApiResponse("Blog found successfully", codes.ok, {
      blog: blog ?? {},
    }).res()
  );
});

///////////////////////////////////////////////////////

export const getPublishedBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "firstName lastName photoUrl userName" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl userName",
      },
    });

  return res.status(codes.ok).json(
    new ApiResponse("Published blogs found successfully", codes.ok, {
      blogs: blogs ?? [],
    }).res()
  );
});

////////////////////////////////////////////////////

export const togglePublishBlog = asyncHandler(async (req, res) => {
  const publish = req.query.q; // true, false
const blogId = new mongoose.Types.ObjectId(req.params.blogId);

   if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid Blog ID", codes.badRequest).res());
  }

 // Validate publish param
  if (publish !== "true" && publish !== "false") {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid publish value. Use true or false.", codes.badRequest).res());
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found.", codes.notFound).res());
  }

  // publish status based on the query paramter
  blog.isPublished = publish === "true"?true:false;
  console.log(blog)
  await blog.save();

  const statusMessage = blog.isPublished ? "Published" : "Unpublished";
  return res.status(codes.ok).json(
    new ApiResponse(`Blog is successfully ${statusMessage}`, codes.ok, {
      blog: blog,
    }).res()
  );
});

/////////////////////////

export const getOwnBlogs = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized,please login before getting your blogs.",
          codes.unauthorized
        ).res()
      );
  }

  const blogs = await Blog.find({ author: req.user._id })
    .populate({
      path: "author",
      select: "firstName lastName photoUrl userName",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl userName",
      },
    });

  return res.status(codes.ok).json(
    new ApiResponse("Your blogs are found successfully", codes.ok, {
      blogs: blogs ?? [],
    }).res()
  );
});

///////////////////////////////////////////////////////////

// Delete a blog post

export const deleteBlog = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized, please login before deleting a blog.",
          codes.unauthorized
        ).res()
      );
  }

  const blogId = req.params.id;
  const authorId = req.user._id.toString();
  // const authorId = req.user._id.toString();

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found.", codes.notFound).res());
  }

  if (blog.author.toString() !== authorId) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized to delete this blog (author mismatch).",
          codes.unauthorized
        ).res()
      );
  }

  // Delete blog
  const deleted = await Blog.findByIdAndDelete(blogId);
  // No need to check `if (!deleted)` — already fetched `blog` above

  // Delete associated comments
  await Comment.deleteMany({ postId: blogId });

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(
        "Blog and its comments successfully deleted",
        codes.ok
      ).res()
    );
});

/////////////////////////////////////////////////////////
export const likeBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;
  const likerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid blog ID", codes.badRequest).res());
  }

  let blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found", codes.notFound).res());
  }

  // Add user ID only if not already present
  blog = await Blog.updateOne(
    { _id: blogId },
    { $addToSet: { likes: likerId } }
  );

  const updatedBlog = await Blog.findById(blogId);

  return res.status(codes.ok).json(
    new ApiResponse("Blog liked successfully", codes.ok, {
      likes: updatedBlog.likes,
    }).res()
  );
});

///////////////////////////////////////////////
export const dislikeBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;
  const dislikerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid blog ID", codes.badRequest).res());
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found", codes.notFound).res());
  }

  // const alreadyLiked = blog.likes.some(
  //     (id) => id.toString() === dislikerId.toString()
  //   );

  //   if (!alreadyLiked) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "You haven't liked this blog",
  //     });
  //   }
  // Corrected logic for removing the user from likes
  blog.likes = blog.likes.filter(
    (id) => id.toString() !== dislikerId.toString()
  );
  // blog.likes.pull(dislikerId);

  await blog.save();

  return res.status(codes.ok).json(
    new ApiResponse("Blog disliked successfully", codes.ok, {
      likes: blog.likes,
    }).res()
  );
});

//////////////////////////////////

export const getMyTotalBlogLikes = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "Login required to get your own blogs with likes",
          codes.unauthorized
        ).res()
      );
  }

  const userId = req.user._id;

  // Step 1: Find blogs authored by the user and select only 'likes'
  const myBlogs = await Blog.find({ author: userId }).select("likes");

  // Safety check (optional)
  if (!myBlogs || myBlogs.length === 0) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "No blogs found for this user",
          codes.notFound
        ).res()
      );
  }

  // Step 2: Sum all likes across user's blogs
  const totalLikes = myBlogs.reduce(
    (acc, blog) => acc + (blog.likes?.length || 0),
    0
  );

  return res.status(codes.ok).json(
    new ApiResponse("Fetched total likes successfully", codes.ok, {
      totalBlogs: myBlogs.length,
      totalLikes,
    }).res()
  );
});
