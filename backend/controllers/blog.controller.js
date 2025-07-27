import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import codes from "../utils/codes.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";

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

  const { title, category } = req.body;
  if (!title || !category) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("All fields are mandatory", codes.badRequest).res()
      );
  }

  const blog = await Blog.create({
    title,
    category,
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

  return res
    .status(codes.ok)
    .json(new ApiResponse("Blog successfully created.", codes.ok,{blog:blog}).res());
});

/////////////////////////////////////////////////////////////

export const updateBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;
  const { title, subtitle, description, category } = req.body;
  const file = req.file;

  let blog = await Blog.findById(blogId).populate("author");
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found.", codes.notFound).res());
  }

  let thumbnail;
  if (file) {
    const fileUri = getDataUri(file);
    thumbnail = await cloudinary.uploader.upload(fileUri);
  }

  const updateData = {
    title,
    subtitle,
    description,
    category,
    author: req.user._id,
    thumbnail: thumbnail?.secure_url,
  };
  blog = await Blog.findByIdAndUpdate(
    blogId,
    { $set: updateData },
    { $upsert: true },
    { new: true }
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

  return res
    .status(codes.ok)
    .json(new ApiResponse("Blog successfully updated.", codes.ok,{blog:blog}).res());
});

//////////////////////////////////////////////////////////////////////

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "firstName lastName photoUrl",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl",
      },
    });
  if (!blogs) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Blogs are not found.",
          codes.internalServerError
        ).res()
      );
  }

  return res.status(codes.ok).json(
    new ApiResponse("All blogs found successfully", codes.ok, {
      blogs: blogs,
    }).res()
  );
});

///////////////////////////////////////////////////////

export const getPublishedBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "firstName lastName photoUrl" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl",
      },
    });
  if (!blogs) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("Published blogs not found.", codes.notFound).res()
      );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Published blogs found successfully", codes.ok, {
      blogs: blogs,
    }).res()
  );
});

////////////////////////////////////////////////////

export const togglePublishBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { publish } = req.query; // true, false
  console.log(req.query);

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found.", codes.notFound).res());
  }

  // publish status based on the query paramter
  blog.isPublished = !blog.isPublished;
  await blog.save();

  const statusMessage = blog.isPublished ? "Published" : "Unpublished";
  return res
    .status(codes.ok)
    .json(new ApiResponse(`Blog is ${statusMessage}`, codes.ok,{blog:blog}).res());
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
      select: "firstName lastName photoUrl",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl",
      },
    });

  if (!blogs) {
    return res.status(codes.notFound).json(
      new ApiErrorResponse("Your blogs are not found", codes.notFound, {
        blogs: [],
      }).res()
    );
  }

  return res.status(codes.ok).json(
    new ApiResponse("Your blogs are found successfully", codes.ok, {
      blogs: blogs,
    }).res()
  );
});

///////////////////////////////////////////////////////////

// Delete a blog post
export const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const authorId = req.user._id;
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized,please login before deleting a blog.",
          codes.unauthorized
        ).res()
      );
  }

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
          "User not authorized to delete the blog, Users mismatch",
          codes.unauthorized
        ).res()
      );
  }

  // Delete blog
 let deleted= await Blog.findByIdAndDelete(blogId);
   if (!deleted) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Error deleting blog.",
          codes.internalServerError
        ).res()
      );
  }

  // Delete related comments
  let commented=await Comment.deleteMany({ postId: blogId });
  if (!commented) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Error deleting comments.",
          codes.internalServerError
        ).res()
      );
  }



  return res
    .status(codes.ok)
    .json(new ApiResponse("Blog successfully deleted", codes.ok).res());
});

///////////////////////////////////////////////////////

export const likeBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const liker = req.user.id;
  const blog = await Blog.findById(blogId).populate({ path: "likes" });
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("Blog not found to like.", codes.notFound).res()
      );
  }

  // Check if user already liked the blog
  const alreadyLiked = blog.likes.includes(liker);
  if (alreadyLiked) {
    return res.status(codes.conflict).json(
      new ApiErrorResponse("Blog already liked.", codes.conflict, {
        Blog: blog,
      }).res()
    );
  }

  //like logic started
  await blog.updateOne({ $addToSet: { likes: liker } });
  await blog.save();

  return res.status(codes.ok).json(
    new ApiResponse("Blog liked successfully", codes.ok, {
      blog: blog,
    }).res()
  );
});

///////////////////////////////////////////////

export const dislikeBlog = asyncHandler(async (req, res) => {
  const liker = req.user.id;
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Blog not found", codes.notFound).res());
  }

  //dislike logic started
  await blog.updateOne({ $pull: { likes: liker } });
  await blog.save();

  return res
    .status(codes.ok)
    .json(new ApiResponse("Blog disliked successfully", codes.ok,{blog:blog}).res());
});

//////////////////////////////////

export const getMyTotalBlogLikes = asyncHandler(async (req, res) => {
  const userId = req.user.id; // assuming you use authentication middleware

  // Step 1: Find all blogs authored by the logged-in user
  const myBlogs = await Blog.find({ author: userId }).select("likes");

  // Step 2: Sum up the total likes
  const totalLikes = myBlogs.reduce(
    (acc, blog) => acc + (blog.likes?.length || 0),
    0
  );

  if (!myBlogs) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("Your liked blogs not found", codes.notFound).res()
      );
  }
  return res.status(codes.ok).json(
    new ApiResponse("Your liked blogs ok successfully", codes.ok, {
      totalBlogs: myBlogs.length,
      totalLikes: totalLikes,
    }).res()
  );
});
