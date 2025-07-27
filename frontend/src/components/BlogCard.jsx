import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog}) => {
    const navigate = useNavigate()
    const date = new Date(blog.createdAt)
    const formattedDate = date.toLocaleString("en-GB");
    return (
        <div className="bg-transparent filter-blur-sm dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all">
            <p className="text-sm  mt-2">
                By {blog.author.firstName} | {blog.category} | {formattedDate}
            </p>
            <h2 className="text-xl font-semibold capitalize mt-1 text-white">{blog.title}</h2>
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
            <Button onClick={()=>navigate(`/blogs/${blog._id}`)} variant="secondary" className="mt-4   px-4 py-2 rounded-lg text-sm ">
                Read More
            </Button>
        </div>
    )
}

export default BlogCard
