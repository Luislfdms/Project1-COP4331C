import React from 'react'
import {useCookies} from "react-cookie"
import {useHistory} from "react-router-dom"

const Home = () => {
  const [cookies] = useCookies();
  const history = useHistory();
  history.push(cookies.userID ? "/contacts" : "/login")
  return (
    <div>
      <h1>Personal Contact Manager</h1>
    </div>
  )
}

export default Home
  