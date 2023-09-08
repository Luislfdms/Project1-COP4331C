import React from 'react'

const Login = ()=> {

  return (
    <div className="login form">
        <h2> Enter information to log-in</h2>
          <label>Username</label>
          <input 
            type="text"
            required
            
          />

          <label>Password</label>
          <input 
            type="text"
            required
            />

          <button>Login</button>
          <p>if you do not currently have an account <a href="/signup"> Click Here </a> to sign up</p>
    </div>
  );
}

export default Login; 
