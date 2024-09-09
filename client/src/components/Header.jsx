import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?query=${title}`);
    setTitle("");
  }

  return (
    <header className="w-full bg-gray-900 z-50">
      <nav className="bg-gray-900 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white text-xl font-bold">
              Watchlist
            </Link>
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-gray-400"
                }
              >
                Movies
              </NavLink>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "text-gray-400"
                }
              >
                My Watchlist
              </NavLink>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search movies..."
              className="px-3 py-1 rounded-lg border border-gray-500 bg-gray-700 text-white"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-1 rounded-lg ml-2"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
