// import React ,{useState,useEffect} from 'react'
import heroImg from "../assets/blog2.png"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import Mouse from "./mouse"

const Hero = () => {

  return (
    <div className="transition-all delay-3000 ease-in-out h-screen bg-home-light dark:bg-home-dark bg-fixed bg-no-repeat bg-fit bg-bottom dark:bg-center px-4 ">
{/*     <div className="transition-all delay-3000 ease-in-out h-screen bg-home-light dark:bg-home-dark  bg-no-repeat bg-fit bg-bottom dark:bg-center px-4 "> */}
    {/* <div className=" transition-all delay-3000 ease-in-out  bg-home-light dark:bg-home-dark bg-no-repeat bg-fit bg-bottom dark:bg-center px-4 h-screen "> */}
<div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] '>
        {/* text section */}
        <div className="max-w-2xl mx-6">
        <h1 className="text-4xl md:text-6xl text-gray-800 font-bold mb-4 dark:text-white text-justify mt-20">Explore the Latest Tech <span className="text-red-500">&</span> Web Trends</h1>
         <br />
         <hr className="w-full h-0.5 bg-gradient-to-r from-[#00000020] via-[#000000] to-[#00000020]  dark:from-[#00000020] dark:via-[#ffffff] dark:to-[#00000020]   rounded-xl"/>
         <br />
        <p className="text-lg md:text-xl opacity-80 mb-6 text-black dark:text-white pl-20 font-bold ">
        Stay ahead of the curve with expertly crafted articles, step-by-step tutorials, and deep-dive insights
         covering the latest in web development, digital marketing strategies, and groundbreaking tech innovations. Whether you're a seasoned professional 
         or just starting out, our content is designed to keep you informed, inspired, and always moving forward.</p>
         <br />
         <hr className="w-full h-0.5 bg-gradient-to-r from-[#00000020] via-[#000000] to-[#00000020] dark:from-[#00000020] dark:via-[#ffffff] dark:to-[#00000020]  rounded-xl"/>
         <br />
        <div className="flex space-x-4 justify-center md:justify-start">
          <Link to={"/write-blog"}><Button className="text-lg ">Get Started</Button></Link>
          <Link to={"/about"}><Button variant="outline" className="border-white px-6 py-3 text-lg">Learn More</Button></Link>
        </div>
      </div>
        {/* image section */}
        <div className=' flex items-center justify-center '>
            <img src={heroImg} alt="" className='hidden sm:block md:h-[350px] md:w-[350px] lg:h-[550px] lg:w-[550px]'/>
        </div>
      </div>
      {/* scroll effect icon */}
      <div  className={`scrolldown flex justify-center pt-5   `}>

          <Mouse />
      </div>
    </div>
  )
}

export default Hero


////////////////////////////////////////////////////
