import { ChartColumnBig, FolderPlus, SquareUser } from "lucide-react";
import { MessageCircle,Pencil } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";




const Sidebar = () => {
  return (
    <div className="hidden animate-slideInLeft transition-all delay-[2s] ease-in  fixed md:block border-r-2 bg-bg bg-no-repeat bg-cover  border-input  w-[250px] py-40  space-y-2 min-h-screen z-10">
      {/* <h1 className='p-2 text-xl font-semibold text-center text-gray-700 rounded-md cursor-pointer hover:bg-gray-800 hover:text-white'>Your Blogs</h1> 
      <h2 className='text-xl font-semibold cursor-pointer'>Comments</h2> 
      <h1 className='p-2 text-xl font-semibold text-center rounded-md cursor-pointer hover:bg-gray-800 hover:text-white'>Write a Blog</h1>
      <h1 className='p-2 text-xl font-semibold text-center rounded-md cursor-pointer hover:bg-gray-800 hover:text-white'>Profile</h1>  */}

      <div className="px-2 pt-10 text-app space-y-2 text-center">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-primary  text-app"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <SquareUser className="text-secondary-fg" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard/your-blog"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-primary  text-secondary-fg"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <ChartColumnBig className="text-secondary-fg"/>
          <span>Your Blogs</span>
        </NavLink>
        <NavLink
          to="/dashboard/comments"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-primary  text-app"
                : "bg-transparent"
            } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <MessageCircle className="text-secondary-fg" />
          <span>Comments</span>
        </NavLink>
        <NavLink
          to="/write-blog"
          className={({ isActive }) =>
            `text-2xl  ${
              isActive
                ? "bg-primary  text-app"
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
