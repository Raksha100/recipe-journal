// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Recipe Journal 📓</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/recipes">Recipes</a></li>
        <li><a href="/add-recipe">Add Recipe</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Sign Up</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;