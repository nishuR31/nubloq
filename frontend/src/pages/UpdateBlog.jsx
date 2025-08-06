import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import "../index.css";

import { Label } from "../components/ui/label";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlog } from "../redux/blogSlice";

let api = import.meta.env.VITE_URL;

const UpdateBlog = () => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);
  // const params = useParams();
  // const id = params.blogId;
  const { blogId } = useParams(); // not `id`!
  let id = blogId;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const selectBlog = blog.find((b) => b._id === id);

  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    bio: "",
    category: "",
    thumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  useEffect(() => {
    if (selectBlog) {
      setBlogData({
        title: selectBlog.title || "",
        subtitle: selectBlog.subtitle || "",
        bio: selectBlog.bio || "",
        category: selectBlog.category || "",
        thumbnail: selectBlog.thumbnail || "",
      });
      setPreviewThumbnail(selectBlog.thumbnail || "");
    } else {
      toast.error("Blog not found");
      navigate("/dashboard/your-blog");
    }
  }, [selectBlog, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("bio", blogData.bio);
    formData.append("category", blogData.category);
    console.log("Sending data:", blogData, formData);
    if (blogData.thumbnail) {
      formData.append("file", blogData.thumbnail);
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        `${api}/blog/${id}`,
        // `http://localhost:4000/api/v1/blog/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setBlog((prev) =>
            prev.map((b) => (b._id === id ? res.data.payload.blog : b))
          )
        );
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong");
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    try {
      const res = await axios.get(
        `${api}/blog/${id}/publish?q=${action}`
        // `http://localhost:4000/api/v1/blog/${id}/publish?q=${action}`
      );
      if (res.data.success) {
        setPublish(!publish);
        toast.success(res.data.message);
        navigate(`/dashboard/your-blog`);
      } else {
        toast.error("Failed to update publish state.");
        console.error("Failed to update publish state.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `${api}/blog/delete/${id}`,
        // `http://localhost:4000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedBlogs = blog.filter((b) => b._id !== id);
        dispatch(setBlog(updatedBlogs));
        toast.success(res.data.message);
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      console.log("error: ", error);
    }
  };

  // Loading fallback if blog data isn't ready
  if (!selectBlog)
    return <div className="py-20 text-center">Loading blog...</div>;

  return (
    <div className="animate-fadeIn pb-10 px-3 pt-20 md:ml-[320px] bg-transparent">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 bg-transparent text-secondary-fg">
          <h1 className="text-4xl font-bold text-app">Basic Blog Information</h1>
          <p className="text-muted">
            Make changes to your blogs here. Click publish when you're done.
          </p>

          <div className="space-x-2">
            <Button className="bg-primary text-secondary-fg"
              onClick={() =>
                togglePublishUnpublish(
                  selectBlog?.isPublished ? "false" : "true"
                )
              }
            >
              {selectBlog?.isPublished ? "UnPublish" : "Publish"}
            </Button>
            <Button variant="destructive" onClick={deleteBlog} className="text-destructive bg-destructive">
              Remove Blog
            </Button>
          </div>

          <div className="pt-10">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={blogData.title}
              onChange={handleChange}
              className="text-accent"
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              placeholder="Enter a subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              className="text-accent"
            />
          </div>

          <div>
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              value={blogData.bio}
              onChange={(newContent) =>
                setBlogData((prev) => ({ ...prev, bio: newContent }))
              }
              onBlur={(e) => {
                const content = editor.current?.value || e.current.value || "";
                setBlogData((prev) => ({ ...prev, bio: content }));
              }}
              className="jodit_toolbar text-accent bg-app"
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={blogData.category} onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category bg-primary text-secondary-fg" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {[
                    "Uncategorized",
                    "Web Development",
                    "Digital Marketing",
                    "Blogging",
                    "Photography",
                    "Cooking",
                    "Soft Development",
                    "Gaming",
                    "Teaching",
                    "Playing",
                    "Art",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Thumbnail</Label>
            <Input
              id="file"
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="bg-transparent w-fit text-accent"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Blog Thumbnail"
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button className=" text-secondary-fg"  variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button className="bg-primary text-secondary-fg" disabled={loading} onClick={updateBlogHandler}>
              {loading ? "Please Wait..." : "Save"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
