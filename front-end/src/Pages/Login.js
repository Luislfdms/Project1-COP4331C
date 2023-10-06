import React from 'react'
import { useState } from 'react';
import useFetch from '../Components/UseFetch';
import { useCookies } from "react-cookie";

const Login = () => {
  const link = 'url';
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);    
  
  const [cookies, setCookie] = useCookies("userID");

  const handleSubmit = async (e) => {
    var loginCredentials = {username,password}
    e.preventDefault()

    const body = JSON.stringify({username, password});
    console.log(body);

    const result = await fetch("/API/Login.php", {
      method: 'POST',// tells server that we are sending an object
      headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
      body
    });
    if (result.ok) {
      try {
        const json = await result.json();
        setCookie("userID", json.user_id);
        console.log('user logged in', json);
        window.location.assign("/contacts");
        return;
      } catch (e) {
        console.error(e);
        setErrorMessages({name: "json", message: "The response from the server could not be parsed."})
      }
    } else {
      setErrorMessages({name: "api", message: await result.text()})
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
      <button onClick={redirectSignUp}> sign up </button>
    </div>
    );
          
  return (
    
    <div className="login form">
          {isSubmitted ?  <div>User is successfully logged in</div>: cookies.userID ? <div className="error">You're already signed in!</div> : loginForm} 
    </div>
  );
}

export default Login; 
