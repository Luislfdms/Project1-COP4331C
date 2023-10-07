import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Contacts from './Pages/Contacts';
import CreateContact from './Pages/CreateContact'
import EditContact from "./Pages/EditContact.js";
import Logout from "./Pages/Logout.js";
import { useCookies } from "react-cookie";
import SearchResults from "./Pages/SearchResults.js";
import {Redirect} from "react-router-dom";

// default page needs to prompt the user to login or signup
function App() {
  const [cookies] = useCookies(["userID"]);

  const RequireUser = ({children, loggedOut=false})=>{
    if (loggedOut === !cookies.userID) {
      return children;
    } else return <Redirect to="/" />
  }

  return (
    // <Router>
      <>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path = "/">
              {cookies.userID ? <Redirect to="/contacts" /> : <Redirect to="/login" />}
              {/* <Home /> */}
            </Route>
            <Route path = "/login" >
              <RequireUser loggedOut><Login /></RequireUser>
            </Route>
            <Route path = "/signup" >
              <RequireUser loggedOut><Signup /></RequireUser>
            </Route>
            <Route path = "/contacts" >
              <RequireUser><Contacts /></RequireUser>
            </Route>
            <Route path = "/create">
              <RequireUser><CreateContact /></RequireUser>
            </Route>
            <Route path="/search">
              <RequireUser><SearchResults /></RequireUser>
            </Route>
            <Route path="/logout">
              <RequireUser><Logout /></RequireUser>
            </Route>
            <Route path="/edit/:contactID">
              <RequireUser><EditContact /></RequireUser>
            </Route>
            <Route>
              <div className="error">Page not found.</div>
            </Route>
          </Switch>
        </div>
      </>
    //  </Router>
    );
}

export default App;
