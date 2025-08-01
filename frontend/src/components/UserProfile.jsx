import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Linkedin, Github, Instagram,Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import TotalProperty from "@/components/TotalProperty";
import capitalize from "@/components/capitalize";
import axios from "axios";
const api = import.meta.env.VITE_URL;


const TextInput = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <Label>{label}</Label>
    <Input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="col-span-3 text-gray-500"
    />
  </div>
);

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UserProfile = ({ id }) => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const isSelf = !id || id === user?._id;
  const [targetUser, setTargetUser] = useState(isSelf ? user : null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    bio: "",
    facebook: "",
    linkedin: "",
    github: "",
    instagram: "",
    file: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const res = await axios.get(`${api}user/profile/${id}`, {
        //   const res = await axios.get(`${api}user/${id}`, {
        //   const res = await axios.get(`${api}user/rofile${id}`, {
          withCredentials: true,
        });
        setTargetUser(res.data.payload.user);
      } catch (err) {
        toast.error("Failed to fetch user");
        console.error(err);
      }
    };

    if (!isSelf) fetchUser();
  }, [id, isSelf]);

  useEffect(() => {
    if (targetUser) {
      setInput({
        firstName: targetUser.firstName || "",
        lastName: targetUser.lastName || "",
        occupation: targetUser.occupation || "",
        bio: targetUser.bio || "",
        facebook: targetUser.facebook || "",
        linkedin: targetUser.linkedin || "",
        github: targetUser.github || "",
        instagram: targetUser.instagram || "",
        file: null,
      });
    }
  }, [targetUser]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    let photoUrl = targetUser.photoUrl || "";
    if (input.file) {
      try {
        photoUrl = await toBase64(input.file);
      } catch (err) {
        toast.error("Image conversion failed");
        setLoading(false);
        return;
      }
    }

    const payload = {
      firstName: input.firstName,
      lastName: input.lastName,
      occupation: input.occupation,
      bio: input.bio,
      facebook: input.facebook,
      linkedin: input.linkedin,
      github: input.github,
      instagram: input.instagram,
      photoUrl,
    };

    try {
      const res = await axios.put(`${api}user/profile/update`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.payload.user));
        setTargetUser(res.data.payload.user);
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!targetUser) return <div className="text-center py-20">Loading user...</div>;

  return (
<div className="flex flex-col animate-slideInLeft py-10 px-5 text-justify  transition-all delay-3000 ease-in bg-cover  bg-no-repeat dark:bg-left dark:bg-cover min-h-screen bg-wave dark:bg-blackWave w-full mx-auto p-6 text-gray-800 dark:text-gray-200">
    {/* <div className="animate-slideInLeft md:h-fit pt-20 md:ml-[320px] bg-gray-200 dark:bg-gray-700"> */}
      <div className="max-w-6xl mx-auto mt-8 ">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0 bg-[#D0D0DD]">
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2 rounded-full outline outline-1 outline-gray-1">
              <AvatarImage
                src={
                  targetUser?.photoUrl ||
                  `https://placehold.co/250x250/${
                    theme === "light" ? "9CA3AF/000000" : "111827/6B7280"
                  }?text=${targetUser.userName}&font=playfair-display`
                }
                alt={targetUser?.firstName || "User"}
              />
            </Avatar>
            <h1 className="my-3 text-xl font-semibold text-center text-gray-700 dark:text-gray-300">
              {targetUser?.occupation || "Developer"}
            </h1>
            <div className="flex items-center gap-4">
              {targetUser?.facebook && (
                <a href={targetUser.facebook} target="_blank" rel="noreferrer">
                  <Facebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {targetUser?.linkedin && (
                <a href={targetUser.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {targetUser?.github && (
                <a href={targetUser.github} target="_blank" rel="noreferrer">
                  <Github className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {targetUser?.instagram && (
                <a href={targetUser.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h1 className="mb-5 text-4xl font-bold text-center md:text-start">
              Welcome {targetUser?.userName}!
            </h1>
            {targetUser?.firstName && (
              <p className="px-10 py-2 mb-3 text-lg font-bold text-center rounded-lg w-fit md:text-start dark:bg-black/40 bg-white/40">
                {capitalize(targetUser?.firstName)}
              </p>
            )}
            <p>
              <span className="font-semibold">Email : </span>
              {targetUser?.email}
            </p>
            <div className="flex flex-col items-start justify-start gap-2 my-5">
              <Label>About Me</Label>
              <p className="p-6 border rounded-lg dark:border-gray-600">
                {targetUser?.bio ||
                  "I'm a passionate web developer focused on frontend technologies. When I'm not coding, I'm learning and exploring."}
              </p>
            </div>

            {isSelf && (
              <Dialog open={open} onOpenChange={setOpen}>
                <Button onClick={() => setOpen(true)}>Edit Profile</Button>
                <DialogContent className="md:w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">Edit Profile</DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex gap-2">
                      <TextInput label="First Name" name="firstName" value={input.firstName} onChange={changeEventHandler} placeholder="First Name" />
                      <TextInput label="Last Name" name="lastName" value={input.lastName} onChange={changeEventHandler} placeholder="Last Name" />
                    </div>
                    <TextInput label="Occupation" name="occupation" value={input.occupation} onChange={changeEventHandler} placeholder="Your role / title" />
                    <div className="flex gap-2">
                      <TextInput label="Facebook" name="facebook" value={input.facebook} onChange={changeEventHandler} placeholder="Enter a URL" />
                      <TextInput label="Instagram" name="instagram" value={input.instagram} onChange={changeEventHandler} placeholder="Enter a URL" />
                    </div>
                    <div className="flex gap-2">
                      <TextInput label="LinkedIn" name="linkedin" value={input.linkedin} onChange={changeEventHandler} placeholder="Enter a URL" />
                      <TextInput label="GitHub" name="github" value={input.github} onChange={changeEventHandler} placeholder="Enter a URL" />
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea id="bio" value={input.bio} onChange={changeEventHandler} name="bio" placeholder="Enter a description" className="col-span-3 text-gray-500" />
                    </div>
                    <div>
                      <Label>Picture</Label>
                      <Input id="file" type="file" accept="image/*" onChange={changeFileHandler} className="w-[277px]" />
                    </div>
                  </div>
                  <DialogFooter>
                    {loading ? (
                      <Button disabled>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
                      </Button>
                    ) : (
                      <Button onClick={submitHandler}>Save Changes</Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </Card>
      </div>
      {targetUser && <TotalProperty />}
    </div>
  );
};

export default UserProfile;
