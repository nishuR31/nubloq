import Hero from "../components/Hero";
import React from "react";
import RecentBlog from "../components/RecentBlog";
import PopularAuthors from "../components/PopularAuthors";
import FramerMotion from "../components/framerMotion";

const Home = () => {
  return (
    //<div>
  <div>
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
