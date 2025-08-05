import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { setTheme, toggleTheme } from "../redux/themeSlice"; // adjust path as needed
import { Palette, MoonStar, Sun } from "lucide-react";
const themes = ["dark", "light"];

export default function ThemeChanger() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  document.body.dataset.theme = theme;

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleThemeToggle = (mode) => {
    dispatch(toggleTheme(mode));
    localStorage.setItem("theme", mode);
    document.body.dataset.theme = mode;
    setTheme(mode);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        onClick={handleThemeToggle(theme)}
        // className="flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition-all"
      >
        {theme === "dark" ? <MoonStar className="" /> : <Sun className="" />}
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black/10 focus:outline-none">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-100">
            {themes.map((mode) => (
              <li
                key={mode}
                onClick={() => handleThemeChange(mode)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 capitalize transition-colors"
              >
                {mode}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
