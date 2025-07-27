import React from "react";
import { NavLink } from "react-router";

const SellerNav = () => {
  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded font-medium ${
      isActive ? "bg-gray-200 text-black" : "text-gray-600 hover:text-black"
    }`;

  return (
    <div className=" bg-white pb-4">
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <nav className="flex gap-6">
          <NavLink to="/seller/store-profile" className={linkStyle}>
            Profile
          </NavLink>
          <NavLink to="/seller/products" className={linkStyle}>
            Products
          </NavLink>
          <NavLink to="/seller/orders" className={linkStyle}>
            Orders
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SellerNav;
