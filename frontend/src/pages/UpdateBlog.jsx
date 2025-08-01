// // import { Card } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import React, { useRef, useState } from "react";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectGroup,
// //   SelectItem,
// //   SelectLabel,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Button } from "@/components/ui/button";
// // import JoditEditor from "jodit-react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { setBlog } from "@/redux/blogSlice";

// // const UpdateBlog = () => {
// //   const editor = useRef(null);

// //   const [loading, setLoading] = useState(false);
// //   const [publish, setPublish] = useState(false);
// //   const params = useParams();
// //   const id = params.blogId;
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const { blog } = useSelector((store) => store.blog);
// //   const selectBlog = blog.find((blog) => blog._id === id);
// //   const [content, setContent] = useState(selectBlog.bio);

// //   const [blogData, setBlogData] = useState({
// //     title: selectBlog?.title,
// //     subtitle: selectBlog?.subtitle,
// //     bio: content,
// //     category: selectBlog?.category,
// //   });
// //   const [previewThumbnail, setPreviewThumbnail] = useState(
// //     selectBlog?.thumbnail
// //   );

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setBlogData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const selectCategory = (value) => {
// //     setBlogData({ ...blogData, category: value });
// //   };

// //   const selectThumbnail = (e) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setBlogData({ ...blogData, thumbnail: file });
// //       const fileReader = new FileReader();
// //       fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
// //       fileReader.readAsDataURL(file);
// //     }
// //   };

// //   const updateBlogHandler = async () => {
// //     const formData = new FormData();
// //     formData.append("title", blogData.title);
// //     formData.append("subtitle", blogData.subtitle);
// //     formData.append("bio", blogData.bio);
// //     formData.append("category", blogData.category);
// //     formData.append("file", blogData.thumbnail);

// //         for(let key in formData){
// //             console.table(formData[key])
// //         }

// //     try {
// //       setLoading(true);
// //       const res = await axios.patch(
// //         `http://localhost:4000/api/v1/blog/${id}`,
// //         formData,
// //         {
// //           // headers: {
// //           // "Content-Type": "application/json",
// //           // },
// //           withCredentials: true,
// //         }
// //       );
// //       if (res.data.success) {
// //         toast.success(res.data.message);
// //         // dispatch(setBlog(prev=>[...prev, res.data.payload.blog]));
// //         dispatch(
// //           setBlog((prev) =>
// //             prev.map((b) => (b._id === id ? res.data.payload.blog : b))
// //           )
// //         );

// //         console.log("blog:",blog);
// //       }
// //     } catch (error) {
// //       console.error(error.response?.data?.message || "Something went wrong");
// //       toast.error(error.response?.data?.message || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const togglePublishUnpublish = async (action) => {
// //     console.log("togglePublishUnpublish");

// //     try {
// //       const res = await axios.patch(
// //         `http://localhost:4000/api/v1/blog/${id}?publish=${action}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );
// //       if (res.data.success) {
// //         setPublish(!publish);
// //         toast.success(res.data.message);
// //         navigate(`/dashboard/your-blog`);
// //       } else {
// //         toast.error("Failed to Publish.");
// //       }
// //     } catch (error) {
// //     console.error(error.response?.data?.message || "Something went wrong");
// //           toast.error(error.response?.data?.message || "Something went wrong");

// //     }
// //   };

// //   const deleteBlog = async () => {
// //     try {
// //       const res = await axios.delete(
// //         `http://localhost:4000/api/v1/blog/delete/${id}`,
// //         { withCredentials: true }
// //       );
// //       if (res.data.success) {
// //         const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
// //         dispatch(setBlog(updatedBlogData));
// //         toast.success(res.data.message);
// //         navigate("/dashboard/your-blog");
// //       }
// //       console.log(res.data.message);
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("something went error");
// //     }
// //   };

// //   return (
// //     <div className="pb-10 px-3 pt-20 md:ml-[320px]">
// //       <div className="max-w-6xl mx-auto mt-8">
// //         <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
// //           <h1 className=" text-4xl font-bold ">Basic Blog Information</h1>
// //           <p className="">
// //             Make changes to your blogs here. Click publish when you're done.
// //           </p>
// //           <div className="space-x-2">
// //             <Button
// //               onClick={() =>
// //                 togglePublishUnpublish(
// //                   selectBlog.isPublished ? "false" : "true"
// //                 )
// //               }
// //             >
// //               {selectBlog?.isPublished ? "UnPublish" : "Publish"}
// //             </Button>
// //             <Button variant="destructive" onClick={deleteBlog}>
// //               Remove Course
// //             </Button>
// //           </div>
// //           <div className="pt-10">
// //             <Label>Title</Label>
// //             <Input
// //               type="text"
// //               placeholder="Enter a title"
// //               name="title"
// //               value={blogData.title}
// //               onChange={handleChange}
// //               className="dark:border-gray-300"
// //             />
// //           </div>
// //           <div>
// //             <Label>Subtitle</Label>
// //             <Input
// //               type="text"
// //               placeholder="Enter a subtitle"
// //               name="subtitle"
// //               value={blogData.subtitle}
// //               onChange={handleChange}
// //               className="dark:border-gray-300"
// //             />
// //           </div>
// //           <div>
// //             <Label>Description</Label>
// //             <JoditEditor
// //               ref={editor}
// //               value={blogData.bio}
// //               onChange={(newContent) => setContent(newContent)}
// //               className="jodit_toolbar"
// //             />
// //           </div>
// //           <div>
// //             <Label>Category</Label>
// //             <Select
// //               onValueChange={selectCategory}
// //               className="dark:border-gray-300"
// //               value={blogData.category}
// //             >
// //               <SelectTrigger className="w-[180px]">
// //                 <SelectValue placeholder="Select a category" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectGroup>
// //                   <SelectLabel>Category</SelectLabel>
// //                   <SelectItem value="Web Development">
// //                     Web Development
// //                   </SelectItem>
// //                   <SelectItem value="Digital Marketing">
// //                     Digital Marketing
// //                   </SelectItem>
// //                   <SelectItem value="Blogging">Blogging</SelectItem>
// //                   <SelectItem value="Photography">Photography</SelectItem>
// //                   <SelectItem value="Cooking">Cooking</SelectItem>
// //                   <SelectItem value="Soft Development">
// //                     Soft Development
// //                   </SelectItem>
// //                   <SelectItem value="Gaming">Gaming</SelectItem>
// //                   <SelectItem value="Teaching">Teaching</SelectItem>
// //                   <SelectItem value="Playing">Playing</SelectItem>
// //                   <SelectItem value="Art">Art</SelectItem>
// //                 </SelectGroup>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div>
// //             <Label>Thumbnail</Label>
// //             <Input
// //               id="file"
// //               type="file"
// //               onChange={selectThumbnail}
// //               accept="image/*"
// //               className="w-fit bg-transparent dark:border-gray-300"
// //             />
// //             {previewThumbnail && (
// //               <img
// //                 src={previewThumbnail}
// //                 className="w-64 my-2"
// //                 alt="Course Thumbnail"
// //               />
// //             )}
// //           </div>
// //           <div className="flex gap-3">
// //             <Button variant="outline" onClick={() => navigate(-1)}>
// //               Back
// //             </Button>
// //             <Button disabled={loading}  onClick={updateBlogHandler}>
// //               {loading ? "Please Wait" : "Save"}
// //             </Button>
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateBlog;

// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import JoditEditor from "jodit-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { setBlog } from "@/redux/blogSlice";

// const UpdateBlog = () => {
//   const editor = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [publish, setPublish] = useState(false);
//   const params = useParams();
//   const id = params.blogId;
//   console.log("id:",id)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { blog } = useSelector((store) => store.blog);
//   const selectBlog = blog.find((blog) => blog._id === id);

// useEffect(() => {
//   if (selectBlog) {
//     setBlogData({
//       title: selectBlog.title,
//       subtitle: selectBlog.subtitle,
//       bio: selectBlog.bio,
//       category: selectBlog.category,
//       thumbnail: null,
//     });
//     setPreviewThumbnail(selectBlog.thumbnail || "");
//   } else {
//     toast.error("Blog not found");
//     navigate("/dashboard/your-blog");
//   }
// }, [selectBlog, navigate]);

//   // useEffect(() => {
//   //   if (!selectBlog) {
//   //     toast.error("Blog not found");
//   //     navigate("/dashboard/your-blog");
//   //   }
//   // }, [selectBlog, navigate]);

//   const [blogData, setBlogData] = useState({
//     title: selectBlog?.title || "",
//     subtitle: selectBlog?.subtitle || "",
//     bio: selectBlog?.bio || "",
//     category: selectBlog?.category || "",
//     thumbnail: null,
//   });

//   const [previewThumbnail, setPreviewThumbnail] = useState(
//     selectBlog?.thumbnail || ""
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const selectCategory = (value) => {
//     setBlogData((prev) => ({
//       ...prev,
//       category: value,
//     }));
//   };

//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setBlogData((prev) => ({
//         ...prev,
//         thumbnail: file,
//       }));
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewThumbnail(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const updateBlogHandler = async () => {
//     const formData = new FormData();
//     formData.append("title", blogData.title);
//     formData.append("subtitle", blogData.subtitle);
//     formData.append("bio", blogData.bio);
//     formData.append("category", blogData.category);
//     if (blogData.thumbnail) {
//       formData.append("file", blogData.thumbnail); //file
//     }

//     try {
//       setLoading(true);
//       const res = await axios.patch(
//         `http://localhost:4000/api/v1/blog/${id}`,
//         formData,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(
//           setBlog((prev) =>
//             prev.map((b) => (b._id === id ? res.data.payload.blog : b))
//           )
//         );
//         navigate("/dashboard/your-blog");
//       }
//     } catch (error) {
//       console.error(error?.response?.data?.message || "Something went wrong");
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePublishUnpublish = async (action) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:4000/api/v1/blog/${id}?publish=${action}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setPublish(!publish);
//         toast.success(res.data.message);
//         navigate(`/dashboard/your-blog`);
//       } else {
//         toast.error("Failed to update publish state.");
//         console.error("Failed to update publish state.");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//       console.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const deleteBlog = async () => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:4000/api/v1/blog/delete/${id}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedBlogs = blog.filter((b) => b._id !== id);
//         dispatch(setBlog(updatedBlogs));
//         toast.success(res.data.message);
//         navigate("/dashboard/your-blog");
//       }
//     } catch (error) {
//       toast.error("Something went wrong while deleting.");
//       console.log("error: ",error)
//     }
//   };

//   return (
//     <div className="pb-10 px-3 pt-20 md:ml-[320px]">
//       <div className="max-w-6xl mx-auto mt-8">
//         <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
//           <h1 className="text-4xl font-bold">Basic Blog Information</h1>
//           <p>Make changes to your blogs here. Click publish when you're done.</p>

//           <div className="space-x-2">
//             <Button
//               onClick={() =>
//                 togglePublishUnpublish(
//                   selectBlog?.isPublished ? "false" : "true"
//                 )
//               }
//             >
//               {selectBlog?.isPublished ? "UnPublish" : "Publish"}
//             </Button>
//             <Button variant="destructive" onClick={deleteBlog}>
//               Remove Blog
//             </Button>
//           </div>

//           <div className="pt-10">
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="title"
//               placeholder="Enter a title"
//               value={blogData.title}
//               onChange={handleChange}
//               className="dark:border-gray-300"
//             />
//           </div>

//           <div>
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subtitle"
//               placeholder="Enter a subtitle"
//               value={blogData.subtitle}
//               onChange={handleChange}
//               className="dark:border-gray-300"
//             />
//           </div>

//           <div>
//             <Label>Description</Label>
//             <JoditEditor
//               ref={editor}
//               value={blogData.bio}
//               onChange={(newContent) =>
//                 setBlogData((prev) => ({ ...prev, bio: newContent }))
//               }
//               className="jodit_toolbar"
//             />
//           </div>

//           <div>
//             <Label>Category</Label>
//             <Select
//               value={blogData.category}
//               onValueChange={selectCategory}
//             >
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Category</SelectLabel>
//                   {[
//                     "Web Development",
//                     "Digital Marketing",
//                     "Blogging",
//                     "Photography",
//                     "Cooking",
//                     "Soft Development",
//                     "Gaming",
//                     "Teaching",
//                     "Playing",
//                     "Art",
//                   ].map((cat) => (
//                     <SelectItem key={cat} value={cat}>
//                       {cat}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Thumbnail</Label>
//             <Input
//               id="file"
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit bg-transparent dark:border-gray-300"
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 className="w-64 my-2"
//                 alt="Blog Thumbnail"
//               />
//             )}
//           </div>

//           <div className="flex gap-3">
//             <Button variant="outline" onClick={() => navigate(-1)}>
//               Back
//             </Button>
//             <Button disabled={loading} onClick={updateBlogHandler}>
//               {loading ? "Please Wait" : "Save"}
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default UpdateBlog;

// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import JoditEditor from "jodit-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { setBlog } from "@/redux/blogSlice";
// const api = import.meta.env.VITE_URL;



// const UpdateBlog = () => {
//   const editor = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [publish, setPublish] = useState(false);
//   // const params = useParams();
//   // const id = params.blogId;
//   const { blogId } = useParams(); // not `id`!
//   let id = blogId;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { blog } = useSelector((store) => store.blog);
//   const selectBlog = blog.find((b) => b._id === id);

//   const [blogData, setBlogData] = useState({
//     title: blog.title,
//     subtitle: blog.subtitle,
//     bio: blog.bio,
//     category: blog.category,
//     thumbnail:blog.thumbnail?? null,
//   });

//   const [previewThumbnail, setPreviewThumbnail] = useState("");

//   useEffect(() => {
//     if (selectBlog) {
//       setBlogData({
//         title: selectBlog.title || "",
//         subtitle: selectBlog.subtitle || "",
//         bio: selectBlog.bio || "",
//         category: selectBlog.category || "",
//         thumbnail: selectBlog.thumbnail??"",
//       });
//       setPreviewThumbnail(selectBlog.thumbnail || "");
//     } else {
//       toast.error("Blog not found");
//       navigate("/dashboard/your-blog");
//     }
//   }, [selectBlog, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const selectCategory = (value) => {
//     setBlogData((prev) => ({
//       ...prev,
//       category: value,
//     }));
//   };

//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setBlogData((prev) => ({
//         ...prev,
//         thumbnail: file,
//       }));
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewThumbnail(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const updateBlogHandler = async () => {
//     const formData = new FormData();
//     formData.append("title", blogData.title);
//     formData.append("subtitle", blogData.subtitle);
//     formData.append("bio", blogData.bio);
//     formData.append("category", blogData.category);
//     if (blogData.thumbnail) {
//       formData.append("file", blogData.thumbnail);
//     }

//     console.log("Sending data:", blogData);

//     try {
//       setLoading(true);
//       const res = await axios.patch(
//         // `${api}/blog/${id}`,
//         `http://localhost:4000/api/v1/blog/${id}`,
//         formData,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(
//           setBlog((prev) =>
//             prev.map((b) => (b._id === id ? res.data.payload.blog : b))
//           )
//         );
//         navigate("/dashboard/your-blog");
//       }
//     } catch (error) {
//       console.error(error?.response?.data?.message || "Something went wrong");
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePublishUnpublish = async (action) => {
//     try {
//       const res = await axios.get(
//         // `${api}/blog/${id}/publish?q=${action}`
//         `http://localhost:4000/api/v1/blog/${id}/publish?q=${action}`
//       );
//       if (res.data.success) {
//         setPublish(!publish);
//         toast.success(res.data.message);
//         navigate(`/dashboard/your-blog`);
//       } else {
//         toast.error("Failed to update publish state.");
//         console.error("Failed to update publish state.");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//       console.error(error);
//     }
//   };

//   const deleteBlog = async () => {
//     try {
//       const res = await axios.delete(
//         // `${api}/blog/delete/${id}`,
//         `http://localhost:4000/api/v1/blog/delete/${id}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedBlogs = blog.filter((b) => b._id !== id);
//         dispatch(setBlog(updatedBlogs));
//         toast.success(res.data.message);
//         navigate("/dashboard/your-blog");
//       }
//     } catch (error) {
//       toast.error("Something went wrong while deleting.");
//       console.log("error: ", error);
//     }
//   };

//   // Loading fallback if blog data isn't ready
//   if (!selectBlog)
//     return <div className="text-center py-20">Loading blog...</div>;

//   return (
//     <div className="animate-slideInLeft pb-10 px-3 pt-20 md:ml-[320px]">
//       <div className="max-w-6xl mx-auto mt-8">
//         <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
//           <h1 className="text-4xl font-bold">Basic Blog Information</h1>
//           <p>
//             Make changes to your blogs here. Click publish when you're done.
//           </p>

//           <div className="space-x-2">
//             <Button
//               onClick={() =>
//                 togglePublishUnpublish(
//                   selectBlog?.isPublished ? "false" : "true"
//                 )
//               }
//             >
//               {selectBlog?.isPublished ? "UnPublish" : "Publish"}
//             </Button>
//             <Button variant="destructive" onClick={deleteBlog}>
//               Remove Blog
//             </Button>
//           </div>

//           <div className="pt-10">
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="title"
//               placeholder="Enter a title"
//               value={blogData.title}
//               onChange={handleChange}
//               className="dark:border-gray-300"
//             />
//           </div>

//           <div>
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subtitle"
//               placeholder="Enter a subtitle"
//               value={blogData.subtitle}
//               onChange={handleChange}
//               className="dark:border-gray-300"
//             />
//           </div>

//           <div>
//             <Label>Description</Label>
//             <JoditEditor
//               ref={editor}
//               value={blogData.bio}
//               onChange={(newContent) =>
//                 setBlogData((prev) => ({ ...prev, bio: newContent }))
//               }
//               onBlur={(e) => {
//                 const content = editor.current?.value || "";
//                 setBlogData((prev) => ({ ...prev, bio: content }));
//               }}
//               className="jodit_toolbar"
//             />
//           </div>

//           <div>
//             <Label>Category</Label>
//             <Select value={blogData.category} onValueChange={selectCategory}>

//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Category</SelectLabel>
//                   {[
//                     "Web Development",
//                     "Digital Marketing",
//                     "Blogging",
//                     "Photography",
//                     "Cooking",
//                     "Soft Development",
//                     "Gaming",
//                     "Teaching",
//                     "Playing",
//                     "Art",
//                   ].map((cat) => (
//                     <SelectItem key={cat} value={cat}>
//                       {cat}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Thumbnail</Label>
//             <Input
//               id="file"
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit bg-transparent dark:border-gray-300"
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 className="w-64 my-2"
//                 alt="Blog Thumbnail"
//               />
//             )}
//           </div>

//           <div className="flex gap-3">
//             <Button variant="outline" onClick={() => navigate(-1)}>
//               Back
//             </Button>
//             <Button disabled={loading} onClick={updateBlogHandler}>
//               {loading ? "Please Wait..." : "Save"}
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default UpdateBlog;


import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlog } from "@/redux/blogSlice";

let api=import.meta.env.VITE_URL

const UpdateBlog = () => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);
  // const params = useParams();
  // const id = params.blogId;
  const { blogId } = useParams(); // not `id`!
  let id = blogId;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const selectBlog = blog.find((b) => b._id === id);
  

  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    bio: "",
    category: "",
    thumbnail:"",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  useEffect(() => {
    if (selectBlog) {
      setBlogData({
        title: selectBlog.title || "",
        subtitle: selectBlog.subtitle || "",
        bio: selectBlog.bio || "",
        category: selectBlog.category || "",
        thumbnail: selectBlog.thumbnail || "",
      });
      setPreviewThumbnail(selectBlog.thumbnail || "");
    } else {
      toast.error("Blog not found");
      navigate("/dashboard/your-blog");
    }
  }, [selectBlog, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("bio", blogData.bio);
    formData.append("category", blogData.category);
    console.log("Sending data:", blogData,formData);
    if (blogData.thumbnail) {
      formData.append("file", blogData.thumbnail);
    }


    try {
      setLoading(true);
      const res = await axios.patch(
        `${api}/blog/${id}`,
        // `http://localhost:4000/api/v1/blog/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setBlog((prev) =>
            prev.map((b) => (b._id === id ? res.data.payload.blog : b))
          )
        );
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong");
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    try {
      const res = await axios.get(
        `${api}/blog/${id}/publish?q=${action}`
        // `http://localhost:4000/api/v1/blog/${id}/publish?q=${action}`
      );
      if (res.data.success) {
        setPublish(!publish);
        toast.success(res.data.message);
        navigate(`/dashboard/your-blog`);
      } else {
        toast.error("Failed to update publish state.");
        console.error("Failed to update publish state.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `${api}/blog/delete/${id}`,
        // `http://localhost:4000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedBlogs = blog.filter((b) => b._id !== id);
        dispatch(setBlog(updatedBlogs));
        toast.success(res.data.message);
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      console.log("error: ", error);
    }
  };

  // Loading fallback if blog data isn't ready
  if (!selectBlog)
    return <div className="py-20 text-center">Loading blog...</div>;

  return (
    <div className="animate-slideInLeft pb-10 px-3 pt-20 md:ml-[320px]">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 bg-white dark:bg-gray-800">
          <h1 className="text-4xl font-bold">Basic Blog Information</h1>
          <p>
            Make changes to your blogs here. Click publish when you're done.
          </p>

          <div className="space-x-2">
            <Button
              onClick={() =>
                togglePublishUnpublish(
                  selectBlog?.isPublished ? "false" : "true"
                )
              }
            >
              {selectBlog?.isPublished ? "UnPublish" : "Publish"}
            </Button>
            <Button variant="destructive" onClick={deleteBlog}>
              Remove Blog
            </Button>
          </div>

          <div className="pt-10">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={blogData.title}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              placeholder="Enter a subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>

          <div>
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              value={blogData.bio}
              onChange={(newContent) =>
                setBlogData((prev) => ({ ...prev, bio: newContent }))
              }

              onBlur={(e) => {
                const content = editor.current?.value || e.current.value || "";
                setBlogData((prev) => ({ ...prev, bio: content }));
              }}
              className="jodit_toolbar"
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={blogData.category} onValueChange={selectCategory}>

              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {[
                    "Uncategorized",
                    "Web Development",
                    "Digital Marketing",
                    "Blogging",
                    "Photography",
                    "Cooking",
                    "Soft Development",
                    "Gaming",
                    "Teaching",
                    "Playing",
                    "Art",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Thumbnail</Label>
            <Input
              id="file"
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="bg-transparent w-fit dark:border-gray-300"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Blog Thumbnail"
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button disabled={loading} onClick={updateBlogHandler}>
              {loading ? "Please Wait..." : "Save"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
