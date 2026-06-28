import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("blogs/", formData);

      alert("Blog Created Successfully!");

      setTitle("");
      setContent("");
      setImage(null);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create New Blog
        </h1>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Blog Title
          </label>

          <input
            type="text"
            placeholder="Enter blog title..."
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
            placeholder="Write your blog..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Upload Image
          </label>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {image && (
          <div className="mb-5">
            <p className="font-medium text-green-600 mb-2">
              Selected Image:
            </p>

            <p className="text-gray-700">{image.name}</p>

            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-4 w-full max-h-80 object-cover rounded-lg border"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Create Blog
        </button>

      </div>
    </div>
  );
}

export default CreateBlog;