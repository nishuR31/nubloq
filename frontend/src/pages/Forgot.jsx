import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import  {Link} from "react-router-dom"
import { toast } from "sonner";
import axios from "axios";
const api = import.meta.env.VITE_URL;
import "../index.css";




const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendOtpHandler = async () => {
    if (!email) return toast.error("Email is required");
    console.log("email:", email);
    try {
      const res = await axios.post(
        `${api}/forgot/send-otp`,
        // "http://localhost:4000/api/v1/forgot/send-otp",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(`OTP sent to your email : ${res.data.payload.email}`);
        setOtpSent(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
      console.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post(
        `${api}/forgot/verify-otp`,
        // "http://localhost:4000/api/v1/forgot/verify-otp",
        { email, otp }
      );
      if (res.data.success) {
        toast.success("OTP verified");
        setVerified(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
      console.error(error?.response?.data?.message || "Invalid OTP");
    }
  };

  const resetPasswordHandler = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:4000/api/v1/forgot/reset-password",
        `${api}/forgot/reset-password`,
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        toast.success("Password updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset failed");
      console.error(error?.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="animate-slideInLeft  flex items-center h-screen md:pt-14 md:h-[760px] bg-login-light dark:bg-login-dark">
      <div className="flex items-center justify-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 bg-transparent shadow-lg rounded-2xl dark:border-gray-600 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Forgot Password
            </CardTitle>
            <p className="mt-2 font-serif text-sm text-center text-gray-800 dark:text-gray-200">
              Enter your email to receive an OTP and reset your password
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent dark:placeholder:text-gray-600 placeholder:text-gray-300"
                />
                <Button className="w-full mt-2" onClick={sendOtpHandler}>
                  Send OTP
                </Button>
                <div className="flex flex-row flex-wrap justify-between pt-1">
                  
                  <p className="text-center text-gray-300">
                  {" "}
                  <Link to={"/login"}>
                    <span className="text-gray-300 underline cursor-pointer">
                      Remember Password?
                    </span>
                  </Link>
                </p>
                <p className="text-center text-gray-300">
                  {" "}
                  <Link to={"/signup"}>
                    <span className="text-gray-300 underline cursor-pointer">
                      New user?
                    </span>
                  </Link>
                </p>
                
                
                </div>
              </div>

              {otpSent && !verified && (
                <>
                  <div>
                    <Label>OTP</Label>
                    <Input
                      type="text"
                      placeholder="Enter the OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900"
                    />
                  </div>
                  <Button className="w-full" onClick={verifyOtpHandler}>
                    Verify OTP
                  </Button>
                </>
              )}

              {verified && (
                <>
                  <div className="relative">
                    <Label>New Password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="dark:placeholder:text-gray-600 placeholder:text-gray-300 dark:border-gray-600 dark:bg-gray-900"
                    />
                    <button
                      type="button"
                      className="absolute text-gray-300 right-3 top-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <Button className="w-full" onClick={resetPasswordHandler}>
                    Reset Password
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
