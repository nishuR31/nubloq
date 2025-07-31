import Hero from "@/components/Hero";
import React from "react";
import RecentBlog from "@/components/RecentBlog";
import PopularAuthors from "@/components/PopularAuthors";
import FramerMotion from "@/components/framerMotion";

const Home = () => {
  return (
    //<div>
  <div className="transition-all delay-3000 ease-in-out bg-home-light dark:bg-home-dark bg-fixed bg-no-repeat bg-fit bg-bottom dark:bg-center ">
      <FramerMotion>
        <Hero />
      </FramerMotion>
      <FramerMotion>
        <RecentBlog />
      </FramerMotion>
      <FramerMotion>
        <PopularAuthors />
      </FramerMotion>
    </div>
  );
};

export default Home;
