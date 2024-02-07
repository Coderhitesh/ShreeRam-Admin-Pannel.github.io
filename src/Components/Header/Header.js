// Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <>
      <div className="header-section">
        <div className="container">
          <div className="heading">
            <span>Admin-Dashboard</span>
          </div>
          <nav>
          <Link to="/">Home</Link>
            <Link to="/products">Add Products</Link>
            <Link to="/All-products">All-Product</Link>

            <Link to="/All-Order">Orders</Link>
            <Link to="/shipped">Shipped</Link>

            <Link to="/payments">Payments</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </div>

    </>
  );
};

export default Header;
