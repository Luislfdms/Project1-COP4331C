import React from 'react'
import {useCookies} from "react-cookie"

const Home = () => {
  const [cookies] = useCookies();
  window.location.replace(cookies.userID ? "/contacts" : "/login")
  return (
    <div>
      <h1>Personal Contact Manager</h1>
    </div>
  )
}

export default Home
  