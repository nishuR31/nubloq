import React from 'react'
import { CircleUserRound,Heart,ChevronsRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import UserLogo from "../assets/user.jpg"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';


//// redux data not get

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {
    const {user} = useSelector(store=>store.auth)

    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between  bg-white/70 dark:bg-black/70 backdrop-blur-lg px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden rounded-r-xl shadow-md transition-all`}>
            <div >
                <div className='flex items-center justify-start gap-3'>
                    {
                        user ? <Avatar className="w-14 h-14">
                        <AvatarImage src={user.photoUrl} size={50} />
                      </Avatar> : <CircleUserRound size={50} className='' />
                    }
                    
                    <div>
                        <h1 className=''>Hello, {user?.userName ?? "User"  }</h1>
                        {/* <h1 className='text-sm text-slate-500'>Premium User</h1> */}
                    </div>
                </div>
                <nav className='mt-12'>
                    <ul className='flex flex-col gap-7 text-2xl font-semibold '>
                        <Link to="/" onClick={() => setOpenNav(false)}><li className='cursor-pointer'>Home</li></Link>
                        <Link to="/blogs" onClick={() => setOpenNav(false)}><li className='cursor-pointer'>Blog</li></Link>
                        <Link to="/about" onClick={() => setOpenNav(false)}><li className='cursor-pointer' >About</li></Link>
                        {
                            user? <Button onClick={()=>{logoutHandler(), setOpenNav(false)}}>Logout</Button> : <Link to={'/signup'} onClick={() => setOpenNav(false)}><Button>Signup</Button></Link>
                        }

                    </ul>
                </nav>
            </div>
            <div className='pb-20'>
                <h1>
                    Made with <Heart/> by Nishan
                </h1>
            </div>
        </div>
    )
}

export default ResponsiveMenu;


////////////////////////////////////