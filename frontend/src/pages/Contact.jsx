import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
const api = import.meta.env.VITE_URL;



const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Contact = () => {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("All fields are required.");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Invalid mail format!");
    }
    console.log(form);

    try {
      const res = await axios.post(
        // "http://localhost:4000/api/v1/user/contact",
        `${api}/user/contact`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("Mail sent successfully to our dev team!");
        toast.success("Don't forget to check your spams later.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send mail.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
<div className="flex flex-col animate-slideInLeft py-10 px-5 text-justify  transition-all delay-3000 ease-in bg-cover  bg-no-repeat dark:bg-left dark:bg-cover min-h-screen bg-wave dark:bg-blackWave w-full mx-auto p-6 text-gray-800 dark:text-gray-200">
      <div className="mt-10 bg-transparent backdrop-blur-md max-w-screen px-10 mx-auto outline outline-1 outline-gray-500 dark:outline dark:outline-1 rounded-lg dark:outline-gray-500  bg-gray-300 flex flex-col md:flex-row items-center gap-5">
        <div className="flex-1 w-full max-w-xl">
          <h2 className=" pt-10 text-4xl font-bold mb-6  animate-bounce text-center">
            Get in Touch
          </h2>
          <p className="text-lg opacity-80 mb-6">
            We'd love to hear from you! Whether you have a question about our
            content, want to collaborate, or just want to say hi — drop us a
            message and we'll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="dark:border-gray-700"
            />
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="dark:border-gray-700"
            />
            <Textarea
              rows="5"
              placeholder="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="dark:border-gray-700 "
            />
            <Button
              variant="ghost"
              type="submit"
              className="my-2 text-lg w-full"
            >
              Send Message
            </Button>
 
            <Link to="/">
              <Button
                variant="ghost"
                type="button"
                className="my-2 text-lg w-full"
              >
                Home
              </Button>
            </Link>
            {/* <Link to="/"><Button variant="default" type="button" onClick={()=>{navigate("/")}} className="text-lg w-full">
            Home
            </Button></Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
