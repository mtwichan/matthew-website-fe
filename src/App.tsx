import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home/Home";
import ProjectPreview from "./routes/Projects/ProjectPreview";
import BlogPreview from "./routes/Blog/BlogPreview";
import Blog from "./routes/Blog/Blog";
import Contact from "./routes/Contact/Contact";
import Project from "./routes/Projects/Project";


function App(): JSX.Element {
  return (
    <div className="content-container">
      <Header />
      <div className="flex main-container" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectPreview />} />
          <Route path="/project/:projectSlug" element={<Project />} />
          <Route path="/blog" element={<BlogPreview />} />
          <Route path="/blog/:blogSlug" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <div className="footer-container z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
