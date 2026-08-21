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
  const [loading, setLoading] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(true);

  // ================= LOAD BLOG =================
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoadingBlog(true);

        const res = await api.get(`blogs/${id}/`);

        console.log("Blog data:", res.data);

        setTitle(res.data.title || "");
        setContent(res.data.content || "");
        setOldImage(res.data.image || "");
      } catch (error) {
        console.log("Fetch Blog Error:", error);
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

        alert("Failed to load blog");
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ================= UPDATE BLOG =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter blog title.");
      return;
    }

    if (!content.trim()) {
      alert("Please enter blog content.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      // Only send image if a NEW image was selected
      if (image) {
        formData.append("image", image);
      }

      console.log("Updating blog:", id);
      console.log("Title:", title);
      console.log("New Image:", image);

      const response = await api.put(
        `blogs/${id}/`,
        formData
      );

      console.log("Update Response:", response.data);

      alert("Blog Updated Successfully!");

      navigate("/");
    } catch (error) {
      console.log("Update Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      if (error.response?.status === 401) {
        alert("Your login session expired. Please login again.");
      } else if (error.response?.status === 403) {
        alert(
          "You are not allowed to edit this blog. Make sure you are logged in as the blog owner."
        );
      } else if (error.response?.status === 400) {
        alert("Invalid blog data. Please check the title, content or image.");
      } else {
        alert("Failed to update blog.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loadingBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          Loading blog...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">

        {/* ================= TITLE ================= */}

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Edit Blog
        </h1>

        {/* ================= TITLE INPUT ================= */}

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />

          </div>

          {/* ================= CONTENT ================= */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Blog Content
            </label>

            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your blog..."
            />

          </div>

          {/* ================= CURRENT IMAGE ================= */}

          {oldImage && !image && (
            <div className="mb-5">

              <p className="font-semibold mb-2">
                Current Image
              </p>

              <div className="w-full bg-gray-100 rounded-lg border overflow-hidden flex justify-center">

                <img
                  src={oldImage}
                  alt="Current Blog"
                  className="w-full max-h-[400px] object-contain"
                  onError={() => {
                    console.log(
                      "Current image failed:",
                      oldImage
                    );
                  }}
                />

              </div>

            </div>
          )}

          {/* ================= IMAGE INPUT ================= */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Change Image (Optional)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                if (selectedFile) {
                  setImage(selectedFile);
                }
              }}
              className="w-full border rounded-lg p-2"
            />

            <p className="text-sm text-gray-500 mt-2">
              Leave empty if you want to keep the current image.
            </p>

          </div>

          {/* ================= NEW IMAGE PREVIEW ================= */}

          {image && (
            <div className="mb-5">

              <p className="font-semibold text-green-600 mb-2">
                New Image Preview
              </p>

              <div className="w-full bg-gray-100 rounded-lg border overflow-hidden flex justify-center">

                <img
                  src={URL.createObjectURL(image)}
                  alt="New Preview"
                  className="w-full max-h-[400px] object-contain"
                />

              </div>

            </div>
          )}

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditBlog;