import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition font-medium ${
      isActive
        ? "text-blue-400"
        : "text-white hover:text-blue-400"
    }`;

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

          <NavLink to="/create-blog" className={linkClass}>
            Create
          </NavLink>

          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>

          <NavLink to="/register" className={linkClass}>
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;