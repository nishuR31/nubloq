import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send form data (e.g., to backend or Formspree)
    if (!form.name || !form.email || !form.message) {
      return toast.error("All fields are required.");
    }
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-4 md:px-0 py-10">
      <div className="max-w-screen h-screen px-10 mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Image */}


        {/* Right: Form */}
        <div className="flex-1 w-full max-w-xl">
          <h2 className="text-4xl font-bold mb-6 animate-bounce text-center">Get in Touch</h2>
          <p className="text-lg opacity-80 mb-6">
            We'd love to hear from you! Whether you have a question about our content,
            want to collaborate, or just want to say hi — drop us a message and we'll get back to you.
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
            <Button variant="ghost" type="submit" className="text-lg w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;



