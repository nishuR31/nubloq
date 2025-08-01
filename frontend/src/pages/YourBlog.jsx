// import { Card } from "@/components/ui/card";
// import React, { useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setBlog } from "@/redux/blogSlice";
// import { Edit, Eye, Trash2, EllipsisVertical } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import capitalize from "../components/capitalize"
// const api = import.meta.env.VITE_URL;




// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

// const YourBlog = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { blog } = useSelector((store) => store.blog);
//   console.log(blog);

//   const getOwnBlog = async () => {
//     try {
//       const res = await axios.get(
//         // `${api}/blog/get-own-blogs`,
//         `http://localhost:4000/api/v1/blog/get-own-blogs`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         dispatch(setBlog(res.data.payload.blogs));
//         toast.success("Blogs fetched successfully.");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error in fetching blogs.");
//     }
//   };
//   const deleteBlog = async (id) => {
//     try {
//       const res = await axios.delete(
//         // `${api}/blog/delete/${id}`,
//         `http://localhost:4000/api/v1/blog/delete/${id}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
//         dispatch(setBlog(updatedBlogData));
//         toast.success(res.data.message);
//       }
//       console.log(res.data.message);
//     } catch (error) {
//       console.log(error);
//       toast.error("something went error");
//     }
//   };
//   useEffect(() => {
//     getOwnBlog();
//   }, []);

//   const formatDate = (index) => {
//     const date = new Date(blog[index].createdAt);
//     const formattedDate = date.toLocaleDateString("en-GB");
//     return formattedDate;
//     // console.log("formattedDate", date);
//   };

//   return (
//     <div className="animate-slideInLeft pb-10 pt-20 md:ml-[320px] min-h-screen py-10 bg-gray-200 dark:bg-gray-700">
//       <div className="max-w-6xl mx-auto mt-8 ">
//         <Card className="w-full p-5 space-y-2 flex justify-between dark:bg-white/10 bg-black/10 ">
//           <Table>
//             <TableCaption>A list of your recent blogs.</TableCaption>
//             <TableHeader className="overflow-x-auto">
//               <TableRow className="">
//                 <TableHead className="text-center">Author</TableHead>
//                 <TableHead className="hidden lg:block text-center">Thumbnail</TableHead>
//                 <TableHead className="text-center">Title</TableHead>
//                 <TableHead className="text-center">Category</TableHead>
//                 <TableHead className="text-center">Date</TableHead>
//                 <TableHead className="text-center">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody className="overflow-x-auto  outline outline-1 outline-gray-700 dark:outline-gray-300 ">
//               {Array.isArray(blog) &&
//                 blog?.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell className="font-medium  ">
//                       {item.author?.userName??capitalize(item.author?.firstName)}
//                     </TableCell>
//                     <TableCell className="flex items-center">
//                       <img
//                         src={
//                           item.thumbnail ||
//                           `https://placehold.co/200x200?text=${item?.title}`
//                         }
//                         width={100}
//                         height={100}
//                         alt={item.title}
//                         className="hidden md:block rounded-md outline outline-1 outline-gray-700 dark:outline-gray-300 "
//                       />
//                       <TableCell
//                         className="hover:underline cursor-pointer"
//                         onClick={() => navigate(`/blogs/${item._id}`)}
//                       >
//                         {capitalize(item.title)}
//                       </TableCell>
//                     </TableCell>
//                     <TableCell>{capitalize(item.category || "Uncategorized")}</TableCell>
//                     <TableCell className="">{formatDate(index)}</TableCell>
//                     <TableCell className=" text-center">
//                       <Eye
//                         className="cursor-pointer hidden lg:block "
//                         onClick={() => navigate(`/blogs/${item._id}`)}
//                       />
//                       <Edit
//                         className="cursor-pointer lg:block hidden"
//                         onClick={() =>
//                           navigate(`/dashboard/write-blog/${item._id}`)
//                         }
//                       />
//                       <Trash2
//                         className="cursor-pointer lg:block hidden"
//                         onClick={() => deleteBlog(item._id)}
//                       />

