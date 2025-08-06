import BlogCard from "../components/BlogCard";
import React, { useEffect } from "react";
// import LMS from "../assets/LMS.png"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/blogSlice";
import blogs from "../data/blogs.json";
const api = import.meta.env.VITE_URL;
import "../index.css";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const res = await axios.get(`${api}/blog/get-all-blogs`, {
          withCredentials: true,
        });
        // const res = await axios.get(`http://localhost:4000/api/v1/blog/get-all-blogs`, { withCredentials: true });

        const fetchedBlogs = res.data?.payload?.blogs || [];

        // Combine static + fetched blogs
        dispatch(setBlog([...fetchedBlogs]));
      } catch (error) {
        console.log("Error fetching blogs:", error);
        // Fallback to static if API fails
      }
    };

    getAllBlogs();
  }, [dispatch]);

  return (
    <div className="animate-fadeIn pt-16 transition-all ease-in-out bg-transparent  delay-[2s]">
      <div className="flex flex-col items-center max-w-6xl mx-auto space-y-4 text-center">
        <h1 className="pt-10 text-4xl font-bold text-center text-app animate-bounce">
          Our Blogs
        </h1>
        <hr className="w-24 text-center border-2 border-[var(--primary)] rounded-full " />
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 mx-auto md:grid-cols-3 md:px-0 ">
        {blogs?.map((oneblog, index) => (
          <BlogCard blog={oneblog} key={index} />
        ))}
        {blog?.map((oneblog, index) => (
          <BlogCard blog={oneblog} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Blog;

/////////////////////////////////////////////css
