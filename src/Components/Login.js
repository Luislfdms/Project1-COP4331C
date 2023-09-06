import React from 'react'
import styled from 'styled-components'

const Login = ()=> {
  return (
    <div className="login">
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


        <button>login</button>
    </div>
  );
}

export default Login; 
