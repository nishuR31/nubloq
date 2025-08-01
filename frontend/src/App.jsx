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

import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Dashboard from "./pages/Dashboard";
import YourBlog from "./pages/YourBlog";
import Error from "./pages/Error";
import BlogView from "./pages/BlogView";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";
import Comments from "./pages/Comments";
import UpdateBlog from "./pages/UpdateBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchList from "./pages/SearchList";
import Faqs from "./pages/Faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CodeOfConduct from "./pages/CodeOfConduct";
import blackWave from "./assets/blackWave.jpg"
import homePage from "./assets/homePage.webp"
import pen from "./assets/pen.jpg"

const App = () => {

 

  return (
    <Router >
      <Navbar />

      <Routes>
        <Route  
          path="/"
          element={
            <><div className="transition-all delay-3000 ease-in-out min-h-screen  bg-fixed bg-no-repeat  bg-center" style={{backgroundImage:`url(${homePage})`}}>
            {/* <><div className="transition-all delay-3000 ease-in-out min-h-screen bg-home-light dark:bg-home-dark bg-fixed bg-no-repeat  bg-bottom dark:bg-center"> */}
              <Home  />
              <Footer /></div>
            </>
          }
        />
        <Route
          path="/faqs"
          element={
            <>
              <Faqs />
            </>
          }
        />
        <Route
          path="/privacy"
          element={
            <>
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/code-of-conduct"
          element={
            <>
              <CodeOfConduct />
            </>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/about"
          element={
            <>
              <div className={` transition-all delay-2000 ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top   bg-center`} style={{ backgroundImage:`url(${pen})`}}>
              <About />
              <Footer  />
              </div>
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
        <div className="animate-slideInLeft transition-all delay-2000 ease-in-out pt-16 bg-blogs-light dark:bg-blogs-dark min-h-screen bg-fixed bg-no-repeat bg-center bg-cover">
              <Blog />
              <Footer />
        </div>
            </>
          }
        />
        <Route 
          path="/search"
          element={
            <> 
              <div className="animate-slideInLeft transition-all delay-2000 ease-in-out pt-16 bg-blogs-light dark:bg-blogs-dark  bg-fixed bg-no-repeat bg-center bg-cover">

              <SearchList />
              <Footer /></div>
            </>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <>
              <BlogView />
            </>
          }
        />
        <Route
          path="/write-blog"
          element={
            <>
        <div className="animate-slideInLeft transition-all delay-2000 ease-in-out pt-16 bg-blogs-light dark:bg-blogs-dark min-h-screen  bg-fixed bg-no-repeat bg-center bg-cover">
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
            </div>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Dashboard Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="write-blog/:blogId"
            element={
              <ProtectedRoute>
                <UpdateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="your-blog"
            element={
              <ProtectedRoute>
        <div className="animate-slideInLeft transition-all delay-2000 ease-in-out bg-wave dark:bg-blackWave min-h-screen  bg-fixed bg-no-repeat bg-center bg-cover">
                <YourBlog /></div>
              </ProtectedRoute>
            }
          />
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
