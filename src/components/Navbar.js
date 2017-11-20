import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav>
    <ul id="homelink">
      <li>
        <Link to="/">
          <strong id="homebutt">Home</strong>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
