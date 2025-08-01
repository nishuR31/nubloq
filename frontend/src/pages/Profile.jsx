// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import userLogo from "../assets/user.jpg";
// import { Facebook, Linkedin, Github, Instagram } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { setUser } from "@/redux/authSlice";
// import TotalProperty from "@/components/TotalProperty";
// import capitalize from "@/components/capitalize";
// const api = import.meta.env.VITE_URL;

// const TextInput = ({ label, name, value, onChange, placeholder }) => (
//   <div>
//     <Label>{label}</Label>
//     <Input
//       id={name}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="col-span-3 text-gray-500"
//     />
//   </div>
// );

// const toBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const Profile = () => {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const { theme } = useSelector((state) => state.theme);

// let [currentUser,setCurrentUser]=useState()

//   const [input, setInput] = useState({
//     firstName: user.firstName??"",
//     lastName: user.lastName??"",
//     occupation: user.occupation??"",
//     email: user.email??"",
//     bio: user.bio??"",
//     facebook: user.facebook??"",
//     linkedin: user.linkedin??"",
//     github: user.github??"",
//     instagram: user.instagram??"",
//     file: null,
//   });

//   useEffect(() => {
//     if (user) {
//       setInput({
//         firstName: input.firstName || "",
//         lastName: input.lastName || "",
//         email: input.email || "",
//         occupation: input.occupation || "",
//         bio: input.bio || "",
//         facebook: input.facebook || "",
//         linkedin: input.linkedin || "",
//         github: input.github || "",
//         instagram: input.instagram || "",
//         file: null,
//       });
//     }
//   }, [user]);

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };

//   const changeFileHandler = (e) => {
//     setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let photoUrl = user.photoUrl || "";
//     if (input.file) {
//       try {
//         photoUrl = await toBase64(input.file);
//       } catch (err) {
//         toast.error(`Image conversion failed : ${err}`);
//         setLoading(false);
//         return;
//       }
//     }

//     const payload = {
//       firstName: input.firstName,
//       lastName: input.lastName,
//       email: input.email,
//       occupation: input.occupation,
//       bio: input.bio,
//       facebook: input.facebook,
//       linkedin: input.linkedin,
//       github: input.github,
//       instagram: input.instagram,
//       photoUrl: user.photoUrl, // base64 string or existing url
//     };

//     console.log(payload);

//     try {
//       // `${api}/user/profile/update`,
//       const res = await axios.patch(
//         `${api}/user/profile/update`,
//         // `http://localhost:4000/api/v1/user/profile/update`,
//         payload,
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         dispatch(setUser(res.data.payload.user));
//         console.log(res.data.payload.user);

//         toast.success(res.data.message);
//         setOpen(false);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="animate-slideInLeft min-h-screen pt-6 md:ml-[250px] transition-all delay-2000 ease-in   bg-fixed bg-no-repeat bg-cover  bg-wave dark:bg-blackWave">
//       <div className="min-w-full mx-auto mt-8 ">
//         <Card className=" flex md:flex-row flex-col gap-10 p-6 md:p-10 bg-transparent backdrop-blur-sm  mx-4 md:mx-0 ">
//           <div className="flex flex-col items-center justify-center md:w-[400px]">
//             <Avatar className="w-40 h-40 border-2 rounded-full outline outline-1 outline-gray-1">
//               <AvatarImage
//                 src={
//                   user?.photoUrl ||
//                   `https://placehold.co/250x250/${
//                     theme === "light" ? "9CA3AF/000000" : "111827/6B7280"
//                   }?text=${user.userName}&font=playfair-display`
//                 }
//                 alt={user?.firstName || "User"}
//               />
//             </Avatar>
//             <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
//               {user?.occupation || "Developer"}
//             </h1>
//             <div className="flex gap-4 items-center">
//               {user?.facebook && (
//                 <Link to={user.facebook} target="_blank">
//                   <Facebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </Link>
//               )}
//               {user?.linkedin && (
//                 <Link to={user.linkedin} target="_blank">
//                   <Linkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </Link>
//               )}
//               {user?.github && (
//                 <Link to={user.github} target="_blank">
//                   <Github className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </Link>
//               )}
//               {user?.instagram && (
//                 <Link to={user.instagram} target="_blank">
//                   <Instagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//                 </Link>
//               )}
//             </div>
//           </div>

//           <div>
//             <h1 className="font-bold text-center md:text-start text-4xl mb-5">
//               Welcome {user?.userName}!
//             </h1>{user?.firstName &&

//             <p className="px-10 w-fit font-bold text-center md:text-start text-lg py-2 mb-3 dark:bg-black/40 bg-white/40 rounded-lg">
//             {capitalize(user?.firstName)}
//             </p>}
//             <p>
//               <span className="font-semibold">Email : </span>
//               {user?.email}
//             </p>
//             <div className="flex flex-col gap-2 items-start justify-start my-5">
//               <Label>About Me</Label>
//               <p className="border dark:border-gray-600 p-6 rounded-lg">
//                 {user?.bio ||
//                   "I'm a passionate web developer and content creator focused on frontend technologies. When I'm not coding, you can find me writing about tech, hiking, or experimenting with new recipes."}
//               </p>
//             </div>

