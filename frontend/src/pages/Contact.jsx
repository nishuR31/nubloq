import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import "../index.css";

import { useNavigate, Link } from "react-router-dom";
const api = import.meta.env.VITE_URL;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Contact = () => {
  let navigate = useNavigate();
  const [mail, setMail] = useState("");
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
        setMail(form.email);
        console.log(mail);

        toast.success("Mail sent successfully to our dev team!");
        const con = await axios.post(
          `${api}/user/confirmation`,
          form, // ✅ Wrap it as an object
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (con.data.success) {
          toast.success("Don't forget to check your spams later.");
          setForm({ name: "", email: "", message: "" });
        }
      } else {
        toast.error("Failed to send mail.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col w-full min-h-screen p-6 px-5 py-10 mx-auto text-justify bg-transparent transition-all ease-in bg-no-repeat bg-cover  delay-[2s] ">
      <div className="flex flex-col items-center gap-5 px-10 mx-auto mt-10 bg-transparent rounded-lg backdrop-blur-md max-w-screen border-input shadow-lg border-1 md:flex-row">
        <div className="flex-1 w-full max-w-xl">
          <h2 className="pt-10 mb-6 text-4xl font-bold text-center text-app animate-bounce">
            Get in Touch
          </h2>
          <p className="mb-6 text-lg opacity-80 text-muted-fg">
            We'd love to hear from you! Whether you have a question about our
            content, want to collaborate, or just want to say hi — drop us a
            message and we'll get back to you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 caret-[var(--primary)]"
          >
            <Input
              type="text"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border-input placeholder:bg-transparent text-muted-fg"
            />
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border-input placeholder:bg-transparent text-muted-fg"
            />
            <Textarea
              rows="5"
              placeholder="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="border-input placeholder:bg-transparent text-muted-fg "
            />
            <Button
              variant="ghost"
              type="submit"
              className="w-full my-2 text-lg bg-primary text-primary-fg"
            >
              Send Message
            </Button>

            <Link to="/">
              <Button
                variant="ghost"
                type="button"
                className="w-full my-2 text-lg text-muted-fg bg-accent"
              >
                Home
              </Button>
            </Link>
            {/* <Link to="/"><Button variant="default" type="button" onClick={()=>{navigate("/")}} className="w-full text-lg">
            Home
            </Button></Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
