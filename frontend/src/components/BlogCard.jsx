function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-8 hover:-translate-y-1">

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {blog.title}
        </h2>

        <p className="text-gray-600 leading-7 mb-6">
          {blog.content.length > 200
            ? blog.content.substring(0, 200) + "..."
            : blog.content}
        </p>

        <div className="flex flex-wrap gap-3">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            👍 {blog.likes_count} Likes
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            💬 {blog.comments_count} Comments
          </span>

        </div>

      </div>

    </div>
  );
}

export default BlogCard;