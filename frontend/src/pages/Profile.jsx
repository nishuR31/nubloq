import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Facebook, Linkedin, Github, Instagram, Loader2,Pen } from "lucide-react";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import "../index.css";


import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import TotalProperty from "../components/TotalProperty";
import capitalize from "../components/capitalize";
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

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((state) => state.theme);

  const [input, setInput] = useState({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    occupation: user.occupation ?? "",
    email: user.email ?? "",
    bio: user.bio ?? "",
    facebook: user.facebook ?? "",
    linkedin: user.linkedin ?? "",
    github: user.github ?? "",
    instagram: user.instagram ?? "",
    photoUrl: "",
  });

  useEffect(() => {
    if (user) {
      setInput({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        occupation: user.occupation || "",
        bio: user.bio || "",
        facebook: user.facebook || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        instagram: user.instagram || "",
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({
        ...prev,
        photoUrl: file,
      }));
    }
  };
  // const changeFileHandler = (e) => {
  //   setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("email", input.email);
    formData.append("occupation", input.occupation);
    formData.append("bio", input.bio);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("github", input.github);
    formData.append("instagram", input.instagram);
    if (input.photoUrl) {
      formData.append("file", input.photoUrl);
    }

    for (let [key, val] of formData.entries()) {
      console.log(`${key}: ${val}`);
    }

    try {
      setLoading(true);
      const res = await axios.patch(`${api}/user/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.payload.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error.res?.data?.message);
      toast.error(error.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn object-cover min-h-screen pt-6 md:ml-[250px] transition-all delay-2000 ease-in bg-fixed bg-no-repeat bg-cover bg-bg ">
      <div className="min-w-full mx-auto mt-8">
        <Card className="flex flex-col gap-10 p-6 mx-4 bg-transparent text-app md:flex-row md:p-10 backdrop-blur-sm md:mx-0">
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40  rounded-full border-1 border-input">
              <AvatarImage
                src={
                  user?.photoUrl ||
                  `https://placehold.co/250x250/${
                    theme === "light" ? "9CA3AF/000000" : "111827/6B7280"
                  }?text=${user.userName}&font=playfair-display`
                }
                alt={user?.firstName || "A Visionary"}
              />
            </Avatar>
            <h1 className="my-3 text-xl font-semibold text-center text-secondary-fg">
              {user?.occupation || "Blogger"}
            </h1>
            <div className="flex items-center gap-4">
              {user?.facebook && (
                <Link to={user.facebook} target="_blank">
                  <Facebook className="w-6 h-6 text-primary" />
                </Link>
              )}
              {user?.linkedin && (
                <Link to={user.linkedin} target="_blank">
                  <Linkedin className="w-6 h-6 text-primary" />
                </Link>
              )}
              {user?.github && (
                <Link to={user.github} target="_blank">
                  <Github className="w-6 h-6 text-primary" />
                </Link>
              )}
              {user?.instagram && (
                <Link to={user.instagram} target="_blank">
                  <Instagram className="w-6 h-6 text-primary" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h1 className="mb-5 text-4xl font-bold text-center md:text-start ">
              Welcome <span className="text-primary">{user?.userName || "User"}</span>!
            </h1>
            {user?.firstName && (
              <p className="px-10 py-2 mb-3 text-lg font-bold text-center text-muted-fg rounded-lg w-fit md:text-start bg-secondary ">
                {capitalize(user?.firstName)}
              </p>
            )}
            <p>
              <span className="font-semibold text-secondary-fg">Email : </span>
              <span className="text-accent-fg ">{user?.email}</span>
            </p>
            <div className="flex flex-col items-start justify-start text-app gap-2 my-5">
              <Label>About Me</Label>
              <p className="p-6 border rounded-lg text-secondary-fg">
                {user?.bio ||
                  "I'm a curious storyteller with a passion for exploring ideas, learning things, asking questions, and connecting the dots across disciplines. I thrive on learning new things, sharing thoughtful insights, and finding creativity in everyday moments. Whether it’s writing, observing the world, or just going for a walk, I believe every experience has a story worth telling. Outside of work, I enjoy hiking, experimenting with new recipes, and getting lost in good conversations or great books."}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button className="text-secondary-fg bg-primary" onClick={() => setOpen(true)}><Pen/>Edit Profile</Button>
              <DialogContent className="w-auto align-middle h-fit line-clamp-none bg-bg  rounded-md ">
                <DialogHeader>
                  <DialogTitle className="text-center  text-secondary-fg">
                    <Pen className=" text-secondary-fg"/>Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-center text-secondary-fg">
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex gap-2">
                    <TextInput
                      label="First Name"
                      name="firstName"
                      value={input.firstName}
                      onChange={changeEventHandler}
                      placeholder="First Name"
                      className="text-secondary-fg bg-transparent"
                    />
                    <TextInput
                      label="Last Name"
                      name="lastName"
                      value={input.lastName}
                      onChange={changeEventHandler}
                      placeholder="Last Name"
                      className="text-secondary-fg bg-transparent"

                    />
                  </div>
                  <TextInput
                    label="Occupation"
                    name="occupation"
                    value={input.occupation}
                    onChange={changeEventHandler}
                    placeholder="Your role / title"
                      className="text-secondary-fg bg-transparent"

                  />
                  <div className="flex gap-2">
                    <TextInput
                      label="Facebook"
                      name="facebook"
                      value={input.facebook}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                      className="text-secondary-fg bg-transparent"

                    />
                    <TextInput
                      label="Instagram"
                      name="instagram"
                      value={input.instagram}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                      className="text-secondary-fg bg-transparent"

                    />
                  </div>
                  <div className="flex gap-2">
                    <TextInput
                      label="LinkedIn"
                      name="linkedin"
                      value={input.linkedin}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                      className="text-secondary-fg bg-transparent"

                    />
                    <TextInput
                      label="GitHub"
                      name="github"
                      value={input.github}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                      className="text-secondary-fg bg-transparent"

                    />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      id="bio"
                      value={input.bio}
                      onChange={changeEventHandler}
                      name="bio"
                      placeholder="Enter a description"
                      className="col-span-3 text-secondary-fg bg-transparent"

                    />
                  </div>
                  <div>
                    <Label>Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="w-[277px] text-secondary-fg bg-transparent w-fit "
                    />
                  </div>
                </div>
                <DialogFooter>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please
                      wait
                    </Button>
                  ) : (
                    <Button onClick={submitHandler}>Save Changes</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
      {user && <TotalProperty />}
    </div>
  );
};

export default Profile;
