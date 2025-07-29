/////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
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
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import CommentBox from '@/components/CommentBox';
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { toast } from "sonner";
// import { useForceUpdate } from "framer-motion";

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

  useEffect(() => {
    const found = blog.find((b) => b._id === blogId);

    if (found) {
      setSelectedBlog(found);
      setBlogLikes(found.likes.length);
      setLiked(Boolean(found.likes.includes(user._id)));
    } else {
      axios
        .get(`http://localhost:4000/api/v1/blog/${blogId}`, {
          withCredentials: true,
        })
        .then((res) => {
          const fetchedBlog = res.data.payload.blog;
          toast.success("One Blog fetched.");
          console.log("One Blog fetched.");
          setSelectedBlog(fetchedBlog);
          setBlogLikes(fetchedBlog.likes.length);
          setLiked(Boolean(fetchedBlog.likes.includes(user?._id)));
          dispatch(setBlog([...blog, fetchedBlog]));
        })
        .catch((err) => {
          toast.error("Blog not found.");
          console.error("Error fetching blog by ID:", err);
        });
    }
  }, [blog, blogId, user?._id, dispatch]);

  const likeHandler = async () => {
    if (!user) {
      toast.error("Please login to like the blog");
      console.error("Please login to like the blog");
      return;
    }

    console.log("liked before fetch: ", liked);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/blog/${selectedBlog._id}/${
          liked ? "dislike" : "like"
        }`,
        { withCredentials: true }
      );
      console.log("liked after fetch: ", !liked);

      const updatedBlog = response.data.payload;
      setLiked(Boolean(updatedBlog.likes.includes(user._id)));
      setBlogLikes(updatedBlog.likes.length);
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
      <div className="pt-20 text-xl font-semibold text-center">
        Loading blog post...
      </div>
    );
  }

  return (
    <div className="pt-14 transition-all delay-3000 ease-in-out ">
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
            {selectedBlog?.title}
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
                <p className="font-medium">
                  {selectedBlog?.author?.firstName}{" "}
                  {selectedBlog?.author?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedBlog?.author?.occupation}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Published on {changeTimeFormat(selectedBlog?.createdAt)} •{" "}
              {moment(selectedBlog?.createdAt).fromNow()}
            </div>
          </div>
        </div>

        {/* Thumbnail & Subtitle */}
        <div className="mb-8 overflow-hidden justify-center flex rounded-lg">
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
          <p className="mt-2 text-sm italic text-muted-foreground">
            {selectedBlog?.subtitle}
          </p>
        </div>

        {/* Blog Content */}
        <p dangerouslySetInnerHTML={{ __html: selectedBlog?.description }} />

        {/* Tags and Reactions */}
        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {(selectedBlog?.tags?.length
              ? selectedBlog.tags
              : ["React", "Express", "MongoDB"]
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
                  <FaHeart size={24} className="text-red-600 cursor-pointer" />
                ) : (
                  <FaRegHeart
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
