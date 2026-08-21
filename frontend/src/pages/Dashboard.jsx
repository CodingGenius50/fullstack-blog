import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const blogsRes = await api.get("my-blogs/");

      console.log("MY BLOGS:", blogsRes.data);

      const blogs = Array.isArray(blogsRes.data)
        ? blogsRes.data
        : blogsRes.data.results || [];

      setMyBlogs(blogs);
    } catch (error) {
      console.log("Dashboard Error:", error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ================= STATISTICS =================

  const totalBlogs = myBlogs.length;

  const totalLikes = myBlogs.reduce(
    (sum, blog) => sum + (blog.likes_count || 0),
    0
  );

  const totalComments = myBlogs.reduce(
    (sum, blog) => sum + (blog.comments_count || 0),
    0
  );

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // ================= DASHBOARD =================

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* ================= TITLE ================= */}

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Dashboard
        </h1>

        {/* ================= STATISTICS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL BLOGS */}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-500 font-semibold">
              Total Blogs
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {totalBlogs}
            </p>
          </div>

          {/* TOTAL LIKES */}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-500 font-semibold">
              Total Likes
            </h2>

            <p className="text-4xl font-bold text-red-600 mt-3">
              {totalLikes}
            </p>
          </div>

          {/* TOTAL COMMENTS */}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-500 font-semibold">
              Total Comments
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {totalComments}
            </p>
          </div>

        </div>

        {/* ================= MY BLOGS ================= */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            My Blogs
          </h2>

          {myBlogs.length === 0 ? (

            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No blogs available.
              </p>
            </div>

          ) : (

            <div className="space-y-6">

              {myBlogs.map((blog) => (

                <div
                  key={blog.id}
                  className="border rounded-xl p-5 flex flex-col md:flex-row gap-5 items-center"
                >

                  {/* BLOG IMAGE */}

                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-40 h-28 object-cover rounded-lg"
                    />
                  )}

                  {/* BLOG INFORMATION */}

                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-gray-800">
                      {blog.title}
                    </h3>

                    <div className="flex gap-6 mt-3 text-gray-600">

                      <span>
                        ❤️ {blog.likes_count || 0}
                      </span>

                      <span>
                        💬 {blog.comments_count || 0}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;