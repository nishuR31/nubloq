import { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import auth from "../assets/auth.jpg"


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user);

useEffect(() => {
  if (user && (user.userName || user._id)) {
    navigate("/"); // Already logged in, redirect home
  } else {
    navigate("/login");
  }
}, [user]);


console.log("user",user);


  const [input, setInput] = useState({
    emailUser: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      
      if (response.data.success) {
        dispatch(setUser(response.data.payload.user))
        toast.success(response.data.message)
        navigate('/')  // ✅ do this last
      }

} catch (error) {
  console.error("Login error:", error?.response?.data || error.message);
  toast.error(error?.response?.data?.message || "Something went wrong. Login failed.");
}

    

  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center h-screen md:pt-14 md:h-[760px] bg-light dark:bg-dark ">

      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl  dark:border-gray-600 bg-transparent backdrop-blur-sm ">
        <CardHeader >
          <CardTitle className=" text-center text-xl font-semibold">Login into your account</CardTitle>
          <p className='text-gray-800 dark:text-gray-200 mt-2 text-sm font-serif text-center'>Enter your details below to login your account</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div>
              <Label>Email/Username</Label>
              <Input type="text"
                placeholder="Email address or your username"
                name="emailUser"
                value={input.emailUser}
                onChange={handleChange}
                className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900 "
              />
            </div>

            <div className="relative">
              <Label>Password</Label>
              <Input type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                name="password"
                value={input.password}
                onChange={handleChange}
                className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900 "
              /> 
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-300 "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <p className='text-center text-gray-300'> <Link to={'/forgot'}><span className='underline cursor-pointer text-gray-300'>Forgot Password?</span></Link></p>
            </div>

            <Button type="submit" className="w-full">Login</Button>
            <p className='text-center text-gray-300'>Don't have an account? <Link to={'/signup'}><span className='underline cursor-pointer text-gray-300'>Sign up</span></Link></p>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default Login


////////////////////////////////////////////////