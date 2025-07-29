import React,{useState,useEffect} from 'react';
import about from "../assets/About-blog.avif"
import blog from "../assets/Blog-about.avif"
import blog2 from "../assets/Blog-about.webp"
import LMS from "../assets/LMS.png"

const About = () => {

const blogTopics = [
  "Building a Portfolio with React and Vite",
  "Dark Mode Toggle in TailwindCSS",
  "JWT Authentication in Express.js",
  "Form Validation Using Regex in React",
  "CRUD Operations with Mongoose",
  "SEO Optimization in Vite Apps",
  "Lazy Loading in React Components",
  "Context API vs Redux Toolkit",
  "MongoDB Aggregation Pipeline Basics",
  "Custom Middleware in Express.js",
  "Uploading Files Using Multer",
  "Helmet and CORS Setup in Express",
  "Building Protected Routes with JWT",
  "Responsive UI with TailwindCSS Grid",
  "Debouncing Search in React",
  "MERN Stack Project Folder Structure",
  "Theming with TailwindCSS and React Context",
  "Optimizing React Apps for Performance",
  "Working with MongoDB Indexes",
  "Using Framer Motion with React and Tailwind",
  "Building a REST API with Node and Express",
  "React Toast Notification Systems",
  "TailwindCSS Animate Utility Classes",
  "Image Optimization in Vite Projects",
  "Building Blogs with Markdown and React",
  "Infinite Scroll in React with IntersectionObserver",
];

let [fields,setFields]=useState("Welcome to our about section.")
let pics=[blog,about,LMS,blog2]
let [src,setSrc]=useState(about);
useEffect(()=>{
  let i=0;
    let interval=setInterval(() => {
      setSrc(pics[i%pics.length]);i+=1;
    }, 3000);
   return ()=>clearInterval(interval)

},[])

useEffect(()=>{
  let i=0;
    let interval=setInterval(() => {
      setFields(blogTopics[i%blogTopics.length]);i+=1;
    }, 2000);
   return ()=>clearInterval(interval)
},[])



  return (
    <div className="transition-all delay-3000 ease-in-out min-h-screen pt-28 px-4 md:px-0 mb-7 ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="md:text-5xl text-4xl font-extrabold  mb-4 animate-bounce">
            About Our Blog...
          </h1>
<h2 className="dark:text-gray-400 font-bold my-4 transition-opacity duration-500 ease-in-out">
  {fields}
</h2>
          <p className="text-lg ">
            A place and space to share thoughts, experiences, inspire others, and a chance to grow together to become better version of yourself.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={src}
            alt="Blog Illustration"
            className="w-full h-72 object-cover rounded-2xl shadow-lg "
          />
          <div>
            <p className=" text-lg mb-4">
              Welcome to our Blog web app! This was created for readers,
              writers, and thinkers to connect through stories, tutorials, and
              creative insights. Whether you're a passionate blogger or someone
              who loves reading, learning new this then space is built for you.
            </p>
            <p className=" text-lg mb-4">
              Our mission is to empower individuals to express themselves freely.
              We offer simple tools to write, publish, and engage with others in
              meaningful ways.
            </p>
            <p className=" text-lg">
              Thank you for being a part of our new yet growing community.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic dark:text-gray-400 animate-pulse">
            "Do everything in your life that later in your deathbed you do have memories to remember"
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;

/////////////////////////////////////////////////////