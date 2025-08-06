import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import "../index.css";

import { Label } from "../components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
const api = import.meta.env.VITE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && (user.userName || user._id)) {
      navigate("/"); // Already logged in, redirect home
    } else {
      navigate("/login");
    }
  }, [user]);

  console.log("user", user);

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
      const response = await axios.post(
        // `http://localhost:4000/api/v1/user/login`,
        `${api}/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.payload.user));
        toast.success(response.data.message);
        navigate("/"); // ✅ do this last
      }
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.message || "Something went wrong. Login failed."
      );
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="animate-fadeIn caret-[var(--primary)] transition-all delay-[2s] ease-in-out flex items-center h-screen md:pt-14 md:h-[760px]  bg-transparent">
      <div className="flex items-center justify-center flex-1 px-4 md:px-0">
        <Card className="border-1 border-input w-full max-w-md p-6 bg-transparent shadow-lg rounded-2xl backdrop-blur-sm ">
          <CardHeader>
            <CardTitle className=" animate-bounce text-xl font-semibold text-center text-app ">
              Login into your account
            </CardTitle>
            <p className="mt-2 font-serif text-sm text-center text-muted-fg">
              Enter your details below to login your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4  " onSubmit={handleSubmit}>
              <div>
                <Label className="text-secondary-fg">Email/Username</Label>
                <Input
                  type="text"
                  placeholder="Email address or your username"
                  name="emailUser"
                  value={input.emailUser}
                  onChange={handleChange}
                  className="placeholder:bg-transparent text-accent "
                />
              </div>

              <div className="relative">
                <Label className="text-secondary-fg">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="placeholder:bg-transparent text-accent"
                />
                <button
                  type="button"
                  className="absolute text-app right-3 top-8 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <p className="text-center text-secondary-fg">
                  {" "}
                  <Link to={"/forgot"}>
                    <span className="text-secondary-fg underline cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
                </p>
              </div>

              <Button type="submit" className="w-full bg-primary text-secondary-fg">
                Login
              </Button>
              <p className="text-center text-secondary-fg">
                Don't have an account?{" "}
                <Link to={"/signup"}>
                  <span className="text-secondary-fg hover:underline cursor-pointer">
                    Sign up
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

////////////////////////////////////////////////