//             <Dialog open={open} onOpenChange={setOpen}>
//               <Button onClick={() => setOpen(true)}>Edit Profile</Button>
//               <DialogContent className="md:w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle className="text-center">
//                     Edit Profile
//                   </DialogTitle>
//                   <DialogDescription className="text-center">
//                     Make changes to your profile here.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="flex gap-2">
//                     <TextInput
//                       label="First Name"
//                       name="firstName"
//                       value={input.firstName}
//                       onChange={changeEventHandler}
//                       placeholder="First Name"
//                     />
//                     <TextInput
//                       label="Last Name"
//                       name="lastName"
//                       value={input.lastName}
//                       onChange={changeEventHandler}
//                       placeholder="Last Name"
//                     />
//                   </div>
//                   <TextInput
//                     label="Occupation"
//                     name="occupation"
//                     value={input.occupation}
//                     onChange={changeEventHandler}
//                     placeholder="Your role / title"
//                   />
//                   <div className="flex gap-2">
//                     <TextInput
//                       label="Facebook"
//                       name="facebook"
//                       value={input.facebook}
//                       onChange={changeEventHandler}
//                       placeholder="Enter a URL"
//                     />
//                     <TextInput
//                       label="Instagram"
//                       name="instagram"
//                       value={input.instagram}
//                       onChange={changeEventHandler}
//                       placeholder="Enter a URL"
//                     />
//                   </div>
//                   <div className="flex gap-2">
//                     <TextInput
//                       label="LinkedIn"
//                       name="linkedin"
//                       value={input.linkedin}
//                       onChange={changeEventHandler}
//                       placeholder="Enter a URL"
//                     />
//                     <TextInput
//                       label="GitHub"
//                       name="github"
//                       value={input.github}
//                       onChange={changeEventHandler}
//                       placeholder="Enter a URL"
//                     />
//                   </div>
//                   <div>
//                     <Label>Bio</Label>
//                     <Textarea
//                       id="bio"
//                       value={input.bio}
//                       onChange={changeEventHandler}
//                       name="bio"
//                       placeholder="Enter a description"
//                       className="col-span-3 text-gray-500"
//                     />
//                   </div>
//                   <div>
//                     <Label>Picture</Label>
//                     <Input
//                       id="file"
//                       type="file"
//                       accept="image/*"
//                       onChange={changeFileHandler}
//                       className="w-[277px]"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   {loading ? (
//                     <Button disabled>
//                       <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
//                       wait
//                     </Button>
//                   ) : (
//                     <Button onClick={submitHandler}>Save Changes</Button>
//                   )}
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </Card>
//       </div>
//       {user && <TotalProperty />}
//     </div>
//   );
// };

// export default Profile;

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Facebook, Linkedin, Github, Instagram, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import TotalProperty from "@/components/TotalProperty";
import capitalize from "@/components/capitalize";
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
        for (let [key, val] of formData.entries()) {
          console.log(`${key}: ${val}`);
        }
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
    <div className="animate-slideInLeft object-cover min-h-screen pt-6 md:ml-[250px] transition-all delay-2000 ease-in bg-fixed bg-no-repeat bg-cover  bg-wave dark:bg-blackWave">
      <div className="min-w-full mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 bg-transparent backdrop-blur-sm mx-4 md:mx-0">
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2 rounded-full outline outline-1 outline-gray-1">
              <AvatarImage
                src={
                  user?.photoUrl ||
                  `https://placehold.co/250x250/${
                    theme === "light" ? "9CA3AF/000000" : "111827/6B7280"
                  }?text=${user.userName}&font=playfair-display`
                }
                alt={user?.firstName || "User"}
              />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user?.occupation || "Developer"}
            </h1>
            <div className="flex gap-4 items-center">
              {user?.facebook && (
                <Link to={user.facebook} target="_blank">
                  <Facebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
              )}
              {user?.linkedin && (
                <Link to={user.linkedin} target="_blank">
                  <Linkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
              )}
              {user?.github && (
                <Link to={user.github} target="_blank">
                  <Github className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
              )}
              {user?.instagram && (
                <Link to={user.instagram} target="_blank">
                  <Instagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h1 className="font-bold text-center md:text-start text-4xl mb-5">
              Welcome {user?.userName}!
            </h1>
            {user?.firstName && (
              <p className="px-10 w-fit font-bold text-center md:text-start text-lg py-2 mb-3 dark:bg-black/40 bg-white/40 rounded-lg">
                {capitalize(user?.firstName)}
              </p>
            )}
            <p>
              <span className="font-semibold">Email : </span>
              {user?.email}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                {user?.bio ||
                  "I'm a passionate web developer and content creator focused on frontend technologies. When I'm not coding, you can find me writing about tech, hiking, or experimenting with new recipes."}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>
              <DialogContent className="md:w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-center">
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
                    />
                    <TextInput
                      label="Last Name"
                      name="lastName"
                      value={input.lastName}
                      onChange={changeEventHandler}
                      placeholder="Last Name"
                    />
                  </div>
                  <TextInput
                    label="Occupation"
                    name="occupation"
                    value={input.occupation}
                    onChange={changeEventHandler}
                    placeholder="Your role / title"
                  />
                  <div className="flex gap-2">
                    <TextInput
                      label="Facebook"
                      name="facebook"
                      value={input.facebook}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                    />
                    <TextInput
                      label="Instagram"
                      name="instagram"
                      value={input.instagram}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                    />
                  </div>
                  <div className="flex gap-2">
                    <TextInput
                      label="LinkedIn"
                      name="linkedin"
                      value={input.linkedin}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
                    />
                    <TextInput
                      label="GitHub"
                      name="github"
                      value={input.github}
                      onChange={changeEventHandler}
                      placeholder="Enter a URL"
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
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                  <div>
                    <Label>Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="w-[277px] bg-transparent w-fit dark:border-gray-300"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
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
