import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { FaGithub,FaEnvelope } from 'react-icons/fa'
import footer from "../assets/footer.jpg"


const Footer = () => {
  return (
    <footer className="text-gray-200 py-10 bg-cover bg-no-repeat bg-center " style={{backgroundImage:`url(${footer})`}}>
      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/*  info */}
        <div className='mb-6 md:mb-0'>
            <Link to='/' className='flex gap-3 items-center'>
              {/* <img src={Logo} alt="" className='w-32'/> */}
              <img src={Logo} alt="" className='animate-bounce invert w-20 h-20'/>
            </Link>
            <p className='mt-2'>Sharing insights, tutorials, and ideas on software development and tech fields.</p>
            <p className='mt-2 text-sm font-bold'>Vinita Nest, Near Lieven's School of Excellence, Daladali chowk,Ranchi, Jharkhand, 835222</p>
            <p className='text-sm font-bold'>Email: <a href="mailto:bloggernishu31@gmail.com" className="font-thin italic">bloggernishu31@gmail.com</a></p>
        </div>
        {/* customer service link */}
        <div className='mb-6 md:mb-0 '>
            <h3 className='text-xl font-semibold animate-bounce'>Quick Links</h3>
            <ul className='mt-2 text-sm space-y-2'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                {/* <li><Link to="f">FAQs</Link></li> */}
            </ul>
        </div>
        {/* social media links */}
        <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-semibold animate-bounce'>Follow Us</h3>
            <div className='flex space-x-4 mt-2'>
                <a href="https://www.github.com/nishuR31" target="_black" ><FaGithub/></a>
                <a href="mailto:bloggernishu31@gmail.com"><FaEnvelope/></a>
            </div>
        </div>
        {/* newsletter subscription */}
        <div>
            <h3 className='text-xl font-semibold animate-bounce'>Stay in the Loop</h3>
            <p className='mt-2 text-sm'>Subscribe us to get future special offers, free giveaways, and more.</p>
            <form action="" className='mt-4 flex'>
                <input 
                type="email" 
                placeholder='Your email address'
                className='w-full p-2 rounded-l-md  text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent backdrop-blur-sm'
                />
        <button 
          type='submit' 
          className='bg-gradient-to-tl from-black/60 via-white/30 to-black/60 text-white px-4 rounded-r-md hover:bg-gradient-to-b hover:from-black/70 hover:via-white/10 hover:to-black/70 transition-all delay-1000'
        >
  Subscribe
</button>
            </form>
        </div>
      </div>
      {/* bottom section */}
      <div className='mt-10 border-t border-gray-700 pt-4 text-center text-sm backdrop-blur-sm'>
        <p className="animate-bounce">&copy; {new Date().getFullYear()} <span className='text-red-500'>Nishu Blog</span>. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer


///////////////////////////////////////////////////