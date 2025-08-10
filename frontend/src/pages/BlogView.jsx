


/////////////////////////////////////////////////////////////////////////////////
// TOP OF FILE: no major changes
import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import avatarFallback from "../components/avatarFallback";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Bookmark, MessageSquare, Share2, Heart,Lock } from "lucide-react";
import CommentBox from "../components/CommentBox";
import axios from "axios";
import { setBlog } from "../redux/blogSlice";
import { toast } from "sonner";
import capitalize from "../components/capitalize";
import "../index.css";

const api = import.meta.env.VITE_URL;

const BlogView = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  const { theme } = useSelector((store) => store.theme);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogLikes, setBlogLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [book, setBook] = useState(false);

  const found = useMemo(() => blog.find((b) => b._id === blogId), [blog, blogId]);

  useEffect(() => {
    if (!blogId) {
      toast.error("Blog ID not found.");
      navigate("/error");
      return;
    }

    if (found) {
      setSelectedBlog(found);
      setBlogLikes(found?.likes?.length || 0);
      setLiked(Boolean(found?.likes?.includes(user?._id)));
      setBook(user?.bookMark?.includes(blogId) ?? false);
    } else {
      axios
        .get(`${api}/blog/${blogId}`)
        .then((res) => {
          const fetchedBlog = res.data.payload.blog;
          setSelectedBlog(fetchedBlog);
          setBlogLikes(fetchedBlog?.likes?.length || 0);
          setLiked(Boolean(fetchedBlog?.likes?.includes(user?._id)));
          setBook(user?.bookMark?.includes(blogId) ?? false);
          dispatch(setBlog((prev) => [...prev, fetchedBlog]));
          toast.success("Blog loaded.");
        })
        .catch((err) => {
          toast.error("Blog not found.");
          console.error("Fetch error:", err);
        });
    }
  }, [found]);

  const bookmarkHandler = async () => {
    if (!user) return toast.error("Please login to bookmark.");

    try {
      const res = await axios.get(`${api}/user/bookMark/${selectedBlog._id}?q=${!book}`, { withCredentials: true });
      if (res.data.success) {
        setBook(!book);
        toast.success(book ? "Removed from bookmarks" : "Bookmarked");
      } else {
        toast.error("Bookmark failed.");
      }
    } catch (error) {
      toast.error("Bookmark request failed.");
      console.error(error);
    }
  };

  const likeHandler = async () => {
    if (!user) return toast.error("Please login to like blog.");

    try {
      const res = await axios.get(`${api}/blog/${selectedBlog._id}/${liked ? "dislike" : "like"}`, {
        withCredentials: true,
      });

      const updated = res.data.payload;
      setLiked(updated?.likes?.includes(user._id));
      setBlogLikes(updated?.likes?.length ?? 0);
      toast.success(`${!liked ? "Liked" : "Disliked"} blog.`);
    } catch (err) {
      toast.error("Failed to update like.");
      console.error(err);
    }
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
        toast.success("Link copied to clipboard.");
      });
    }
  };

  const changeTimeFormat = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!selectedBlog) {
    return (
      <div className="animate-fadeIn min-h-screen pt-20 text-xl text-center text-secondary-fg flex justify-center">
        <h1>Loading blog post...</h1>
      </div>
    );
  }
  
  return !user ? <div className="animate-fadeIn min-h-screen pt-20 text-xl text-center text-secondary-fg flex justify-center transition-all animate-fadeIn pt-14">
      <div className="max-w-6xl p-10 mx-auto text-muted-fg">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/"><BreadcrumbLink>Home</BreadcrumbLink></Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/blogs"><BreadcrumbLink>Blogs</BreadcrumbLink></Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="my-8 text-app">
