import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function BlogCard({ blog, onBlogUpdate }) {
  const [likeLoading, setLikeLoading] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // ================= DELETE =================
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`blogs/${blog.id}/`);

      alert("Blog deleted successfully!");

      window.location.reload();
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Failed to delete blog");
    }
  };

  // ================= LIKE =================
  const handleLike = async () => {
    if (likeLoading) return;

    try {
      setLikeLoading(true);

      const response = await api.post(
        `blogs/${blog.id}/like/`
      );

      console.log("Like Response:", response.data);

      // If backend returns updated blog
      if (response.data && response.data.id) {
        onBlogUpdate(response.data);
      } else {
        // Otherwise fetch updated blog
        const updatedResponse = await api.get(
          `blogs/${blog.id}/`
        );

        onBlogUpdate(updatedResponse.data);
      }

    } catch (error) {
      console.log("Like Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first to like this blog.");
      } else {
        alert("Failed to like blog.");
      }

    } finally {
      setLikeLoading(false);
    }
  };

  // ================= COMMENT =================
  const handleComment = async () => {
    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    if (commentLoading) return;

    try {
      setCommentLoading(true);

      const response = await api.post(
        "comments/",
        {
          blog: blog.id,
          text: comment,
        }
      );

      console.log("Comment Response:", response.data);

      setComment("");

      alert("Comment added successfully!");

      // Get updated blog with new comment count
      const updatedResponse = await api.get(
        `blogs/${blog.id}/`
      );

      onBlogUpdate(updatedResponse.data);

    } catch (error) {
      console.log("Comment Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      if (error.response?.status === 401) {
        alert("Please login first to comment.");
      } else {
        alert("Failed to add comment.");
      }

    } finally {
      setCommentLoading(false);
    }
  };

  // ================= IMAGE URL =================
  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `https://fullstack-blog-api-ht79.onrender.com${blog.image}`
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-8 hover:-translate-y-1">

      {/* ================= IMAGE ================= */}
      {imageUrl && (
        <div className="w-full bg-gray-100 flex justify-center items-center overflow-hidden">
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-auto max-h-[500px] object-contain mx-auto"
            onError={(e) => {
              console.log(
                "Image failed to load:",
                imageUrl
              );
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {/* ================= BLOG CONTENT ================= */}
      <div className="p-6">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {blog.title}
        </h2>

        {/* CONTENT */}
        <p className="text-gray-600 leading-7 mb-6">
          {blog.content?.length > 200
            ? blog.content.substring(0, 200) + "..."
            : blog.content}
        </p>

        {/* ================= LIKE & COMMENT ================= */}
        <div className="flex flex-wrap gap-3 mb-4">

          {/* LIKE BUTTON */}
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition disabled:opacity-50"
          >
            👍 {likeLoading ? "Loading..." : `${blog.likes_count} Likes`}
          </button>

          {/* COMMENT BUTTON */}
          <button
            onClick={() =>
              setShowCommentBox(!showCommentBox)
            }
            className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-200 transition"
          >
            💬 {blog.comments_count} Comments
          </button>

        </div>

        {/* ================= COMMENT BOX ================= */}
        {showCommentBox && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write your comment..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />

            <div className="flex justify-end gap-3 mt-3">

              <button
                onClick={() => {
                  setShowCommentBox(false);
                  setComment("");
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={handleComment}
                disabled={commentLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
              >
                {commentLoading
                  ? "Posting..."
                  : "Post Comment"}
              </button>

            </div>

          </div>
        )}

        {/* ================= EDIT & DELETE ================= */}
        <div className="flex gap-3">

          {/* EDIT */}
          <Link
            to={`/edit/${blog.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            ✏️ Edit
          </Link>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            🗑 Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default BlogCard;