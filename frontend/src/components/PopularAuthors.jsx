import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userLogo from "../assets/user.jpg"
const api = import.meta.env.VITE_URL;
import "../index.css";
import capitalize from "./capitalize.js"






const PopularAuthors = () => {
    const [popularUser, setPopularUser] = useState([])
    const [totalUser, setTotalUser] = useState([])
    const getAllUsers = async () => {
        try {
            // const res = await axios.get(`http://localhost:4000/api/v1/user/all-users`)
            const res = await axios.get(`${api}/user/all-users`)
            if (res.data.success) {
                setPopularUser(res.data.payload.users)
                setTotalUser(res.data.payload.totalUsers)
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
         <div>
            {popularUser && <div className="hidden w-auto h-full mx-auto transition-all ease-in-out bg-transparent lg:block delay-[2s] ">
                <div className='flex flex-col flex-wrap items-center space-y-4 bg-transparent'>
                    <h1 className='pt-10 text-3xl font-bold text-black bg-transparent md:text-4xl dark:text-white '>Popular Authors <span className="text-muted">- {totalUser}</span></h1>
                    <hr className='w-24 text-center border-2 border-red-500 rounded-full  animate-pulse' />
                </div>
                <div className='flex items-center justify-around px-4 my-10 bg-transparent  md:px-0'>
                    {
                        popularUser?.slice(0,10)?.map((user, index) => {
                            return <div key={index} className='flex flex-col flex-wrap justify-center pb-5 bg-transparent '>
                                <img src={user.photoUrl || `https://placehold.co/250x250?text=${user.userName}&font=playfair-display`} alt={user.userName}  className='rounded-full md:w-32 md:h-32 border-1 border-app' />

                                <p className='pb-5 font-semibold text-black bg-transparent text-center text-app'>{capitalize(user.firstName)}</p>
                            </div>

                        })
                    }
                </div>
            </div>}
        </div>
    )
}

export default PopularAuthors
