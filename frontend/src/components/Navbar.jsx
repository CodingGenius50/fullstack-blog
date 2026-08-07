import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const linkClass = ({ isActive }) =>
    `transition font-medium ${
      isActive
        ? "text-blue-400"
        : "text-white hover:text-blue-400"
    }`;
const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  alert("Logged out successfully!");

  navigate("/login");
};


  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          Blog App
        </NavLink>

        <div className="flex items-center gap-6">

          <NavLink to="/" className={linkClass}>
            Blogs
          </NavLink>

          {token && (
            <>
              <NavLink to="/create-blog" className={linkClass}>
                Create
              </NavLink>

              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>

              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </>
          )}

          {!token ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 font-medium transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;