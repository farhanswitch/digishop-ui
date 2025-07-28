import React from "react";
import { Link } from "react-router";

import CartIcon from "../icons/Cart";

const Nav = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-[#947352] via-[#775B43] to-[#49352B] backdrop-blur-md sticky top-0 z-[10] py-4 shadow">
      <div className="inner max-w-5xl mx-auto text-white px-3 flex justify-between items-center">
        <div className="title text-xl font-semibold">EcoLestari</div>
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <ul className="flex gap-3 items-center">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/menu"}>Menu</Link>
          </li>
          <li>
            <Link to={"/about"}>Notifications</Link>
          </li>
          <li>
            <Link to={"/cart"}>
              <button className="bg-white/70 text-amber-800 px-3 py-3 text-sm rounded-full flex justify-between items-center gap-2">
                <p>Cart</p>
                <CartIcon width={20} color="brown" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
