import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

 useEffect(() => {
  const fetchBlog = async () => {
    try {
      const res = await api.get(`blogs/${id}/`);

      setTitle(res.data.title);
      setContent(res.data.content);
      setOldImage(res.data.image);
    } catch (error) {
      console.log(error);
      alert("Failed to load blog");
    }
  };

  fetchBlog();
}, [id]);
  
    

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      await api.put(`blogs/${id}/`, formData);

      alert("Blog Updated Successfully!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Edit Blog
        </h1>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Blog Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Blog Content
          </label>

          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {oldImage && !image && (
          <div className="mb-5">
            <p className="font-semibold mb-2">Current Image</p>

            <img
              src={oldImage}
              alt="Current"
              className="w-full max-h-80 object-cover rounded-lg border"
            />
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Change Image (Optional)
          </label>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {image && (
          <div className="mb-5">
            <p className="font-semibold text-green-600 mb-2">
              New Image Preview
            </p>

            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full max-h-80 object-cover rounded-lg border"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Update Blog
        </button>

      </div>
    </div>
  );
}

export default EditBlog;