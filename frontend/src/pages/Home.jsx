import Hero from '@/components/Hero'
import React from 'react'
import RecentBlog from '@/components/RecentBlog'
import PopularAuthors from '@/components/PopularAuthors'
import FramerMotion from '@/components/framerMotion'

const Home = () => {
  
  return (
    <div >
      <FramerMotion> 
        <Hero/>

        <RecentBlog/>

        <PopularAuthors/>
      </FramerMotion>
    </div>
  )
}
 
export default Home
