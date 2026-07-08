function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Dashboard
        </h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg">Total Blogs</h2>
            <p className="text-4xl font-bold text-blue-600 mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg">Bookmarks</h2>
            <p className="text-4xl font-bold text-green-600 mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg">Total Likes</h2>
            <p className="text-4xl font-bold text-red-600 mt-3">
              0
            </p>
          </div>

        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            My Blogs
          </h2>

          <div className="text-gray-500 text-lg">
            No blogs available.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;