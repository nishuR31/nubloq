import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { setBlog } from "../redux/blogSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import img from "../assets/keyboard.jpg";
import img1 from "../assets/laptopWrite.jpg";
import img2 from "../assets/LMS.png";
import img3 from "../assets/pen.jpg";
import img4 from "../assets/svg.png";
import img5 from "../assets/svg2.png";
import img6 from "../assets/typingLaptop2.avif";
import img7 from "../assets/typingLaptop.avif";
const api = import.meta.env.VITE_URL;
import "../index.css";


// console.log(api)

const CreateBlog = () => {
  let imgArr = [img, img1, img2, img3, img4, img5, img6, img7];
  let [imgs, setImgs] = useState(imgArr[0]);
  useEffect(() => {
    let i = 1;
    let interval = setInterval(() => {
      setImgs(imgArr[i % imgArr.length]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const { blog } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  // console.log(title,`${api}/blog/create`)
  const createBlogHandler = async () => {
    try {
      setLoading(true);
      // `http://localhost:4000/api/v1/blog/create`,
      const res = await axios.post(
        `${api}/blog/create`,
        {title:title} ,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const createdBlog = res?.data?.payload?.blog;
      const existingBlogs = Array.isArray(blog) ? blog : [];

      if (res.data.success) {
        dispatch(setBlog([...existingBlogs, createdBlog]));
        navigate(`/dashboard/write-blog/${createdBlog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn flex justify-center p-4 pt-20 bg-transparent  backdrop-blur-sm">
      <Card className="p-4 bg-transparent md:p-10 m-2 w-full max-w-4xl ">
        <h1 className="text-2xl font-bold text-secondary-fg ">Lets create blog</h1>
        <p className="text-muted-fg">Let others get insights from your knowledge and experience.</p>
        <p className="text-muted-fg">Start on with a title and later moving to editor. </p>
        <div className="mt-10 ">
          <div>
            <Label className="text-secondary-fg ">Title</Label>
            <Input
              type="text"
              placeholder="Your Blog Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-accent-fg"
            />
          </div>
          {/* <div className="mt-4 mb-5">
            <Label>Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                  <SelectItem value="Soft Development">
                    Soft Development
                  </SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Teaching">Teaching</SelectItem>
                  <SelectItem value="Playing">Playing</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
          <div className="flex items-center justify-center gap-2 mt-3 align-center">
            <Link to="/">
              <Button variant="outline" className="text-secondary-fg ">Cancel</Button>
            </Link>
            <Button className="text-secondary-fg bg-primary" disabled={loading} onClick={createBlogHandler}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin text-secondary-fg  " />
                  Please wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        <div className="mt-8 h-[400px] flex justify-center">
          <img
            src={imgs}
            alt="preview"
            className="rounded-lg object-cover hidden lg:block w-full overflow-hidden max-h-sm max-w-md h-auto"
          />
        </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