//                       <DropdownMenu className="lg:hidden ">
//                         <DropdownMenuTrigger >
//                           <EllipsisVertical  />
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="w-[180px]  lg:hidden backdrop-blur-sm  bg-transparent">
//                           <DropdownMenuItem className="text-blue-500"
//                             onClick={() =>
//                               navigate(`/dashboard/write-blog/${item._id}`)
//                             }
//                           >
//                             <Edit />
//                             Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="text-fuchsia-500"
//                             onClick={() =>
//                               navigate(`/blogs/${item._id}`)
//                             }
//                           >
//                             <Eye />
//                             Open
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             className="text-red-500"
//                             onClick={() => deleteBlog(item._id)}
//                           >
//                             <Trash2 />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//             {/* <TableFooter>
//                             <TableRow>
//                                 <TableCell colSpan={3}>Total</TableCell>
//                                 <TableCell className="text-right">$2,500.00</TableCell>
//                             </TableRow>
//                         </TableFooter> */}
//           </Table>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default YourBlog;



////////////////////////////////////////////////////////


import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { Edit, Eye, Trash2 ,EllipsisVertical} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import capitalize from "../components/capitalize"
let api=import.meta.env.VITE_URL;
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const YourBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        `${api}/blog/get-own-blogs`,
        // `http://localhost:4000/api/v1/blog/get-own-blogs`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.payload.blogs));
        toast.success("Blogs fetched successfully.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching blogs.");
    }
  };
  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `${api}/blog/delete/${id}`,
        // `http://localhost:4000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("something went error");
    }
  };
  useEffect(() => {
    getOwnBlog();
  }, []);

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
    // console.log("formattedDate", date);
  };

  return (
    <div className="animate-slideInLeft pb-10  md:ml-[250px] min-h-screen  object-fill py-6 bg-transparent">
      <div className="max-w-6xl mx-auto mt-8 ">
        <Card className="w-full p-5 space-y-2 flex justify-between dark:bg-white/10 bg-black/10 ">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader>
              <TableRow className=" ">
                <TableHead className="text-gray-800 animate-fadeIn text-center ">Author</TableHead>
                <TableHead className="text-gray-800 animate-fadeIn hidden lg:block text-center">Thumbnail</TableHead>
                <TableHead className="text-gray-800 animate-fadeIn text-center">Title</TableHead>
                <TableHead className="text-gray-800 animate-fadeIn text-center">Category</TableHead>
                <TableHead className="text-gray-800 animate-fadeIn text-center">Date</TableHead>
                <TableHead className="text-gray-800 animate-fadeIn text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-auto flex-col flex-wrap justify-between  outline outline-1 outline-gray-700 dark:outline-gray-300 ">
              {Array.isArray(blog) &&
                blog?.map((item, index) => (
                  <TableRow key={index} >
                    <TableCell className="font-medium   ">
                      {item.author?.userName??capitalize(item.author?.firstName)}
                    </TableCell>
                    <TableCell className="flex flex-wrap flex-row justify-around  ">
                      <img
                        src={
                          item.thumbnail ||
                          `https://placehold.co/200x200?text=${item?.title}`
                        }
                       
                        alt={item.title}
                        className="hidden md:rounded-full md:w-20 md:h-20 lg:block rounded-md outline outline-1 outline-gray-700 dark:outline-gray-300 "
                      />
                      <TableCell
                        className="flex flex-wrap flex-row hover:underline p-auto cursor-pointer "
                        onClick={() => navigate(`/blogs/${item._id}`)}
                      >
                        {capitalize(item.title)}
                      </TableCell>
                    </TableCell>
                    <TableCell>{capitalize(item.category || "Uncategorized")}</TableCell>
                    <TableCell className="">{formatDate(index)}</TableCell>
                    <TableCell className=" text-center">
                      <Eye
                        className="cursor-pointer hidden lg:flex "
                        onClick={() => navigate(`/blogs/${item._id}`)}
                      />
                      <Edit
                        className="cursor-pointer lg:flex hidden"
                        onClick={() =>
                          navigate(`/dashboard/write-blog/${item._id}`)
                        }
                      />
                      <Trash2
                        className="cursor-pointer lg:flex hidden"
                        onClick={() => deleteBlog(item._id)}
                      />

                      <DropdownMenu className="flex md:hidden  ">
                        <DropdownMenuTrigger >
                          <EllipsisVertical className="flex md:hidden  " />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[180px]  lg:hidden backdrop-blur-sm  bg-transparent">
                          <DropdownMenuItem className="text-blue-500"
                            onClick={() =>
                              navigate(`/dashboard/write-blog/${item._id}`)
                            }
                          >
                            <Edit />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-fuchsia-500"
                            onClick={() =>
                              navigate(`/blogs/${item._id}`)
                            }
                          >
                            <Eye />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => deleteBlog(item._id)}
                          >
                            <Trash2 />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;