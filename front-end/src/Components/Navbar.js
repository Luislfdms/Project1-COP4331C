import React, {useState, useEffect} from 'react'
import { useCookies } from "react-cookie"
import { Link, useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState(location.pathname === "/search" && searchParams.has("q") ? searchParams.get("q") : "");
  const [cookies] = useCookies(["userID"]);
  const history = useHistory();

  const onSearch = () => {
    history.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return <nav className="Navbar">
    <div className="home-nav"><Link to="/">Home<b></b></Link></div>
    <div className="searchbar"><input type="search" placeholder="Search..." className="query" disabled={!cookies.userID} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => {
      if (e.key === "Enter" && query) {
        e.preventDefault();
        onSearch();
      }
    }} /><button type="submit" alt="Search" className="search-button" onClick={onSearch} disabled={!query}>🔎︎</button></div>
    <div className="signin-info">
      {cookies.userID ? <Link to="/logout">Logout</Link> : <><Link to="/login">Login</Link><Link to="/signup">Sign up</Link></>}
    </div>
  </nav>
}

export default Navbar
