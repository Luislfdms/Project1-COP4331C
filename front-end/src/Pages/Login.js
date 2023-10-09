import React from 'react'
import { useState, useEffect } from 'react';
import useFetch from '../Components/UseFetch';
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Login = () => {
  const link = 'url';
  const history = useHistory();
  const [username,setUsername] = useState(history.location.state?.username || "");
  const [password,setPassword] = useState("");
  const [usernameDirtied, setUsernameDirtied] = useState(false);
  const [passwordDirtied, setPasswordDirtied] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const DEBUG = window.location.hostname === "localhost";
  const [ephemMsg, setEphemMsg] = useState(history.location.state?.msg || "");
  const [ephemMsgShown, setEphemMsgShown] = useState(false);
  
  const [cookies, setCookie] = useCookies(["userID"]);

  useEffect(() => {
    if (ephemMsgShown) setEphemMsg("");
  }, [username, password, isSubmitted]);
  setTimeout(() => setEphemMsgShown(true), 5000);
  
  //useEffect(() => setUsernameDirtied(true), [username]);
  //useEffect(() => setPasswordDirtied(true), [password]);
    useEffect(() => {
      if (username && password) setErrorMessages(null);
    }, [username, password]);
  
  const handleInvalid = e => {
    e.preventDefault();
    setUsernameDirtied(true);
    setPasswordDirtied(true);
    setErrorMessages({name: "input", message: `Please enter a ${[!username && "username", !password && "password"].filter(i=>i).join(" and ")}.`});
  }

  const handleSubmit = async (e) => {
    setUsernameDirtied(true);
    setPasswordDirtied(true);
    setEphemMsg("");
    var loginCredentials = {username,password}
    e.preventDefault()
    if (DEBUG) {
      if (username === "FAIL") {
        setErrorMessages({name: "api", message: "Testing failure!"});
        setIsSubmitted(false);
        return;
      }
      setCookie("userID", 1);
      console.log("logged in (debug)");
      history.push("/contacts");
      return;
    }

    const body = JSON.stringify({username, password});
    console.log(body);

    const result = await fetch("/API/Login.php", {
      method: 'POST',// tells server that we are sending an object
      headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
      body
    });
    let json;
    try {
      json = await result.json();
    } catch (e) {
      console.error(e);
      setErrorMessages({name: "json", message: "The response from the server could not be parsed."})
      setIsSubmitted(false);
      return;
    }
    if (result.ok) {
      setCookie("userID", json.user_id);
      console.log('user logged in', json);
      history.push("/contacts");
      return;
    } else {
      console.error(json);
      setErrorMessages({name: "api", message: json.error});
      setIsSubmitted(false);
    }
  }
  const errors = {
    uname : "invalid username",
    pass: "invalid password"
  };
  
  const redirectSignUp = () => {
    return history.push("/signup")
  }
   
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const loginForm = (
  <div className="form-container">
    <img src="/logo.png" className="logo" alt="ContX" height={171} />
    <form className='login form' onSubmit={handleSubmit}>
      {ephemMsg && <div className="ephemeral">{ephemMsg}</div>}
      <h2>Enter login information</h2>
      <div>
        <label>Username
        <input 
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={e => setUsernameDirtied(true)}
          name='uname'
          className={usernameDirtied && !username ? "invalid" : ""}
          maxLength={50}
        />
        </label>
      </div>
      <div>
        <label>Password
        <input 
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={e => setPasswordDirtied(true)}
          name= 'pass'
          className={passwordDirtied && !password ? "invalid" : ""}
          />
        </label>
      </div>
      <input type="submit" value="Log in" disabled={errorMessages != null} className={username && password ? "primary" : ""} onClick={e => e.target.className === "primary" || handleInvalid(e)}/> 
      {errorMessages && <div className="error">{errorMessages.message}</div>}
      <button className="secondary" onClick={redirectSignUp}>Sign up</button>
    </form>
  </div>
    );
          
  return (
    isSubmitted ?  <div>User is successfully logged in</div>
    : cookies.userID ? <div className="error">You're already signed in!</div>
    : loginForm
  );
}

export default Login; 
