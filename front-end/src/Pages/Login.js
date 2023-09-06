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
    </div>
  );
}

export default Login; 
