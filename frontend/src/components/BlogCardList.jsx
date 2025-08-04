import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import "../index.css";

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB");
  return (
    <div className="flex-col p-5 mt-6 transition-all ease-in-out bg-transparent border shadow-lg max-w-flex max-w-100 backdrop-blur-md dark:text-gray-800 dark:border-gray-600 md:flex-row md:gap-10 rounded-2xl delay-3000">
      <div >
        <img
          src={
            blog.thumbnail ||
            `https://placehold.co/200x150?text=${blog?.title}&font=playfair-display`
          }
          className=" rounded-4xl mt-2 h-[150px] min-w-fit hover:scale-105  transition-all delay-3000 ease-in-out"
        />

        <p className="mt-2 text-xs text-white dark:text-black">
          {/* By {"Unknown"} | {blog.category} | {formattedDate} */}
          By {blog.author?.userName ??
            blog.author.firstName ??
            "Unknown"} | {blog.category ?? "Unspecified"} | {formattedDate}
        </p>
      </div>
      <div>
        <h2 className="mt-3 text-2xl font-semibold text-white dark:text-gray-300 md:mt-1">
          {blog.title}
        </h2>
        <h3 className="mt-1 text-gray-400 dark:text-gray-400 ">
          {blog.subtitle}
        </h3>

        <h4
          className={`overflow-hidden mt-3 ${
            blog?.bio ? "text-inherit" : "text-gray-600"
          }`}
          dangerouslySetInnerHTML={{
            __html: blog?.bio
              ? blog.bio.substring(0, 100) + "..."
              : "No description available...",
          }}
        ></h4>

        {/* ///////////////////////////////////// */}
        <Button
          onClick={() => navigate(`blogs/${blog._id}`)}
          className="px-4 py-2 mt-4 text-sm rounded-lg "
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default BlogCardList;
