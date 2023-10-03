import React from 'react'
import { useState } from 'react';
import useFetch from '../Components/UseFetch';

const Login = () => {
  const link = 'url';
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);    
  
  const handleSubmit = (e) => {
    var loginCredentials = {username,password}
    e.preventDefault()

    const result = fetch()
    const userData = result.find((user)=> user.username === loginCredentials.username)
      if(userData)
      {
        if (userData.password !== loginCredentials.password) {
          setErrorMessages({name: "pass", message:errors.pass});
        }
        else{
          setIsSubmitted(true);
        }
      }
      else{
        setErrorMessages({name: "uname" , message: errors.uname});
      }
  }
  const errors = {
    uname : "invalid username",
    pass: "invalid password"
  };
  
  const redirectSignUp = () => {
    return  window.location.assign("/signup")
  }
   
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const loginForm = (
    <div className='loginForm'>
      <h2> Enter information to log-in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name='uname'
          />
          {renderErrorMessage("uname")}
        </div>
        <div>
          <label>Password</label>
          <input 
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name= 'pass'
            />
            {renderErrorMessage("pass")}
        </div>
        <input type="submit" value="Log in" /> 
      </form>
    </div>
    );
          
  return (
    
    <div className="login form">
          {isSubmitted ?  <div>User is successfully logged in</div>: loginForm} 
          <button onClick={redirectSignUp}> sign up </button>
    </div>
  );
}

export default Login; 
