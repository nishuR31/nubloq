import React from "react";

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
// import blackWave from "./assets/blackWave.jpg";
// import homePage from "./assets/homePage.webp";
// import pen from "./assets/pen.jpg";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="animate-fadeIn bg-bg min-h-screen bg-app bg-fixed object-fill bg-center bg-no-repeat transition-all ease-in delay-[2s] ">
                <Home />
                <Footer />
              </div>
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
              <div className="animate-fadeIn min-h-screen bg-bg  bg-fixed object-fill bg-center bg-no-repeat transition-all ease-in delay-[2s]">
                {/* <Navbar /> */}
                <About />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in delay-[2s] bg-fixed object-fill bg-center bg-no-repeat  ">
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
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in delay-[2s]bg-fixed object-fill bg-center bg-no-repeat  ">
                <Navbar />
                <SearchList />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <>
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in delay-[2s] bg-fixed object-fill bg-center bg-no-repeat  ">
                <BlogView />
              </div>
            </>
          }
        />
        <Route
          path="/write-blog"
          element={
            <>
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in bg-fixed object-fill bg-center bg-no-repeat delay-[2s] ">
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
        <Route
          path="/signup"
          element={
            <>
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in bg-fixed object-fill bg-center bg-no-repeat delay-[2s] ">
                <Signup />
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in bg-fixed object-fill bg-center bg-no-repeat delay-[2s] ">
                <Login />
              </div>
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in bg-fixed object-fill bg-center bg-no-repeat delay-[2s] ">
                <Forgot />
              </div>
            </>
          }
        />

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
                <>
                  <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in bg-fixed object-fill bg-center bg-no-repeat delay-[2s] ">
                    <UpdateBlog />
                  </div>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="your-blog"
            element={
              <ProtectedRoute>
                <div className="animate-fadeIn min-h-screen bg-bg transition-all ease-in bg-fixed object-fill bg-center bg-no-repeat delay-[2s] ">
                  <YourBlog />
                </div>
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
