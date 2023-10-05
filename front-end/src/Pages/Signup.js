import React from 'react'
import { useState } from "react";
import {useHistory, Navigate} from "react-router-dom"

function Signup() {
  const history = useHistory();
  const [passwordTry1,setPasswordTry1] = useState("");
  const [passwordTry2,setPasswordTry2] = useState("");
  const [username, setUsername] = useState('');// varieble to get username
  const [password, setPassword] = useState('');//variable to get password
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);    

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
    const passwordMatch = comparePass(passwordTry1,passwordTry2);
    if(passwordMatch)
    {
      e.preventDefault();
      var user = { username, password};

        const result = await fetch('http://contx.pro/API/Register.php', {// ****** need to enter API endpoint in order to post user/pw
          method: 'POST',// tells server that we are sending an object
          headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
          // body: JSON.stringify(user)
          body: FormData,
          mode: "cors"
        })
        console.log('new user added');
        setIsSubmitted(true);
    }
    else{
      setErrorMessage({name: "pass", message:error.pass})
      setIsSubmitted(false);
    }
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
      {errorMessage&&<p>{errorMessage.message}</p>}
      {isSubmitted ? <div>Successfully signed up</div>: signupForm}
        {/* {user && <Navigate to="/contacts" replace = {true}/>} */}
    </div>
  )
}

export default Signup