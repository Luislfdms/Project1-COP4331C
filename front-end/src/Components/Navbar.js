import React, {useState} from 'react'
import { useCookies } from "react-cookie"

const Navbar = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(window.location.pathname === "/search" && searchParams.has("q") ? searchParams.get("q") : "");
  const [cookies] = useCookies("userID");

  const onSearch = () => {
    window.location.assign(`/search?q=${query}`);
  }

  return <nav className="Navbar">
    <div className="home-nav"><a href="/">cont<b>x</b></a></div>
    <div className="searchbar"><input type="search" placeholder="Search..." className="query" disabled={!cookies.userID} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => {
      if (e.key === "Enter" && query) {
        e.preventDefault();
        onSearch();
      }
    }} /><button type="submit" alt="Search" className="search-button" onClick={onSearch} disabled={!query}>🔎</button></div>
    <div className="signin-info">
      {cookies.userID ? <a href="/logout">Logout</a> : <><a href="/login">Login</a> / <a href="/signup">Sign up</a></>}
    </div>
  </nav>
}

export default Navbar
