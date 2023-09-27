import React from 'react'
import { useState } from 'react';
import useFetch from '../Components/UseFetch';

const Login = () => {
  const link = 'url';
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const {data:users,isPending,error} = useFetch(link);
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

  const handleSubmit = (e) => {
    e.preventDefault()
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
        setauthenticated(true)
        localStorage.setItem("authenticated", true);
    }
  }
  return (
    <div className="login form">
        <h2> Enter information to log-in</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input 
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input 
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

          <input type="submit" value="Log in" />  
          </form>
          <p>if you do not currently have an account <a href="/signup"> Click Here </a> to sign up</p>
    </div>
  );
}

export default Login; 