<h2 className="text-[var(--destructive)] m-3 bg-muted px-5 py-2 animate-bounce animate-pulse rounded-lg "> Viewing as Guest. Features and information available are limited...</h2>
          <h1 className="mb-4 text-4xl font-bold text-primary">
            {capitalize(selectedBlog?.title)}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={selectedBlog?.author?.photoUrl??`https://placehold.co/100x100?text=User`}
                  alt="Author"
                />
                <AvatarFallback>
                  {avatarFallback(selectedBlog?.author)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-primary">
                  {capitalize(selectedBlog?.author?.firstName ?? "Guest")}
                </p>
                <p className="text-sm text-muted-fg">
                  Occupation: {selectedBlog?.author?.occupation ?? "Unspecified"}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-fg">
              {selectedBlog.isPublished &&
                `Published on ${changeTimeFormat(selectedBlog?.createdAt)}`}{" "}
              • {moment(selectedBlog?.createdAt).fromNow()}
            </div>
          </div>
        </div>

        <hr className="my-5 h-0.5 text-primary rounded-xl" />

        <div className="flex justify-center mb-8">
          <img
            src={
              selectedBlog?.thumbnail ||
              `https://placehold.co/500x250/${
                theme === "light" ? "9aaaaf/000000" : "1f2937/ffffff"
              }?text=${selectedBlog?.title}`
            }
            alt="Thumbnail"
      className="w-[500px] h-[250px] object-cover rounded-xl"
          />
        </div>

        <p className="my-2 text-lg italic">{capitalize(selectedBlog?.subtitle)}</p>

        <hr className="my-5 h-0.5 text-primary rounded-xl" />


        <div className="text-card text-md">
          <div
            dangerouslySetInnerHTML={{ __html: selectedBlog?.bio.substring(0, 800) + "..." }}
          />
        
          <div className="flex justify-between flex-wrap flex-row gap-2">
            <Button
            variant="ghost"
            size="sm"
            className="flex text-secondary-fg bg-primary items-center gap-1 mt-2"
            onClick={() =>
              navigate(`/signup?redirect=/blogs/${selectedBlog?._id}`)
            }
          >
              {"Join us to view full!"} <Lock className="text-[var(--destructive)]" />
          </Button>
            
          <Button
            variant="ghost"
            size="sm"
            className="flex text-secondary-fg bg-primary items-center gap-1 mt-2"
            onClick={() =>
              navigate(`/login?redirect=/blogs/${selectedBlog?._id}`)
            }
          >
            {"Already a member?"} <Lock className="text-[var(--destructive)]" />
          </Button>
        </div>
          </div>


        <p className="text-muted-fg text-sm mt-2">{selectedBlog?.category || "General"}</p>

        <div className="mt-10 text-app">
          <div className="flex flex-wrap gap-2 mb-8">
            {(selectedBlog?.category ? [selectedBlog.category] : ["React", "Express", "MongoDB"]).map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-accent text-muted-fg">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between py-4 mb-8 border rounded-sm">
            <div className="flex items-center space-x-4">
              <Button onClick={likeHandler}  variant="ghost" size="sm" className="flex gap-1">
                  <Heart size={24} className="text-muted-fg" />
                <span>{blogLikes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-muted-fg" />
                <span>{comment.length} Comments</span>
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button onClick={bookmarkHandler} variant="ghost" size="sm">
                <Bookmark
                  size={24}
                  className={ "text-muted-fg"}
                />
              </Button>
              <Button  onClick={() => handleShare(selectedBlog._id)} variant="ghost" size="sm">
                <Share2 className="w-4 h-4 text-muted-fg" />
              </Button>
            </div>
          </div>
        </div>

        {/* <CommentBox selectedBlog={selectedBlog} /> */}
      </div>
    </div>
  
  : <div className="transition-all animate-fadeIn pt-14">
      <div className="max-w-6xl p-10 mx-auto text-muted-fg">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/"><BreadcrumbLink>Home</BreadcrumbLink></Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/blogs"><BreadcrumbLink>Blogs</BreadcrumbLink></Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="my-8 text-app">
          <h1 className="mb-4 text-4xl font-bold text-primary">
            {capitalize(selectedBlog?.title)}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={selectedBlog?.author?.photoUrl??`https://placehold.co/100x100?text=User`}
                  alt="Author"
                />
                <AvatarFallback>
                  {avatarFallback(selectedBlog?.author)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-primary">
                  {capitalize(selectedBlog?.author?.firstName ?? "Guest")}{" "}
                  {capitalize(selectedBlog?.author?.lastName ?? "")}
                </p>
                <p className="text-sm text-muted-fg">
                  Occupation: {selectedBlog?.author?.occupation ?? "Unspecified"}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-fg">
              {selectedBlog.isPublished &&
                `Published on ${changeTimeFormat(selectedBlog?.createdAt)}`}{" "}
              • {moment(selectedBlog?.createdAt).fromNow()}
            </div>
          </div>
        </div>

        <hr className="my-5 h-0.5 text-primary rounded-xl" />

        <div className="flex justify-center mb-8">
          <img
            src={
              selectedBlog?.thumbnail ||
              `https://placehold.co/500x250/${
                theme === "light" ? "9aaaaf/000000" : "1f2937/ffffff"
              }?text=${selectedBlog?.title}`
            }
            alt="Thumbnail"
      className="w-[500px] h-[250px] object-cover rounded-xl"
          />
        </div>

        <p className="my-2 text-lg italic">{capitalize(selectedBlog?.subtitle)}</p>

        <hr className="my-5 h-0.5 text-primary rounded-xl" />

        <div
          className="text-card text-md"
          dangerouslySetInnerHTML={{ __html: selectedBlog?.bio }}
        />

        <p className="text-muted-fg text-sm mt-2">{selectedBlog?.category || "General"}</p>

        <div className="mt-10 text-app">
          <div className="flex flex-wrap gap-2 mb-8">
            {(selectedBlog?.category ? [selectedBlog.category] : ["React", "Express", "MongoDB"]).map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-accent text-muted-fg">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between py-4 mb-8 border rounded-sm">
            <div className="flex items-center space-x-4">
              <Button onClick={likeHandler} variant="ghost" size="sm" className="flex gap-1">
                {liked ? (
                  <Heart size={24} className="text-red-600" />
                ) : (
                  <Heart size={24} className="text-secondary-fg" />
                )}
                <span>{blogLikes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-secondary-fg" />
                <span>{comment.length} Comments</span>
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button onClick={bookmarkHandler} variant="ghost" size="sm">
                <Bookmark
                  size={24}
                  className={book ? "text-yellow-500" : "text-secondary-fg"}
                />
              </Button>
              <Button onClick={() => handleShare(selectedBlog._id)} variant="ghost" size="sm">
                <Share2 className="w-4 h-4 text-secondary-fg" />
              </Button>
            </div>
          </div>
        </div>

        <CommentBox selectedBlog={selectedBlog} />
      </div>
    </div>
  
}

export default BlogView;
