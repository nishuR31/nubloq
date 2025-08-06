import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import blog from "../assets/blog.png";
import ScrollToTop from "./scrollToTop";
import "../index.css";




const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const api = import.meta.env.VITE_URL;

const Footer = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState({ email: "" });

  const handleChange = (e) => {
    setEmail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.email) {
      return toast.error("Email is required.");
    }

    if (!emailRegex.test(email.email)) {
      return toast.error("Invalid email format!");
    }

    console.log("email:", email.email);

    try {
      const res = await axios.post(
        `${api}/user/subscribe`,
        // "http://localhost:4000/api/v1/user/subscribe",
        { email: email.email }, // ✅ Wrap it as an object
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Thanks for subscribing!");
        const con = await axios.post(
          `${api}/user/confirmation`,
          { email: email.email }, // ✅ Wrap it as an object
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (con.data.success) {
          toast.success("Check your spam folder too.");
          setEmail({ email: "" });
          navigate("/");
        }
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error?.response);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <footer
      className={` transition-all delay-[2s] ease-in-out min-h-fit bg-transparent text-app   `}
    >
      <div className="w-full h-3  bg-sidebar-primary backdrop-blur-md"></div>
      <div className="flex flex-row flex-wrap justify-around px-4 md:justify-between">
        {/*  info */}
        <div className="my-6 md:mb-0">
          <Link to="/" className="flex items-center gap-3">
            {/* <img src={Logo} alt="" className='w-32'/> */}
            <img src={blog} alt="" className="w-20 h-20 animate-bounce " />
          </Link>
          <p className="mt-2">
            Sharing insights, tutorials, and ideas on software development and
            tech fields.
          </p>
          <p className="mt-2 text-sm font-bold tight text-muted-fg">
            Vinita Nest, Near Lieven's School of Excellence, Daladali
            chowk,Ranchi, Jharkhand, 835222
          </p>
          <p className="text-sm font-bold ">
            Email:{" "}
            <a
              href="mailto:bloggernishu31@gmail.com"
              className="italic text-secondary-fg font-thin"
            >
              bloggernishu31@gmail.com
            </a>
          </p>
        </div>
        {/* customer service link */}
        <div className="my-6 md:mb-0">
          <h3 className="text-xl font-semibold  ">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-accent text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/code-of-conduct">Code of Conduct</Link>
            </li>
          </ul>
        </div>
        {/* social media links */}
        <div className="my-6 md:mb-0">
          <h3 className="text-xl font-semibold ">Follow Us</h3>
          <div className="flex mt-2 text-secondary-fg space-x-4">
            <a href="https://www.github.com/nishuR31" target="_black">
              <Github />
            </a>
            <a href="mailto:bloggernishu31@gmail.com">
              <Mail />
            </a>
          </div>
        </div>
        {/* newsletter subscription */}
        <div className="my-6 md:mb-0">
          <h3 className="text-xl font-semibold  text-secondary-fg">Stay in the Loop</h3>
          <p className="mt-2 text-sm text-muted-fg">
            Subscribe us to get future special offers, free giveaways, and more.
          </p>
          <form action="" className="flex mt-4">
            <input
              type="email"
              value={email.email}
              name="email"
              onChange={handleChange}
              placeholder="Your email address"
              className="w-full p-2 placeholder:bg-transparent text-accent rounded-l-md border-input border-1 focus:outline-none caret-[var(--primary)] backdrop-blur-sm"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 text-primary-fg transition-all delay-1000 bg-primary rounded-r-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* bottom section */}
      <div className="py-4 text-sm text-center border-none backdrop-blur-sm">
        <p className="animate-bounce">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold text-primary">Nishu Blog</span>. All rights reserved
        </p>
      </div>
      <ScrollToTop />
    </footer>
  );
};

export default Footer;

///////////////////////////////////////////////////
