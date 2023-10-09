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
  const [usernameDirtied, setUsernameDirtied] = useState(false);
  const [password1Dirtied, setPassword1Dirtied] = useState(false);
  const [password2Dirtied, setPassword2Dirtied] = useState(false);

  const [cookies, setCookie] = useCookies(["userID"]);
  const DEBUG = window.location.hostname === "localhost";

  useEffect(() => {
    setPassword(passwordTry1 === passwordTry2 ? passwordTry1 : "");
  }, [passwordTry1, passwordTry2]);
  //useEffect(() => setUsernameDirtied(true), [username]);
  //useEffect(() => setPassword1Dirtied(true), [passwordTry1]);
  //useEffect(() => setPassword2Dirtied(true), [passwordTry2]);
    useEffect(() => {
      if (username && password) setErrorMessage(null);
    }, [username, password]);

  const error = {
    pass: "passwords do not match"
  }
  
  const handleInvalid = e => {
    e.preventDefault();
    setUsernameDirtied(true);
    setPassword1Dirtied(true);
    setPassword2Dirtied(true);
    const passwordMessage = !password && (!passwordTry1 ? "enter a password" : ! passwordTry2 ? "reenter your password" : "ensure your passwords match");
    setErrorMessage({name: "input", message: `Please ${!username && !passwordTry1 ? "enter a username and password" : [!username && "enter a username", passwordMessage].filter(i=>i).join(" and ")}.`});
  }

  const handleSubmit = async(e) => {
    setUsernameDirtied(true);
    setPassword1Dirtied(true);
    setPassword2Dirtied(true);
    e.preventDefault();
    
    if(username && password)
    {
      setIsSubmitted(true);
      const body = JSON.stringify({username, password});
      console.log(body);

        const result = DEBUG ? {ok: 1, json() {}} : await fetch('/API/Register.php', {
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
          // setCookie("userID", json.user_id);
          console.log('new user added', json);
          history.push("/login", {msg: "Signed up successfully.", username});
          return;
        } else {
          console.error(json);
          setErrorMessage({name: "api", message: json.error});
        }
    } else {
      handleInvalid(e);
    }
    setIsSubmitted(false);
}
const signupForm = (
  <div className="signup form">
      <h2> Enter information to Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username
        <input 
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={e => setUsernameDirtied(true)}
          className={usernameDirtied && !username ? "invalid" : ""}
        />
        </label>

        <label>Password
        <input 
          type="password"
          required
          value={passwordTry1}
          onChange={(e) => setPasswordTry1(e.target.value)}
          onBlur={e => setPassword1Dirtied(true)}
          name='pass'
          maxLength={50}
          className={password1Dirtied && !passwordTry1 ? "invalid" : ""}
          />
        </label>

        <label>re-enter Password
        <input 
        type="password"
        required
        value={passwordTry2}
        onChange={(e) => setPasswordTry2(e.target.value)}
        onBlur={e => setPassword2Dirtied(true)}
        name='pass2'
        maxLength={50}
        className={password2Dirtied && !password ? "invalid" : ""}
        />
        </label>

        <input type="submit" value="Sign up" className={username && password ? "primary" : ""} onClick={e => e.target.className === "primary" || handleInvalid(e)}/> 
        {isSubmitted && <div className="pending">Signing you up...</div>}
        {errorMessage?.message&&<div className="error">{errorMessage.message}</div>}
      </form>
  </div>
);
  
  return (
    cookies.userID ? <div className="error">You're already logged in!</div> : signupForm
  )
}

export default Signup