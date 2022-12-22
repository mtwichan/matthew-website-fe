import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home/Home";
import ProjectPreview from "./routes/Projects/ProjectPreview";
import BlogPreview from "./routes/Blog/BlogPreview";
import Blog from "./routes/Blog/Blog";
import Contact from "./routes/Contact/Contact";
import Project from "./routes/Projects/Project";
import WrongPage from "./components/Error/WrongPage";

function App(): JSX.Element {
  return (
    <div className="content-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Matthew Chan - Home</title>
        <link rel="canonical" href="https://matthewchan.io" />
        <meta name="description" content="Matthew Chan - Full Stack & Smart Contract Engineer" />
      </Helmet>
      <Header />
      <div className="flex main-container justify-center" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectPreview />} />
          <Route path="/project/:projectSlug" element={<Project />} />
          <Route path="/blog" element={<BlogPreview />} />
          <Route path="/blog/:blogSlug" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </div>
      <div className="footer-container z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
