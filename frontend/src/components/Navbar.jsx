import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import Logo from "../assets/logo.png";
import blog from "../assets/blog.png";
import "../index.css";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import avatarFallback from "./avatarFallback";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import userLogo from "../assets/user.jpg";
import {
  Menu,
  ChartColumnBig,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Home,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
  Sun,
  Moon,
  MessageCircle,
  Pencil,
  Heart,
  Palette,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toggleTheme, setTheme } from "../redux/themeSlice";
import ResponsiveMenu from "./ResponsiveMenu";
const api = import.meta.env.VITE_URL;

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = false;

  const logoutHandler = async (e) => {
    try {
      // const res = await axios.get(`http://localhost:4000/api/v1/user/logout`, {
      const res = await axios.get(`${api}/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <div className="fixed z-50 w-full py-2 bg-transparent border-2 rounded-lg dark:border-b-gray-600 backdrop-blur-sm border-b-gray-300">
      <div className="flex items-center justify-between max-w-5xl mx-auto ">
        {/* logo section */}
        <div className="flex items-center gap-7">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <img
                src={blog}
                alt=""
                className="w-7 h-7 md:w-10 md:h-10 invert dark:invert-0"
              />
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search"
              className="border border-gray-700  bg-gray-300 sm:w-[400px]  md:w-[200px]  lg:w-[350px]  hidden sm:block bg-transparent "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="absolute top-0 right-0" onClick={handleSearch}>
              <Search />
            </Button>
          </div>
        </div>
        {/* nav section */}
        <nav className="flex items-center gap-4 md:gap-7">
          <ul className="items-center hidden text-xl font-semibold md:flex gap-7">
            <NavLink to={"/"} className="cursor-pointer hover:underline ">
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/blogs"}
              className={`cursor-pointer hover:underline `}
            >
              <li>Blogs</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={`cursor-pointer hover:underline `}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/write-blog"}
              className={`cursor-pointer hover:underline `}
            >
              <li>
                <Pencil className="hidden lg:inline" /> Write{" "}
                <span className="hidden lg:inline ">a Blog</span>{" "}
              </li>
            </NavLink>
          </ul>
          <div className="flex">
            {/* <Button onClick={() => dispatch(toggleTheme())} className="">
              {theme === "light" ? <Moon /> : <Sun />}
            </Button> */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Theme</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["light", "dark", "cyan", "red", "yellow", "magenta"].map(
                    (mode) => (
                      <DropdownMenuItem
                        key={mode}
                        onClick={() => dispatch(setTheme(mode))}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div />

            {user ? (
              <div className="flex items-center gap-3 ml-7 ">
                {/* <Link to={'dashboard/profile'} /> */}
                <DropdownMenu className="">
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer ">
                      <AvatarImage src={user.photoUrl} />
                      <AvatarFallback>{avatarFallback(user)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 text-white bg-transparent backdrop-blur-md">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/profile")}
                      >
                        <User />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/your-blog")}
                      >
                        <ChartColumnBig />
                        <span>Your Blog</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/comments")}
                      >
                        <MessageCircle />
                        <span>Comments</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/write-blog")}>
                        <Pencil />
                        <span>Write Blog</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* </Link> */}
                <Button
                  className="hidden md:block track-tighter lg:flex lg:w-20 "
                  onClick={logoutHandler}
                >
                  <LogOut className="hidden lg:block" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="md:flex ">
                <Link to={"/login"}>
                  <Button>Login</Button>
                </Link>
                <Link className="hidden md:block" to={"/signup"}>
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </div>
          {openNav ? (
            <Menu onClick={toggleNav} className="w-7 h-7 md:hidden" />
          ) : (
            <Menu onClick={toggleNav} className="w-7 h-7 md:hidden" />
          )}
        </nav>
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
