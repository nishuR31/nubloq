import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userLogo from "../assets/user.jpg"

const PopularAuthors = () => {
    const [popularUser, setPopularUser] = useState([])
    const [totalUser, setTotalUser] = useState([])
    const getAllUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/user/all-users`)
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
            <div className="transition-all delay-3000 ease-in-out w-auto mx-auto bg-popularAuthor  bg-cover bg-no-repeat h-full ">
                <div className='flex flex-col space-y-4 items-center bg-transparent'>
                    <h1 className='text-3xl md:text-4xl font-bold pt-10 dark:text-black text-white bg-transparent '>Popular Authors <span className="text-red-500">- {totalUser}</span></h1>
                    <hr className=' w-24 text-center border-2 border-red-500 rounded-full animate-pulse' />
                </div>
                <div className=' bg-transparent flex items-center justify-around my-10 px-4 md:px-0'>
                    {
                        popularUser?.slice(0,10)?.map((user, index) => {
                            return <div key={index} className='flex pb-5 flex-wrap flex-row bg-transparent justify-around '>
                                <img src={user.photoUrl || userLogo} alt={user.userName}  className='rounded-full h-16 w-16 md:w-32 md:h-32' />
                                <p className='font-semibold pb-5  dark:text-black text-white bg-transparent'>{user.firstName} {user.lastName}</p>
                            </div>

                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PopularAuthors
