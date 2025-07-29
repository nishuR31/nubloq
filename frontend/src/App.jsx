// import React from 'react'
// import Signup from './pages/Signup'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Navbar from './components/Navbar'
// import Profile from './pages/Profile'
// import Blog from './pages/Blog'
// import CreateBlog from './pages/CreateBlog'
// import Dashboard from './pages/Dashboard'
// import YourBlog from './pages/YourBlog'
// import Error from './pages/Error'
// import BlogView from './pages/BlogView'
// import Contact from './pages/Contact'
// import Footer from './components/Footer'
// import About from './pages/About'
// import Comments from './pages/Comments'
// import UpdateBlog from './pages/UpdateBlog'
// import ProtectedRoute from './components/ProtectedRoute'
// import SearchList from './pages/SearchList'

// const router = createBrowserRouter([
//   {
//     path: "/contact",
//     element:<Contact/>
//   },
//   {
//     path: "/",
//     element: <><Navbar/><Home /><Footer/></>
//   },
//   {
//     path: "/blogs",
//     element: <><Navbar/><Blog /><Footer/></>
//   },
//   {
//     path: "/about",
//     element: <><Navbar/><About /><Footer/></>
//   },
//   {
//     path: "/search",
//     element: <><Navbar/><SearchList/><Footer/></>
//   },
//   {
//     path: "/blogs/:blogId",
//     element: <><Navbar/><ProtectedRoute><BlogView /></ProtectedRoute></>
//   },
//   {
//     path: "/write-blog",
//     element: <><Navbar/><CreateBlog /></>
//   },
 
//   {
//     path: "/profile",
//     element: <><Navbar/><Profile /></>
//   },
//   // {
//   //   path: "write-blog/:blogId",
//   //       element: <><Navbar/><CreateBlog /></>
//   // },
//   // {
//   //   path: "/dashboard",
//   //   element: <><Navbar/><Dashboard /></>
//   // },
//   {
//     path:"/dashboard",
//     element: <><Navbar/><ProtectedRoute><Dashboard/></ProtectedRoute></>,
//     children:[
//       {
//         path: "write-blog",
//         element:<><CreateBlog/></>
//       },
//       {
//         path: "write-blog/:blogId",
//         element: <><UpdateBlog /></>
//       },
//       {
//         path: "your-blog",
//         element:<YourBlog/>
//       },
//       {
//         path: "comments",
//         element:<Comments/>
//       },
//       {
//         path: "profile",
//         element:<Profile/>
//       },
    
      
//     ]
//    },
//   {
//     path: "/signup",
//     element: <><Navbar/><Signup /></> 
//   },
//   {
//     path: "/login",
//     element: <><Navbar/><Login /></>
//   },
//   {
//     path: "/*",
//     element: <><Navbar/><Error /></>
//   },
// ])

// const App = () => {
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';
import Dashboard from './pages/Dashboard';
import YourBlog from './pages/YourBlog';
import Error from './pages/Error';
import BlogView from './pages/BlogView';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import About from './pages/About';
import Comments from './pages/Comments';
import UpdateBlog from './pages/UpdateBlog';
import ProtectedRoute from './components/ProtectedRoute';
import SearchList from './pages/SearchList';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        {/* <Route path="/home" element={<><Home /><Footer /></>} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<><About /><Footer /></>} />
        <Route path="/blogs" element={<><Blog /><Footer /></>} />
        <Route path="/search" element={<><SearchList /><Footer /></>} />
        <Route path="/blogs/:blogId" element={
            <><Navbar /><BlogView /></>
        } />
        <Route path="/write-blog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Dashboard Nested Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route path="write-blog/:blogId" element={<ProtectedRoute><UpdateBlog/></ProtectedRoute>} />
          <Route path="your-blog" element={<ProtectedRoute><YourBlog /></ProtectedRoute>} />
          <Route path="comments" element={<Comments />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
