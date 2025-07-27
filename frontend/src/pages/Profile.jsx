import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from "../assets/user.jpg"
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import TotalProperty from '@/components/TotalProperty'

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
)

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const Profile = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    bio: '',
    facebook: '',
    linkedin: '',
    github: '',
    instagram: '',
    file: null,
  })

  useEffect(() => {
    if (user) {
      setInput({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        occupation: user.occupation || '',
        bio: user.bio || '',
        facebook: user.facebook || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        instagram: user.instagram || '',
        file: null,
      })
    }
  }, [user])

  const changeEventHandler = (e) => {
    const { name, value } = e.target
    setInput(prev => ({ ...prev, [name]: value }))
  }

  const changeFileHandler = (e) => {
    setInput(prev => ({ ...prev, file: e.target.files?.[0] }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    let photoUrl = user.photoUrl || ""
    if (input.file) {
      try {
        photoUrl = await toBase64(input.file)
      } catch (err) {
        toast.error("Image conversion failed")
        setLoading(false)
        return
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
      photoUrl:photoUrl, // base64 string or existing url
    }

    console.log(payload);
    
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/user/profile/update`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        dispatch(setUser(res.data.payload.user))
        console.log(res.data.payload.user);
        
        toast.success(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='pt-20 md:ml-[320px] md:h-screen'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          <div className='flex flex-col items-center justify-center md:w-[400px]'>
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={user?.photoUrl || userLogo} alt={user?.firstName || "User"} />
            </Avatar>
            <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3'>
              {user?.occupation || "MERN Stack Developer"}
            </h1>
            <div className='flex gap-4 items-center'>
              {user?.facebook && (
                <Link to={user.facebook} target="_blank">
                  <FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
              )}
              {user?.linkedin && (
                <Link to={user.linkedin} target="_blank">
                  <FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
              )}
              {user?.github && (
                <Link to={user.github} target="_blank">
                  <FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
              )}
              {user?.instagram && (
                <Link to={user.instagram} target="_blank">
                  <FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome {user?.firstName}!</h1>
            <p><span className='font-semibold'>Email : </span>{user?.email}</p>
            <div className='flex flex-col gap-2 items-start justify-start my-5'>
              <Label>About Me</Label>
              <p className='border dark:border-gray-600 p-6 rounded-lg'>
                {user?.bio || "I'm a passionate web developer and content creator focused on frontend technologies. When I'm not coding, you can find me writing about tech, hiking, or experimenting with new recipes."}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>
              <DialogContent className="md:w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">Edit Profile</DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex gap-2'>
                    <TextInput label="First Name" name="firstName" value={input.firstName} onChange={changeEventHandler} placeholder="First Name" />
                    <TextInput label="Last Name" name="lastName" value={input.lastName} onChange={changeEventHandler} placeholder="Last Name" />
                  </div>
                  <TextInput label="Occupation" name="occupation" value={input.occupation} onChange={changeEventHandler} placeholder="Your role / title" />
                  <div className='flex gap-2'>
                    <TextInput label="Facebook" name="facebook" value={input.facebook} onChange={changeEventHandler} placeholder="Enter a URL" />
                    <TextInput label="Instagram" name="instagram" value={input.instagram} onChange={changeEventHandler} placeholder="Enter a URL" />
                  </div>
                  <div className='flex gap-2'>
                    <TextInput label="LinkedIn" name="linkedin" value={input.linkedin} onChange={changeEventHandler} placeholder="Enter a URL" />
                    <TextInput label="GitHub" name="github" value={input.github} onChange={changeEventHandler} placeholder="Enter a URL" />
                  </div>
                  <div>
                    <Label>Description</Label>
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
                      className="w-[277px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {
                    loading
                      ? <Button disabled><Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait</Button>
                      : <Button onClick={submitHandler}>Save Changes</Button>
                  }
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
      {user && <TotalProperty />}
    </div>
  )
}

export default Profile
