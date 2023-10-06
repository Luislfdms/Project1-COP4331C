import React from 'react'
import { useState } from "react";
import {useHistory, Navigate} from "react-router-dom"
import {useCookies} from "react-cookie"

function Signup() {
  const history = useHistory();
  const [passwordTry1,setPasswordTry1] = useState("");
  const [passwordTry2,setPasswordTry2] = useState("");
  const [username, setUsername] = useState('');// varieble to get username
  const [password, setPassword] = useState('');//variable to get password
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);    

  const [cookies, setCookie] = useCookies("userID");

  function comparePass (passwordTry1,passwordTry2) 
  {
    if(passwordTry1 === passwordTry2)
    {
      setPassword(passwordTry1);
      return true
    }
    else 
      return false
  }

  const error = {
    pass: "passwords do not match"
  }

  const handleSubmit = async(e) => {
    setIsSubmitted(true);
    const passwordMatch = comparePass(passwordTry1,passwordTry2);
    if(passwordMatch)
    {
      e.preventDefault();
      var user = { username, password};

        const result = await fetch('/API/Register.php', {
          method: 'POST',// tells server that we are sending an object
          headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
          body: JSON.stringify({username, password})
        });
        if (result.ok) {
          try {
            const json = await result.json();
            setCookie("userID", json.user_id);
            console.log('new user added', json);
            window.location.assign("/contacts");
            return;
          } catch (e) {
            console.error(e);
            setErrorMessage({name: "json", message: "The response from the server could not be parsed."})
          }
        } else {
          setErrorMessage({name: "api", message: await result.text()});
        }
    } else {
      setErrorMessage({name: "pass", message:error.pass})
    }
    setIsSubmitted(false);
}  
const signupForm = (
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
          type="password"
          required
          value={passwordTry1}
          onChange={(e) => setPasswordTry1(e.target.value)}
          name='pass'
          />

        <label>re-enter Password</label>
        <input 
        type="password"
        required
        value={passwordTry2}
        onChange={(e) => setPasswordTry2(e.target.value)}
        name='pass'
        />

        <input type="submit" value="Sign up" /> 
      </form>
  </div>
);
  
  return (
    <div className="signup form">
      {errorMessage&&<div className="error">{errorMessage.message}</div>}
      {isSubmitted ? <div>Successfully signed up</div>: cookies.userID ? <div className="error">You're already logged in!</div> : signupForm}
        {/* {user && <Navigate to="/contacts" replace = {true}/>} */}
    </div>
  )
}

export default Signup