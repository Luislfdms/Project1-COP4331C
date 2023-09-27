import React from 'react'
import { useState } from "react";
import {useHistory} from "react-router-dom"

function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');// varieble to get username
  const [password, setPassword] = useState('');//variable to get password
  const [isPending, setIsPending] = useState(false);// variable to display is pending message

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password};

    setIsPending(true);

    fetch('http://localhost:3000/users/', {// ****** need to enter API endpoint in order to post user/pw
      method: 'POST',// tells server that we are sending an object
      headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
    }).then(() => {
      console.log('new user added');
      setIsPending(false);
     // history.go(-1); goes back one page
     history.push('/');// takes us back to home page usin its route
    })
  }
  return (
    <div className="signup form">
        <h2> Enter information to Sign up</h2>
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

          <label>re-enter Password</label>
          <input 
          type="text"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Sign up" /> 
        </form>
    </div>
  )
}
export default Signup