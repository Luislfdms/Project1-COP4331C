import React from 'react'

function Signup() {
  return (
    <div className="signup form">
          <h2> Enter information to Sign up</h2>
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

          <label>re-enter Password</label>
           <input 
          type="text"
          required
          />
        <button>Sign up</button>
    </div>
  )
}
export default Signup