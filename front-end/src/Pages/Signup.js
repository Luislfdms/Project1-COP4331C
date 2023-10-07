import React from 'react'
import { useState, useEffect } from "react";
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

  useEffect(() => {
    setPassword(passwordTry1 === passwordTry2 ? passwordTry1 : "");
  }, [passwordTry1, passwordTry2]);

  const error = {
    pass: "passwords do not match"
  }

  const handleSubmit = async(e) => {
    setIsSubmitted(true);
    if(username && password)
    {
      e.preventDefault();
      const body = JSON.stringify({username, password});
      console.log(body);

        const result = await fetch('/API/Register.php', {
          method: 'POST',// tells server that we are sending an object
          headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
          body
        });
        let json;
        try {
          json = await result.json();
        } catch (e) {
          console.error(e);
          setErrorMessage({name: "json", message: "The response from the server could not be parsed."})
          setIsSubmitted(false);
          return;
        }
        if (result.ok) {
          setCookie("userID", json.user_id);
          console.log('new user added', json);
          window.location.assign("/contacts");
          return;
        } else {
          console.error(json);
          setErrorMessage({name: "api", message: json.error});
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
        {errorMessage.message&&<div className="error">{errorMessage.message}</div>}
      </form>
  </div>
);
  
  return (
    isSubmitted ? <div>Successfully signed up</div>: cookies.userID ? <div className="error">You're already logged in!</div> : signupForm
  )
}

export default Signup