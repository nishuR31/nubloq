import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleString("en-GB");
  return (
    <div className="bg-transparent backdrop-blur-md dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-[102%] transition-all ease-in-out delay-3000 ">
      <div className=" flex justify-between flex-row flex-wrap mt-2">
        <p className="text-sm">
          By {blog.author?.userName ?? blog.author?.firstName ?? "Unknown"}
        </p>
        <p className="text-sm ">
          {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a") ??
            formattedDate}
        </p>{" "}
      </div>
      <img
        src={
          blog?.thumbnail || `https://placehold.co/700x400?text=${blog.title}`
        }
        className=" rounded-xl mt-2 h-[150px] w-[250px] hover:scale-105 transition-all delay-3000 ease-in-out "
      />
      <h2 className="text-xl font-semibold capitalize mt-1 text-black dark:text-white">
        {blog.title}
      </h2>
      <h3 className="text-gray-500 dark:text-gray-400 mt-1">{blog.subtitle}</h3>
      <p
        className={` overflow-hidden mt-3 ${
          blog?.bio ? "text-inherit" : "text-gray-600"
        }`}
      >
        {blog?.bio
          ? blog.bio.substring(0, 100) + "..."
          : "No description available..."}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {/* {[blog.category].map((tag, index) => ( */}
        <span
          key={""}
          className="text-xs bg-transparent filter-blur-sm dark:border-gray-600 p-5 rounded-2xl shadow-lg border px-2 py-1 "
        >
          {blog?.category ?? "Unspecified"}
        </span>
        {/* ))} */}
      </div>
      <Button
        onClick={() => navigate(`${blog._id}`)}
        variant="secondary"
        className="mt-4   px-4 py-2 rounded-lg text-sm  "
      >
        Read More
      </Button>
    </div>
  );
};

export default BlogCard;
