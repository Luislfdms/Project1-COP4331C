import React from 'react'

const Navbar = () => (
  <nav className="Navbar">
    <div className="home-nav"><a href="/">Personal Contact Manager</a></div>
    <div className="searchbar"><input type="search" placeholder="Search..." class="query" /><input type="submit" value="🔎" alt="Search" className="search-button" /></div>
    <div className="signin-info">
      <a href="/login">Login</a> / <a href="/signup">Sign up</a>
    </div>
  </nav>
)

export default Navbar
