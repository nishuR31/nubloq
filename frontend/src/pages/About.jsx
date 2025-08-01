import React, { useState, useEffect } from "react";
import img6 from "../assets/LMS.png";
import img7 from "../assets/pen.jpg"
import img1 from "../assets/laptopWrite.jpg";
import img2 from "../assets/bulbDark.png";
import img3 from "../assets/keyboard.jpg";
import img4 from "../assets/typingLaptop.avif";
import img5 from "../assets/typingLaptop2.avif"

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
  const skills = [
    "frontend developer",
    "backend engineer",
    "full-stack developer",
    "UI/UX designer",
    "DevOps engineer",
    "mobile app developer",
    "machine learning enthusiast",
    "cybersecurity analyst",
    "technical writer",
    "open source contributor",
    "data scientist",
    "cloud architect",
    "QA tester",
    "game developer",
    "blockchain developer",
  ];

  let [fields, setFields] = useState("Welcome to our about section.");
  let pics = [img1,img2,img3,img4,img5,img6,img7];
  let [skill, setSkill] = useState([skills[0]]);

  let [src, setSrc] = useState(pics[0]);
  useEffect(() => {
    let ipic = 0;
    let iblog = 0;
    let iskill = 0;
    let intervalPics = setInterval(() => {
      setSrc(pics[ipic % pics.length]);
      ipic += 1;
    }, 3000);

    let intervalBlogs = setInterval(() => {
      setFields(blogTopics[iblog % blogTopics.length]);
      iblog += 1;
    }, 2000);

    let intervalSkills = setInterval(() => {
      setSkill(skills[iskill % skills.length]);
      iskill += 1;
    }, 2000);
    return () => {
      clearInterval(intervalPics);
      clearInterval(intervalBlogs);
      clearInterval(intervalSkills);
    };
  }, []);

  return (
    <div className="animate-slideInLeft ease-in-out  pt-28 px-4 md:px-0 mb-7  text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="md:text-5xl text-4xl font-extrabold  mb-4 animate-bounce">
            About Our Blog...
          </h1>
          <h2 className="text-white font-bold my-4 transition-opacity duration-500 ease-in-out">
            {fields}
          </h2>
          <p className="text-lg ">
            A place and space to share thoughts, experiences, inspire others,
            and a chance to grow together to become better version of yourself.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center ">
          <img
            src={src}
            alt="Blog Illustration"
            className="w-full h-72 object-cover rounded-2xl shadow-lg animate-slideInLeftw"
          />
          <div>
            <p className=" text-lg mb-4">
              Welcome to our Blog web app <strong>Nishu Blogs</strong>! This was
              created for readers, writers, and thinkers to connect through
              stories, tutorials, and creative insights. Whether you're a{" "}
              <i>
                <b>{skill}</b>
              </i>
              , this then space is built for you.
            </p>
            <p className=" text-lg mb-4">
              Our mission is to empower individuals to express themselves
              freely. We offer simple tools to write, publish, and engage with
              others in meaningful ways.
            </p>
            <p className=" text-lg">
              Thank you for being a part of our new yet growing community.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic dark:text-gray-400 animate-pulse">
            "Do everything in your life that later in your deathbed you do have
            memories to remember"
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;

/////////////////////////////////////////////////////
