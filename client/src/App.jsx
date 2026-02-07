import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import CreateHoot from "./components/CreateHoot"; // <-- import it
import About from "./components/About";
import Blogs from "./components/Blogs";   
import { AuthProvider } from "./context/AuthContext";
import Contact from "./components/Contact";
import Members from "./components/Members";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Create Hoot route */}
          <Route path="/create-hoots" element={<CreateHoot />} />

          {/* You can add more components later */}
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
