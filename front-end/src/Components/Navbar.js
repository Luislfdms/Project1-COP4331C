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
    <div className="searchbar"><input type="search" placeholder="Search..." className="query" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch();
      }
    }} /><input type="submit" value="🔎" alt="Search" className="search-button" onClick={onSearch} /></div>
    <div className="signin-info">
      {cookies.userID ? <a href="/logout">Logout</a> : <><a href="/login">Login</a> / <a href="/signup">Sign up</a></>}
    </div>
  </nav>
}

export default Navbar
