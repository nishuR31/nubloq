import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import moment from "moment";


const BlogCard = ({blog}) => {
    const navigate = useNavigate()
    const date = new Date(blog.createdAt)
    const formattedDate = date.toLocaleString("en-GB");
    return (
        <div className="bg-gradient-to-bl from-black/20  to-black/20  filter-blur-sm dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-[102%] transition-all ease-in-out delay-3000 ">
            <p className="text-sm  mt-2">
                By {blog.author?.firstName || "Unknown"} | {blog.category} | {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')??blog.formattedDate}
            </p> 
            <img src={blog.thumbnail || `https://placehold.co/700x400?text=${blog.title}`} className=" rounded-xl mt-2 h-[150px] w-[250px] hover:scale-105 transition-all delay-3000 ease-in-out " />
            <h2 className="text-xl font-semibold capitalize mt-1 text-black dark:text-white">{blog.title}</h2>
            <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3>
                <p className={`mt-3 ${blog?.description ? 'text-inherit' : 'text-gray-600'}`}>
                {blog?.description ? blog.description.substring(0, 100) + "..." : "No description available..."}
                </p>

             <div className="mt-3 flex flex-wrap gap-2">

                {[blog.category].map((tag, index) => (
                    <span key={index} className="text-xs bg-transparent filter-blur-sm dark:border-gray-600 p-5 rounded-2xl shadow-lg border px-2 py-1 rounded-md">
                        {tag}
                    </span>
                ))}
            </div> 
            <Button onClick={()=>navigate(`${blog._id}`)} variant="secondary" className="mt-4   px-4 py-2 rounded-lg text-sm  ">
                Read More
            </Button>
        </div>
    )
}

export default BlogCard
