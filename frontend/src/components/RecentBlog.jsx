import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { setBlog } from "../redux/blogSlice";
import axios from "axios";
import { toast } from "sonner";
import "../index.css";







const api = import.meta.env.VITE_URL;

const tags = [
  { category: "Blogging" },
  { category: "Web Development" },
  { category: "Digital Marketing" },
  { category: "Cooking" },
  { category: "Photography" },
  { category: "Sports" },
  { category: "Gaming" },
  { category: "Art" },
  { category: "Playing" },
  { category: "Music" },
  { category: "Developing" },
  { category: "Studying" },
];

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RecentBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  console.log("Redux blog state is:", blog);

  const [email, setEmail] = useState({ email: "" });

  const handleChange = (e) => {
    setEmail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!email.email) {
      return toast.error("Email is required.");
    }

    if (!emailRegex.test(email.email)) {
      return toast.error("Invalid email format!");
    }

    console.log("email:", email.email);

    try {
      const res = await axios.post(
        // "http://localhost:4000/api/v1/user/subscribe",
        `${api}/user/subscribe`,
        { email: email.email }, // ✅ Wrap it as an object
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Thanks for subscribing!");
        const con = await axios.post(
          `${api}/user/confirmation`,
          { email: email.email }, // ✅ Wrap it as an object
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (con.data.success) toast.success("Check your spam folder too.");
        setEmail({ email: "" });
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error?.response);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        // const res = await axios.get(`http://localhost:4000/api/v1/blog/get-published-blogs`, {
        const res = await axios.get(`${api}/blog/get-published-blogs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setBlog(res.data.payload.blogs));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    getAllPublsihedBlogs();
  }, []);

  return (
    <div className="pb-10 transition-all ease-in-out bg-transparent delay-3000 animate-slideInLeft">
      {/*     <div className="pb-10 transition-all ease-in-out bg-center bg-no-repeat bg-cover delay-3000 bg-blog-light"> */}
      <div className="flex flex-col items-center max-w-6xl mx-auto space-y-4">
        <h1 className="pt-10 mt-10 text-4xl font-bold text-black dark:text-white">
          Recent Blogs
        </h1>
        <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
      </div>

      <div className="gap-6 mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-around mt-10 ">
          {Array.isArray(blog) &&
            blog
              ?.slice(0, 4)
              ?.map((oneblog, index) => (
                <BlogCardList key={index} blog={oneblog} />
              ))}
        </div>

        <div className=" bg-white/10 backdrop-blur-md dark:bg-black/50 hidden md:block  w-[350px] p-5 rounded-lg mx-auto mt-20">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Popular categories
          </h1>
          <div className="flex flex-wrap gap-3 my-5">
            {tags.map((item, index) => (
              <Badge
                onClick={() => navigate(`/search?q=${item.category}`)}
                key={index}
                className="cursor-pointer"
              >
                {item.category}
              </Badge>
            ))}
          </div>

          <h1 className="text-xl italic font-semibold text-black dark:text-white">
            Subscribe to Newsletter
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get the latest posts and updates delivered straight to your inbox.
          </p>

          <div className="flex flex-col max-w-md gap-2 mx-auto mt-5 sm:flex-row">
            <Input
              type="email"
              name="email"
              value={email.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="flex w-full px-3 py-2 text-sm text-gray-800 bg-gray-300 border rounded-md h-9 dark:bg-gray-900 dark:text-gray-200"
            />
            <Button variant="ghost" onClick={handleSubmit}>
              Subscribe
            </Button>
          </div>

          <div className="mt-7">
            <h2 className="mb-3 text-xl font-semibold">Suggested Blogs</h2>
            <ul className="space-y-3">
              {[
                "10 Tips to Master React",
                "Understanding Tailwind CSS",
                "Improve SEO in 2024",
              ].map((title, idx) => (
                <li
                  key={idx}
                  className="text-sm cursor-pointer dark:text-gray-100 hover:underline"
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
