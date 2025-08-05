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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="min-h-screen transition-all ease-in-out bg-fixed object-fill bg-center bg-no-repeat delay-[3s]">
                <Navbar />
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
              <div
                className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
              >
                <Navbar />
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
              <div
                className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
              >
                <Navbar />
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
              <div
                className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
              >
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
              <div
                className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
              >
                <BlogView />
              </div>
            </>
          }
        />
        <Route
          path="/write-blog"
          element={
            <>
              <div
                className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
              >
                {" "}
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
              <div
                className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
              >
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </div>
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
                <div
                  className={` transition-all delay-[3s] object-fill ease-in-out bg-fixed bg-cover bg-no-repeat min-h-screen bg-top bg-center`}
                >
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
