import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </>
  );
}

export default App;