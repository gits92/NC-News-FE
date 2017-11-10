import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">
          <strong>Home</strong>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
