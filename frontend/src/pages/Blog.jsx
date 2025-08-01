import BlogCard from '@/components/BlogCard'
import React, { useEffect } from 'react'
import LMS from "../assets/LMS.png"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'

const api = import.meta.env.VITE_URL;


export const blogJson = [
    {
        "id": 1,
        "title": "The Ultimate Guide to Digital Marketing in 2025",
        "author": "Nishan Rajak",
        "formattedDate": "2025-03-27",
        "bio": "Digital marketing is constantly evolving...",
        "tags": ["digital marketing", "SEO", "social media", "PPC"],
        "category": "Marketing",
        "thumbnail": "https://placehold.co/700x400?text=Marketing"
    },
    {
        "id": 2,
        "title": "Building a Full-Stack LMS with MERN Stack",
        "author": "Aman Kumar",
        "formattedDate": "2025-03-27",
        "bio": "A step-by-step guide to building an LMS...",
        "tags": ["MERN stack", "LMS", "React", "Node.js"],
        "category": "Web Development",
        "thumbnail": "https://placehold.co/700x400?text=Web+Dev"
    },
    {
        "id": 3,
        "title": "Top 10 WordPress Plugins for 2025",
        "author": "Daksh Veer",
        "formattedDate": "2025-03-27",
        "bio": "This article covers the top 10 must-have plugins...",
        "tags": ["WordPress", "plugins", "SEO", "website optimization"],
        "category": "WordPress",
        "thumbnail": "https://placehold.co/700x400?text=WordPress"
    },
    {
        "id": 4,
        "title": "How to Use Rest APIs in Web Development",
        "author": "Akash Munda",
        "formattedDate": "2025-07-25",
        "bio": "APIs play a crucial role in modern web dev...",
        "tags": ["APIs", "web development", "Node.js", "RESTful API"],
        "category": "Web Development",
        "thumbnail": "https://placehold.co/700x400?text=Web+Dev"
    },
    {
        "id": 5,
        "title": "Search Engine Optimization: The Complete Beginner’s Guide",
        "author": "Rohit Singh",
        "formattedDate": "2025-03-27",
        "bio": "SEO is vital for ranking higher on Google...",
        "tags": ["SEO", "Google ranking", "keyword research", "backlinks"],
        "category": "Marketing",
        "thumbnail": "https://placehold.co/700x400?text=SEO"
    }
];

const Blog = () => {
    const dispatch = useDispatch();
    const { blog } = useSelector(store => store.blog);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const res = await axios.get(`${api}/blog/get-all-blogs`, { withCredentials: true });
                // const res = await axios.get(`http://localhost:4000/api/v1/blog/get-all-blogs`, { withCredentials: true });

                const fetchedBlogs = res.data?.payload?.blogs || [];

                // Combine static + fetched blogs
                dispatch(setBlog([...blogJson, ...fetchedBlogs]));

            } catch (error) {
                console.log("Error fetching blogs:", error);
                // Fallback to static if API fails
                dispatch(setBlog(blogJson));
            }
        };

        getAllBlogs();
    }, [dispatch]);

    return (
        <div className="animate-slideInLeft transition-all delay-3000 ease-in-out pt-16 bg-transparent">
            <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold text-center pt-10 '>Our Blogs</h1>
                <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
            </div>

            <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0  '>
                {
                    blog?.map((oneblog, index) => (
                        <BlogCard blog={oneblog} key={index} />
                    ))
                }
            </div>
        </div>
    );
};

export default Blog;
