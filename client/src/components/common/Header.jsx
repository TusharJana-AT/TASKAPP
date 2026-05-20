import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold"><Link to={'/'}>Taskification</Link></h1>

      {user ? (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <div className="flex items-center gap-5">
          <NavLink
            to="/login"
            className="text-gray-700 hover:text-black font-medium"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="text-gray-700 hover:text-black font-medium"
          >
            Register
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;