import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
const api = import.meta.env.VITE_URL;



const Signup = () => {

const passwordRegex = {
  matchLower: {
    regex: /(?=.*[a-z])/,
    message: "Password must have a lowercase character [a-z].",
  },
  matchUpper: {
    regex: /(?=.*[A-Z])/,
    message: "Password must have an uppercase character [A-Z].",
  },
  matchDigit: {
    regex: /(?=.*\d)/,
    message:"Password must have a digit [1,2...].",
  },
  matchSymbol: {
    regex: /(?=.*[\W_])/,
    message: "Password must have a symbol [!,@...].",
  },
  matchSpace: {
    regex: /^(?!.*\s)/,
    message:  "Password must not have any spaces between.",
  },
  matchLength: {
    regex: /^.{8,}$/,
    message: "Password must be atleast 8 characters long.",
  },
};
const passwordErrors = [];


    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userName:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)


        for (let key in passwordRegex) {
            const { regex, message } = passwordRegex[key];
            if (!regex.test(user.password)) {
                passwordErrors.push(message);
            }
        }

        if (passwordErrors.length > 0) {
            toast.error(passwordErrors.join("\n"));
            passwordErrors.length=0;
            return; // prevent form submission
        }

        try {
            // const response = await axios.post(`http://localhost:4000/api/v1/user/register`, user, {
            const response = await axios.post(`${api}/user/register`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log(response.data)
            if (response.data.success) {
                navigate('/login')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)


        }

        // try {
        //     dispatch(setLoading(true))
        //     const response = await axios.post("", user, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         withCredentials: true,
        //     });
        //     if (response.data.success) {
        //         navigate('/login')
        //         toast.success(response.data.message)
        //         // setFormData({ name: "", email: "", password: "", role: "" });
        //     } else {
        //         toast(`Error: ${data.message || "Something went wrong"}`);
        //     }
        // } catch (error) {
        //     // toast.error(error.response.data.message);
        //     console.log(error);

        // } finally {
        //     dispatch(setLoading(false))
        // }
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`flex h-screen md:pt-14 bg-login-light dark:bg-login-dark `}>

            <div className="animate-slideInLeft flex justify-center items-center  flex-1 px-4 md:px-0">
                <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-transparent backdrop-blur-sm dark:border-gray-800">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-center text-xl font-semibold ">Create an account</h1>
                        </CardTitle>
                        <p className=' mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to create your account</p>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4  " onSubmit={handleSubmit}>
                            <div className='flex gap-3'>
                                <div>
                                    <Label>First Name</Label>
                                    <Input type="text"
                                        placeholder="Nishan"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900 "
                                    />
                                </div>

                                <div>
                                    <Label>Last Name</Label>
                                    <Input type="text"
                                        placeholder=" "
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900"
                                    />
                                </div>
                            </div>
                                                            <div>
                                    <Label>Username</Label>
                                    <Input type="text"
                                        placeholder="username_"
                                        name="userName"
                                        value={user.userName}
                                        onChange={handleChange}
                                        className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900"
                                    />
                                </div>
                            <div>
                                <Label>Email</Label>
                                <Input type="email"
                                    placeholder="abc123@mail.com"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900"
                                />
                            </div>

                            <div className="relative">
                                <Label>Password</Label>
                                <Input type={showPassword ? "text" : "password"}
                                    placeholder="Create a Password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-8 text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <Button type="submit" className="w-full">Sign Up</Button>
                            <p className='text-center text-gray-300'>Already have an account? <Link to={'/login'}><span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign in</span></Link></p>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default Signup


//////////////////////////////////////////////