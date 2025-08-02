import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import CartIcon from "../icons/Cart";
import SearchIcon from "../icons/Search";

const Nav = () => {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchText(search);
    }
  }, [location.search]);

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      navigate(`/explore?search=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <nav
      className="w-full bg-gradient-to-r from-[#947352] via-[#775B43] to-[#49352B] sticky top-0 z-10 py-4 shadow text-white"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/" aria-label="Go to homepage">
            EcoLestari
          </Link>
        </div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop search + links */}
        <div className="hidden md:flex flex-1 items-center gap-4 mx-4">
          <div className="flex flex-1 gap-2">
            <label htmlFor="search-input" className="sr-only">
              Search products
            </label>
            <input
              id="search-input"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSearch}
              className="bg-white/80 text-[#49352B] px-4 rounded-xl hover:bg-white transition"
              aria-label="Search"
            >
              <SearchIcon width={15} color="black" aria-hidden="true" />
            </button>
          </div>

          <ul className="flex gap-4 items-center text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/notification">Notifications</Link>
            </li>
            <li>
              <Link to="/cart" aria-label="View cart">
                <button
                  className="bg-white/70 text-amber-800 px-3 py-2 rounded-full flex items-center gap-2"
                  aria-label="Cart"
                >
                  <span>Cart</span>
                  <CartIcon width={20} color="brown" aria-hidden="true" />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden px-4 mt-2 space-y-3">
          <div className="flex gap-2">
            <label htmlFor="mobile-search" className="sr-only">
              Search products
            </label>
            <input
              id="mobile-search"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/80 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-white/80 text-[#49352B] px-4 rounded-xl hover:bg-white transition"
              aria-label="Search"
            >
              <SearchIcon width={15} color="black" aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/notification">Notifications</Link>
            </li>
            <li>
              <Link to="/cart" aria-label="View cart">
                <button
                  className="bg-white/70 text-amber-800 px-4 py-2 rounded-full flex items-center gap-2"
                  aria-label="Cart"
                >
                  <span>Cart</span>
                  <CartIcon width={20} color="brown" aria-hidden="true" />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
