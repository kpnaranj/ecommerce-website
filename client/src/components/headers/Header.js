// Public Variables
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
// Icons Font Awesome
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
// Header export
export default function Header() {
  // We created a global state of elements
  const value = useContext(GlobalState);
  // Then we send value of elements as value
  return (
    <header>
      {/* Menu Icon */}
      <div className="menu">
        <img src={Menu} alt="menuIcon" width="30" />
      </div>
      {/* Logo Icon */}
      <div className="logo">
        <h1>
          <Link to="/">KNarsh Shops</Link>
        </h1>
      </div>
      {/* Navbar elements  */}
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login + Register</Link>
        </li>
        <li>
          <img className="menu" src={Close} alt="closeIcon" width="30" />
        </li>
      </ul>
      {/*Cart section */}
      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={Cart} alt="cartIcon" width="30" />
        </Link>
      </div>
    </header>
  );
}
