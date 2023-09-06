import React from 'react'
import { useState } from "react";
import {useHistory} from "react-router-dom"
function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password};

    setIsPending(true);

    fetch('http://localhost:3000/users/', {
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

          {!isPending && <button>Sign up</button>}
          {isPending && <button>Signing you up</button>}
        </form>
    </div>
  )
}
export default Signup