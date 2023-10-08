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

  const handleSubmit = async (e) => {
    setEphemMsg("");
    var loginCredentials = {username,password}
    e.preventDefault()
    if (DEBUG) {
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
    <div className='login form'>
      {ephemMsg && <div className="ephemeral">{ephemMsg}</div>}
      <h2> Enter information to log-in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username
          <input 
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name='uname'
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
            name= 'pass'
            />
          </label>
        </div>
        <input type="submit" value="Log in" /> 
        {errorMessages && <div class="error">{errorMessages.message}</div>}
      </form>
      <button onClick={redirectSignUp}> sign up </button>
    </div>
    );
          
  return (
    isSubmitted ?  <div>User is successfully logged in</div>: cookies.userID ? <div className="error">You're already signed in!</div> : loginForm
  );
}

export default Login; 
