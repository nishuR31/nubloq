import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <div
        className="flex flex-col animate-slideInLeft py-10 transition-all delay-3000 ease-in bg-cover  bg-no-repeat dark:bg-left dark:bg-cover min-h-content bg-wave dark:bg-blackWave w-full mx-auto p-6 text-gray-800 dark:text-gray-200"
      >
        <h1 className="pt-10 text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how
          BlogPaglu collects, uses, and safeguards your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Information We Collect
        </h2>
        <ul className="listdisk list-inside mb-4 pl-10">
          <li>Email address and username (for authentication)</li>
          <li>Blog content you publish</li>
          <li>Profile pictures (stored via Cloudinary)</li>
          <li>Theme preference (dark/light)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          How We Use Information
        </h2>
        <p className="mb-4">
          We use your information solely to manage your blog account, improve
          user experience, and personalize your dashboard. We never sell or
          share your data. Where we will sell data to?.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Security</h2>
        <p className="mb-4">
          All user data is protected using secure JWT authentication. Passwords
          are hashed. No plain-text sensitive data is stored except bio data
          stuff.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Third-Party Services
        </h2>
        <p className="mb-4">
          We use Cloudinary for image storage, Mongodb for data storage, Github
          for project storage,Vercel and Heruko for deployment and may use
          analytics tools in the future to improve services. Your data is never
          exposed.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Changes to This Policy
        </h2>
        <p className="mb-4">
          Any changes will be reflected here. Continued use after updates
          implies consent to those changes.
        </p>
        <p className="text-xl font-semibold mt-6 mb-2">
          Thank You for using our service.
        </p>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Last updated: July 29, 2025
        </p>
        <div className="">
          <Link to="/" className="">
            <Button variant="ghost" className="w-full mt-5">
              Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
