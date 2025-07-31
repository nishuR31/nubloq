import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      // required: true
      default: "",
    },
    bio: {
      type: String,
      // required:true
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      default:""
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

let Blog = mongoose.model("Blog", blogSchema);

export default Blog;
