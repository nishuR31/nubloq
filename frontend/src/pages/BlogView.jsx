/////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState,useMemo  } from "react";
import moment from "moment";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarFallback from "@/components/avatarFallback";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MessageSquare, Share2, Heart } from "lucide-react";
// import CommentBox from '@/components/CommentBox';
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { toast } from "sonner";
// import { useForceUpdate } from "framer-motion";
import capitalize from "../components/capitalize";
const api = import.meta.env.VITE_URL;



const BlogView = () => {
  const { blogId } = useParams();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogLikes, setBlogLikes] = useState(0); //num
  const [liked, setLiked] = useState(false);


//   const found = blog.find((b) => b._id === blogId);
// useEffect(() => {

//   if (found) {
//     setSelectedBlog(found);
//     setBlogLikes(found.likes.length);
//     setLiked(Boolean(found.likes.includes(user?._id)));
//   } else {
//     axios
//       .get(`http://localhost:4000/api/v1/blog/${blogId}`)
//       .then((res) => {
//         const fetchedBlog = res.data.payload.blog;
//         toast.success("One Blog fetched.");
//         setSelectedBlog(fetchedBlog);
//         setBlogLikes(fetchedBlog.likes.length);
//         setLiked(Boolean(fetchedBlog.likes.includes(user?._id)));
//         dispatch(setBlog((prev) => [...prev, fetchedBlog])); // ✅ use callback
//       })
//       .catch((err) => {
//         toast.error("Blog not found.");
//         console.error("Error fetching blog by ID:", err);
//       });
//   }
// }, []);

const found = useMemo(() => blog.find((b) => b._id === blogId), [blog, blogId]);

useEffect(() => {
  if (found) {
    setSelectedBlog(found);
    setBlogLikes(found.likes.length);
    setLiked(Boolean(found.likes.includes(user?._id)));
  } else {
    axios
      .get(`${api}/blog/${blogId}`)
      // .get(`http://localhost:4000/api/v1/blog/${blogId}`)
      .then((res) => {
        const fetchedBlog = res.data.payload.blog;
        toast.success("One Blog fetched.");
        setSelectedBlog(fetchedBlog);
        setBlogLikes(fetchedBlog.likes.length);
        setLiked(Boolean(fetchedBlog.likes.includes(user?._id)));
        dispatch(setBlog((prev) => [...prev, fetchedBlog]));
      })
      .catch((err) => {
        toast.error("Blog not found.");
        console.error("Error fetching blog by ID:", err);
      });
  }
}, [found]); 
// only rerun if `found` changes


  const likeHandler = async () => {
    if (!user) {
      toast.error("Please login to like the blog");
      console.error("Please login to like the blog");
      return; 
    }

    try {
      const response = await axios.get(
        // `http://localhost:4000/api/v1/blog/${selectedBlog._id}/${
        `${api}/blog/${selectedBlog._id}/${
          liked ? "dislike" : "like"
        }`,
        { withCredentials: true }
      );

      const updatedBlog = response.data.payload;
      setLiked(Boolean(updatedBlog.likes.includes(user._id)));
      setBlogLikes(updatedBlog.likes.length);
      toast.success(`${!liked?"Liked":"Disliked"} blog.`); //////////////////////

    } catch (err) {
      toast.error("Failed to like/dislike blog.");
      console.error("Like handler error:", err);
    }
  };

  const changeTimeFormat = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this blog!",
          text: "Read this amazing blog post.",
          url: blogUrl,
        })
        .then(() => toast.success("Shared successfully."))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard!");
      });
    }
  };

  if (!selectedBlog) {
    return (
      <div className="pt-20 text-xl font-semibold text-center transition-all ease-in animate-slideInLeft delay-3000">
        Loading blog post...
      </div>
    );
  }

  return (
    <div className="transition-all ease-in animate-slideInLeft pt-14 delay-3000 ">
      <div className="max-w-6xl p-10 mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/blogs">
                <BreadcrumbLink>Blogs</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title & Author Info */}
        <div className="my-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {capitalize(selectedBlog?.title)}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={selectedBlog?.author?.photoUrl}
                  alt="Author"
                />
                <AvatarFallback>
                  {avatarFallback(selectedBlog?.author)}
                </AvatarFallback>
              </Avatar>
              <div>
                {selectedBlog?.author && (<p className="font-medium">
                  {capitalize(selectedBlog?.author?.firstName)}{" "}
                  {capitalize(selectedBlog?.author?.lastName)}
                </p>)}
                <p className="text-sm text-muted-foreground">
                  Occupation : {selectedBlog?.author?.occupation ?? "Unspecified"}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedBlog.isPublished &&
                `Published on ${changeTimeFormat(
                  selectedBlog?.createdAt
                )}`}{" "}
              • {moment(selectedBlog?.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <hr className="w-full my-5 h-0.5 dark:from-gray-800 dark:via-white dark:to-gray-800  bg-gradient-to-l from-gray-200 via-black to-gray-200 rounded-xl"/>

        {/* Thumbnail & Subtitle */}
        <div className="flex justify-center mb-8 overflow-hidden rounded-lg">
          <img
            src={
              selectedBlog?.thumbnail ||
              `https://placehold.co/500x250/${
                theme === "light" ? "9aaaaf/000000" : "1f2937/ffffff"
              }?text=${selectedBlog?.title}&font=playfair-display`
            }
            alt="Featured"
            width={500}
            height={250}
            className="w-cover rounded-xl"
          />
        </div>

        {/* Blog Content */}
        <p className="my-2 text-lg italic text-muted-foreground">
          {capitalize(selectedBlog?.subtitle)}
        </p>
        <hr className="w-full my-5 h-0.5 dark:from-gray-800 dark:via-white dark:to-gray-800  bg-gradient-to-l from-gray-200 via-black to-gray-200 rounded-xl"/>
        <p dangerouslySetInnerHTML={{ __html: selectedBlog?.bio }} />
        <p>{selectedBlog?.category || "category" } </p>

        {/* Tags and Reactions */}
        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {(selectedBlog?.category
              ? [selectedBlog.category]
              : ["React", "Express", "MongoDB", "Blogging"]
            ).map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between py-4 mb-8 border-gray-300 border-y dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <Button
                onClick={likeHandler}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                {liked ? (
                  <Heart size={24} className="text-red-600 cursor-pointer" />
                ) : (
                    <Heart
                    size={24}
                    className="text-white cursor-pointer hover:text-gray-600"
                  />
                )}
                <span>{blogLikes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{comment.length} Comments</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
                size="sm"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* <CommentBox selectedBlog={selectedBlog} /> */}
      </div>
    </div>
  );
};

export default BlogView;

///current: new user add karo, forgotpass, like system, comment
