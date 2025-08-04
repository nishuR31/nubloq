import React, { useState, useEffect } from "react";
import img6 from "../assets/LMS.png";
import img7 from "../assets/pen.jpg";
import img1 from "../assets/laptopWrite.jpg";
import img2 from "../assets/bulbDark.png";
import img3 from "../assets/keyboard.jpg";
import img4 from "../assets/typingLaptop.avif";
import img5 from "../assets/typingLaptop2.avif";
import "../index.css";




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
    // 🧑‍💻 Frontend Engineering
    "Building a Scalable Developer Portfolio using React and Vite",
    "Implementing and Styling Dark Mode with TailwindCSS and React Context",
    "Mastering Lazy Loading Techniques in React for Blazing Fast UI",
    "Form Validation using Regex, Zod, and React Hook Form",
    "Debouncing Search Inputs in React with useEffect and Lodash",
    "Comparing State Management: Context API vs Redux Toolkit in 2025",
    "Creating Themeable UI Systems using TailwindCSS with React",
    "Building a Markdown-powered Blog with Vite, React, and Tailwind",
    "Using IntersectionObserver for Infinite Scroll and Lazy Media Loading",
    "Accessibility Best Practices in TailwindCSS and React Projects",

    // 🚀 Performance & Optimization
    "Optimizing React Applications for Lighthouse and Core Web Vitals",
    "Advanced Image Optimization in Vite-Powered Web Apps",
    "TailwindCSS v4 Animate, Transition, and Motion Strategies",
    "Dynamic Import Strategies in React for Route-based Code Splitting",
    "Analyzing Bundle Size with Vite Plugin Visualizer and Fixing Bottlenecks",

    // 🛠 Backend & Dev APIs
    "Creating Robust REST APIs with Node.js and Express - Best Practices",
    "Understanding JWT Authentication, Refresh Tokens, and Access Tokens",
    "Implementing Protected Routes and Role-based Access Control in Express",
    "File Upload Handling with Multer and Cloudinary in Express Apps",
    "Creating and Applying Custom Express Middleware for Logging and Security",
    "Setting up Helmet and CORS in Express.js for Production Readiness",
    "Scalable Folder Structure for Enterprise-grade MERN Projects",

    // 🧠 MongoDB & Database Mastery
    "Mastering CRUD Operations with Mongoose in a Real-world Blog API",
    "MongoDB Aggregation Pipeline Deep Dive with Use Case Examples",
    "Understanding MongoDB Indexing for Fast Queries and Optimized Reads",
    "Securing NoSQL Databases: MongoDB Validation and Sanitization",
    "Designing Flexible and Scalable MongoDB Schemas for Microservices",

    // 💡 UI/UX & Interaction
    "Using Framer Motion with React and TailwindCSS to Build Delightful UIs",
    "Designing Responsive Grids and Layouts with Tailwind v4 Utilities",
    "Creating Reusable Component Libraries with Tailwind and HeadlessUI",
    "Integrating React Toast Notifications and Global Alert Systems",

    // 📈 SEO & Production
    "SEO Optimization for Single Page Apps using Vite and React Helmet",
    "Generating Meta Tags Dynamically for Blog Pages in React",
    "Sitemap and Robots.txt Setup for Vite + React Deployments",
    "Pre-rendering and SSR in Vite: When and How to Use It",

    // 🧪 Testing & Deployment
    "Testing React Components with Vitest and React Testing Library",
    "Writing Unit Tests for Express.js API Routes with Supertest",
    "End-to-End Testing a MERN App with Cypress and Mock Service Worker",
    "Deploying Vite + Node.js Projects on Render and Vercel with CI/CD",
    "Managing Environment Variables Securely in Vite and Express",

    // 🔒 Security & Best Practices
    "Common Web Vulnerabilities in MERN Stack and How to Prevent Them",
    "Understanding and Implementing Secure Cookies for JWT Auth",
    "Best Practices for API Rate Limiting and Throttling in Express.js",
    "Logging and Monitoring Express APIs with Morgan and Winston",
  ];

  const skills = [
    // 💻 Tech Roles
    "frontend developer",
    "backend engineer",
    "full-stack developer",
    "UI/UX designer",
    "DevOps engineer",
    "mobile app developer",
    "machine learning enthusiast",
    "cybersecurity analyst",
    "data scientist",
    "cloud architect",
    "QA tester",
    "game developer",
    "blockchain developer",
    "technical writer",
    "open source contributor",
    "software architect",
    "automation engineer",
    "site reliability engineer (SRE)",
    "database administrator (DBA)",
    "embedded systems developer",
    "IoT engineer",
    "VR/AR developer",

    // 🌐 Creative & Digital
    "graphic designer",
    "video editor",
    "content creator",
    "digital artist",
    "motion graphics designer",
    "3D modeler",
    "photographer",
    "animator",
    "voice-over artist",
    "creative director",

    // 📈 Business & Marketing
    "product manager",
    "project manager",
    "business analyst",
    "SEO specialist",
    "digital marketing strategist",
    "brand manager",
    "growth hacker",
    "market researcher",
    "copywriter",
    "advertising specialist",

    // 🎓 Education & Writing
    "educator",
    "public speaker",
    "curriculum designer",
    "academic researcher",
    "blogger",
    "author",
    "translator",
    "language tutor",
    "e-learning specialist",

    // 🧠 Personal/Meta Roles
    "problem solver",
    "innovator",
    "team leader",
    "creative thinker",
    "storyteller",
    "community builder",
    "volunteer",
    "hacker at heart",
    "lifelong learner",

    // 🛠️ Trades & Other Domains
    "entrepreneur",
    "freelancer",
    "consultant",
    "startup founder",
    "tech support specialist",
    "operations coordinator",
    "supply chain analyst",
    "human resources associate",
    "finance associate",
    "legal advisor",

    // ✨ Fun & Passion Tags (for spice)
    "tech tinkerer",
    "pixel pusher",
    "terminal warrior",
    "keyboard ninja",
    "coffee-fueled coder",
    "design perfectionist",
    "debugging detective",
    "AI whisperer",
    "open-source evangelist",
    "side project addict",
  ];

  let [fields, setFields] = useState("Welcome to our about section.");
  let pics = [img1, img2, img3, img4, img5, img6, img7];
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
    <div className="px-4 text-white ease-in-out animate-slideInLeft pt-28 md:px-0 mb-7">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl animate-bounce">
            About Our Blog...
          </h1>
          <h2 className="my-4 font-bold text-white transition-opacity duration-500 ease-in-out">
            {fields}
          </h2>
          <p className="text-lg ">
            A place and space to share thoughts, experiences, inspire others,
            and a chance to grow together to become better version of yourself.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="grid items-center gap-10 mt-12 md:grid-cols-2 ">
          <img
            src={src}
            alt="Blog Illustration"
            className="object-cover w-full shadow-lg h-72 rounded-2xl animate-slideInLeftw"
          />
          <div>
            <p className="mb-4 text-lg ">
              Welcome to <strong>Nubloq</strong>, a thoughtfully crafted
              blogging platform for storytellers, developers, and creative
              thinkers. Share knowledge, exchange ideas, and grow with a
              community that values insightful content and meaningful
              discussion. It doesn't matter if you are{" "}
              <i>
                <b>{skill}</b>
              </i>
              , this then space is built for you.
            </p>
            <p className="mb-4 text-lg ">
              At Nubloq, we’re committed to empowering every individual with the
              freedom to express, publish, and connect. Our platform offers
              clean, powerful tools to spark dialogue and inspire impact.
            </p>
            <p className="text-lg ">
              Thanks for joining us on this journey—our community is just
              getting started! We sincerely appreciate your presence as a part
              of our growing and dynamic community.{" "}
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic dark:text-gray-400 animate-pulse">
            "Live in such a way that your memories become your legacy—moments
            worth reliving, even at your final breath."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;

///////////////////////////////////////////////////// tailwind needed
