import { ChartColumnBig, FolderPlus, SquareUser } from "lucide-react";
import { MessageCircle,Pencil } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden animate-slideInLeft transition-all delay-2000 ease-in  fixed md:block border-r-2 bg-fixed bg-no-repeat bg-cover  bg-wave dark:bg-blackWave border-gray-300 dark:border-gray-600  w-[250px] py-40  space-y-2 min-h-screen z-10">
      {/* <h1 className='text-xl font-semibold text-gray-700 cursor-pointer hover:bg-gray-800 p-2 text-center rounded-md hover:text-white'>Your Blogs</h1> 
      <h2 className='text-xl font-semibold cursor-pointer'>Comments</h2> 
      <h1 className='text-xl font-semibold cursor-pointer hover:bg-gray-800 p-2 text-center rounded-md hover:text-white'>Write a Blog</h1>
      <h1 className='text-xl font-semibold cursor-pointer hover:bg-gray-800 p-2 text-center rounded-md hover:text-white'>Profile</h1>  */}

      <div className="text-center pt-10 px-2 space-y-2">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <SquareUser />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard/your-blog"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <ChartColumnBig />
          <span>Your Blogs</span>
        </NavLink>
        <NavLink
          to="/dashboard/comments"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <MessageCircle />
          <span>Comments</span>
        </NavLink>
        <NavLink
          to="/write-blog"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <Pencil />
          <span>Create Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
