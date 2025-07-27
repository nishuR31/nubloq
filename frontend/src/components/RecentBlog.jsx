import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from "react-router-dom"
import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { toast } from "sonner";

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
]

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const RecentBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)

  const [email, setEmail] = useState({ email: "" })

  const handleChange = (e) => {
    setEmail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    if (!email.email) {
      return toast.error("Email is required.")
    }

    if (!emailRegex.test(email.email)) {
      return toast.error("Invalid email format!")
    }


    console.log("email:",email.email)

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/subscribe",
    { email: email.email }, // ✅ Wrap it as an object
            {headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,}
      )

      if (res.data.success) {
        toast.success("Thanks for subscribing!")
        toast.success("Check your spam folder too.")
        setEmail({ email: "" })
      } else {
        toast.error("Failed to send email.")
      }
    } catch (error) {
      console.error("Error sending email:", error?.response)
      toast.error(error?.response?.data?.message || "Something went wrong.")
    }
  }

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/blog/get-published-blogs`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setBlog(res.data.payload.blogs))
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      }
    }
    getAllPublsihedBlogs()
  }, [])

  return (
    <div className="transition-all delay-3000 ease-in-out  bg-cover bg-center bg-no-repeat bg-blog-light  pb-10">
      <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
        <h1 className='text-4xl font-bold pt-10 mt-10 text-black/80'>Recent Blogs</h1>
        <hr className='w-24 text-center border-2 border-red-500 rounded-full' />
      </div>

      <div className=' max-w-7xl mx-auto gap-6'>
        <div className='mt-10 flex flex-wrap justify-around '>
          {blog?.slice(0, 4)?.map((blog, index) => (
            <BlogCardList key={index} blog={blog} />
          ))}
        </div>

        <div className=' bg-white/10 backdrop-blur-md dark:bg-black/50 hidden md:block  w-[350px] p-5 rounded-lg mx-auto mt-10'>
          <h1 className='text-2xl font-semibold text-black dark:text-white'>Popular categories</h1>
          <div className='my-5 flex flex-wrap gap-3'>
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

          <h1 className='text-xl font-semibold text-black italic dark:text-white'>Subscribe to Newsletter</h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Get the latest posts and updates delivered straight to your inbox.
          </p>

          <div className=" flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
            <Input
              type="email"
              name="email"
              value={email.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="flex h-9 w-full rounded-md border bg-gray-300 dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
            />
            <Button variant="ghost" onClick={handleSubmit}>Subscribe</Button>
          </div>

          <div className='mt-7'>
            <h2 className="text-xl font-semibold mb-3">Suggested Blogs</h2>
            <ul className="space-y-3">
              {[
                '10 Tips to Master React',
                'Understanding Tailwind CSS',
                'Improve SEO in 2024',
              ].map((title, idx) => (
                <li
                  key={idx}
                  className="text-sm dark:text-gray-100 hover:underline cursor-pointer"
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentBlog
