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

// default page needs to prompt the user to login or signup
function App() {
  const [cookies] = useCookies();
  return (
    <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path = "/">
              <Home />
            </Route>
            <Route path = "/login" >
              <Login />
            </Route>
            <Route path = "/signup" >
              <Signup />
            </Route>
            <Route path = "/contacts" >
              <Contacts />
            </Route>
            <Route path = "/create">
              <CreateContact />
            </Route>
            <Route path="/search">
              <SearchResults />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/edit/:contactID">
              <EditContact />
            </Route>
            <Route>
              <div className="error">Page not found.</div>
            </Route>
          </Switch>
        </div>
     </Router>
    );
}

export default App;
