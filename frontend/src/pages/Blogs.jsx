import { useEffect, useState } from "react";
import api from "../api/axios";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [page, setPage] = useState(1);

  const fetchBlogs = (url = "blogs/") => {
    let endpoint = url;

    if (url.startsWith("http")) {
      endpoint = url.replace(
        "http://127.0.0.1:8000/api/",
        ""
      );
    }

    api.get(endpoint)
      .then((res) => {
        setBlogs(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    api.get(`blogs/?search=${search}`)
      .then((res) => {
        setBlogs(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
        All Blogs
      </h1>

      <div className="flex flex-col md:flex-row gap-3 mb-8">

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Search
        </button>

        <button
          onClick={() => {
            setPage(1);
            fetchBlogs();
          }}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition"
        >
          Show All
        </button>

      </div>

      <h2 className="text-xl font-semibold mb-6">
        Page {page}
      </h2>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-500">
            No blogs found
          </h2>
        </div>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))
      )}

      <div className="flex justify-center gap-4 mt-10">

        <button
          disabled={!prevPage}
          onClick={() => {
            fetchBlogs(prevPage);
            setPage((prev) => prev - 1);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition"
        >
          Previous
        </button>

        <button
          disabled={!nextPage}
          onClick={() => {
            fetchBlogs(nextPage);
            setPage((prev) => prev + 1);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Blogs;