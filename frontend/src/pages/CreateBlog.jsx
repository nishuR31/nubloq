import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


 

const CreateBlog = () => {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const {blog} = useSelector(store=>store.blog)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getSelectedCategory = (value) => {
        setCategory(value)
    }
    const createBlogHandler = async () => {
  try {
    setLoading(true);
    const res = await axios.post(
      `http://localhost:4000/api/v1/blog/create`,
      { title },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      } 
    );

    const createdBlog = res?.data?.payload?.blog;
    const existingBlogs = Array.isArray(blog) ? blog : [];

    if (res.data.success && createdBlog) {
      dispatch(setBlog([...existingBlogs, createdBlog]));
      navigate(`/dashboard/write-blog/${createdBlog._id}`);
      toast.success(res.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {  
    console.log(error);
    toast.error("Blog creation failed");
  } finally {
    setLoading(false);
  }
};

    return (
        <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
            <Card className="md:p-10 p-4 dark:bg-gray-800">
            <h1 className='text-2xl font-bold'>Lets create blog</h1>
            <p>Let others get insights from your knowledge and experience.</p>
            <div className='mt-10 '>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Your Blog Name" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white dark:bg-gray-700" />
                </div>
                <div className='mt-4 mb-5'>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Web Development">Web Development</SelectItem>
                                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                <SelectItem value="Blogging">Blogging</SelectItem>
                                <SelectItem value="Photography">Photography</SelectItem>
                                <SelectItem value="Cooking">Cooking</SelectItem>
                                <SelectItem value="Soft Development">Soft Development</SelectItem>
                                <SelectItem value="Gaming">Gaming</SelectItem>
                                <SelectItem value="Teaching">Teaching</SelectItem>
                                <SelectItem value="Playing">Playing</SelectItem>
                                <SelectItem value="Art">Art</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex gap-2'>
                    {/* <Button  variant="outline">Cancel</Button> */}
                    <Button className="" disabled={loading} onClick={createBlogHandler}>
                        {
                            loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"
                        }
                    </Button>
                </div>
            </div>
            </Card>
           
        </div>
    )
}

export default CreateBlog
