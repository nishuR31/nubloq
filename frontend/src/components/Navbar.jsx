import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import Logo from "../assets/logo.png";
import blog from "../assets/blog.png";
import "../index.css";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import avatarFallback from "./avatarFallback";
import ThemeChanger from "./ThemeChanger";
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
  ScrollText,
  NotebookText,
  MessageCircle,
  Pencil,
  House,
  Palette,
  Moon,
  Sun,
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
  console.log(theme);
  useEffect(() => {
    document.body.setAttribute("class", theme);
    return () => {};
  }, [theme]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="fixed z-50 min-w-full py-2 bg-transparent border-2 rounded-lg backdrop-blur-sm border-primary">
      <div className="flex items-center justify-between mx-auto max-w-full flex-row ">
        {/* logo section */}
        <div className="  flex items-center gap-3 flex-wrap  justify-between">
          <Link to={"/"}>
            <div className="flex items-center ">
              <img
                src={blog}
                alt=""
                className="w-10 h-10 invert dark:invert-0 pl-2 object-contain"
              />
            </div>
          </Link>
          <div className="relative hidden md:block ">
            <Input
              type="text"
              placeholder="Search..."
              className="border border-muted drop-shadow-lg shadow-accent placeholder:text-theme md:w-[250px] lg:w-[300px] caret-accent-primary  hidden md:block bg-transparent "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 text-theme"
              onClick={handleSearch}
            >
              <Search />
            </Button>
          </div>
        </div>
        {/* nav section */}
        <nav className="ml-10 flex items-center justify-center-safe ">
          <ul className="items-center hidden text-xl font-semibold md:flex gap-7 text-theme">
            <NavLink to={"/"} className="cursor-pointer hover:underline ">
              <li>
                <House className="inline lg:hidden text-primary" />
                <span className="hidden lg:inline text-primary">Home</span>
              </li>
            </NavLink>

            <NavLink
              to={"/blogs"}
              className={`cursor-pointer hover:underline `}
            >
              <li>
                <NotebookText className="inline lg:hidden text-primary" />
                <span className="hidden lg:inline text-primary ">Blogs</span>
              </li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={`cursor-pointer hover:underline `}
            >
              <li>
                <ScrollText className="inline lg:hidden text-primary" />
                <span className="hidden lg:inline text-primary">About</span>
              </li>
            </NavLink>
            <NavLink
              to={"/write-blog"}
              className={`cursor-pointer hover:underline `}
            >
              <li>
                <Pencil className="inline lg:hidden text-primary" />
                <span className="hidden lg:inline text-primary ">
                  Write a Blog
                </span>
              </li>
            </NavLink>
          </ul>
          <div className="flex justify-between mx-2 gap-1 ">
            <Button
              onClick={() => {
                dispatch(toggleTheme());
              }}
              className=""
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
            {/* <ThemeChanger /> */}
            {/* <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="">
                    <Palette className="inline lg:hidden" />
                    <span className="hidden lg:inline">Theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-theme" align="left">
                  {["light", "dark", "cyan", "red", "yellow", "magenta"].map(
                    (mode) => (
                      <DropdownMenuItem
                        key={mode}
                        onClick={() => {
                          dispatch(setTheme(mode));
                          localStorage.setItem("theme", JSON.stringify(mode));
                        }}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}

            {user ? (
              <div className="flex items-center gap-3 mx-7 ">
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
              <>
                <div className="md:flex ">
                  <Link to={"/login"}>
                    <Button>Login</Button>
                  </Link>
                </div>
                <div>
                  <Link className="hidden md:block" to={"/signup"}>
                    <Button>Signup</Button>
                  </Link>
                </div>
              </>
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
