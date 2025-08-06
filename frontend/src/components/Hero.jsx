import React, { useState, useEffect } from "react";
import img1 from "../assets/svg.png";
import img2 from "../assets/svg2.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Mouse from "./mouse";
import "../index.css";

const Hero = () => {
  let img = [img1, img2];
  let [src, setSrc] = useState(img[0]);

  useEffect(() => {
    let i = 1;
    const interval = setInterval(() => {
      setSrc(img[i % img.length]);
      i++;
    }, 3000);

    return () => clearInterval(interval); // proper cleanup function
  }, []);

  return (
    <div className="min-h-screen px-4 transition-all ease-in-out bg-transparent delay-[1s] flex flex-wrap   text-app">
      {/*     <div className="h-screen px-4 transition-all ease-in-out bg-bottom bg-no-repeat delay-3000 bg-home-light dark:bg-home-dark bg-fit dark:bg-center "> */}
      {/* <div className="h-screen px-4 transition-all ease-in-out bg-bottom bg-no-repeat delay-3000 bg-home-light dark:bg-home-dark bg-fit dark:bg-center"> */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] ">
        {/* text section */}
        <div className="max-w-2xl mx-6">
          <h1 className="mt-20 mb-4 text-4xl text-app font-bold text-center text-app md:text-6xl md:text-justify">
            Explore the Latest Tech <span className="text-primary">&</span> Web
            Trends
          </h1>
          <br />
          <hr className="w-full h-0.5 bg-primary  rounded-xl" />
          <br />
          <p className="mb-6 text-lg font-bold text-left text-app md:text-xl opacity-80  md:pl-20 ">
            Stay ahead of the curve with expertly crafted articles, step-by-step
            tutorials, and deep-dive insights covering the latest in web
            development, digital marketing strategies, and groundbreaking tech
            innovations. Whether you're a seasoned professional or just starting
            out, our content is designed to keep you informed, inspired, and
            always moving forward.
          </p>
          <br />
          <hr className="w-full h-0.5 bg-primary rounded-xl" />
          <br />
          <div className="flex justify-center space-x-4 md:justify-start">
            <Link to={"/write-blog"}>
              <Button className="text-lg text-sidebar-primary-fg ">Get Started</Button>
            </Link>
            <Link to={"/about"}>
              <Button
                variant="outline"
                className="px-6 py-3 text-lg border-white"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        {/* image section */}
        <div className="flex items-center justify-center ">
          <img
            src={src}
            alt=""
            className="hidden lg:block md:h-[350px] md:w-[350px] lg:h-[550px] lg:w-[550px]"
          />
        </div>
      </div>
      {/* scroll effect icon */}
      <div className={`scrolldown  justify-center hidden md:inline pt-5   `}>
        <Mouse />
      </div>
    </div>
  );
};

export default Hero;

/////////////////////////////////////////////////////
