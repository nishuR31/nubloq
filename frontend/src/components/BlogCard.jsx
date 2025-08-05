import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../index.css";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleString("en-GB");
  return (
    <div className="bg-transparent border-sidebar backdrop-blur-md p-5 rounded-2xl shadow-lg border-2 hover:scale-[102%] transition-all ease-in-out delay-[2s] ">
      <div className="flex flex-row flex-wrap justify-between mt-2 ">
        <p className="text-sm text-app">
          By {blog.author?.userName ?? blog.author?.firstName ?? "Unknown"}
        </p>
        <p className="text-sm text-muted-fg ">
          {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a") ??
            formattedDate}
        </p>{" "}
      </div>
      <img
        src={
          blog?.thumbnail || `https://placehold.co/700x400?text=${blog.title}`
        }
        className=" rounded-xl mt-2 h-[150px] w-[250px] hover:scale-105"
      />
      <h2 className="mt-1 text-xl font-semibold text-primary capitalize ">
        {blog.title}
      </h2>
      <h3 className="mt-1 text-muted-fg">{blog.subtitle}</h3>

      <p
        className={`overflow-hidden mt-3 ${
          blog?.bio ? "text-inherit text-app" : "text-muted-fg"
        }`}
        dangerouslySetInnerHTML={{
          __html: blog?.bio
            ? blog.bio.substring(0, 100) + "..."
            : "No description available...",
        }}
      ></p>
      <div className="flex flex-wrap gap-2 mt-3">
        {/* {[blog.category].map((tag, index) => ( */}
        <span
          key={""}
          className="p-5 px-2 py-1 text-xs bg-transparent border border-input text-muted-fg shadow-lg filter-blur-sm  rounded-2xl "
        >
          {blog?.category ?? "Unspecified"}
        </span>
        {/* ))} */}
      </div>
      <Button
        onClick={() => navigate(`${blog._id}`)}
        variant="secondary"
        className="px-4 py-2 mt-4 text-sm rounded-lg bg-primary text-primary-fg "
      >
        Read More
      </Button>
    </div>
  );
};

export default BlogCard;
