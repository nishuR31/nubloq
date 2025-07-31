import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setYourBlog } from "@/redux/blogSlice";
import { toast } from "sonner";



const TotalProperty = () => {
  const { blog } = useSelector((store) => store.blog);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const dispatch = useDispatch();

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/blog/get-own-blogs`,
        { withCredentials: true }
      );
      const foundBlog = res?.data?.payload?.blogs;
      const existingBlogs = Array.isArray(foundBlog) ? foundBlog : [];

      if (res.data.success && foundBlog) {
        dispatch(setYourBlog([...existingBlogs, foundBlog]));
        setTotalBlogs(res.data.payload.blogs.length);
      }
    } catch (error) {
      console.error(error.res?.data?.message);
      toast.error(error.res?.data?.message);
    }
  };
  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/comment/my-blogs/comments`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setTotalComments(res.data.payload.totalComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalLikes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/blog/my-blogs/likes`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setTotalLikes(res.data.payload.totalLikes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOwnBlog();
    getTotalComments();
    getTotalLikes();
  }, []);

  const stats = [
    {
      title: "Total Views",
      value: "24.8K",
      // icon: eye-closed,
      icon: Eye,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Blogs",
      value: totalBlogs,
      // value: blog,
      icon: BarChart3,
      change: "+4%",
      trend: "up",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageSquare,
      change: "-18%",
      trend: "down",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: ThumbsUp,
      change: "+1%",
      trend: "up",
    },
  ];
  return (
    <div className=" bg-[#D0D0DD] dark:bg-gray-700  md:p-10 p-4">
      <div className="flex flex-col md:flex-row justify-around gap-3 md:gap-7">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="w-full dark:bg-gray-800 bg-gray-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {/* <stat.icon className="h-4 w-4 text-muted-foreground" onClick={()=>{}} /> */}
              <stat.icon className="h-4 w-4 text-muted-foreground"  />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TotalProperty;
