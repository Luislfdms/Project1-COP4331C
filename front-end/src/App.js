import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Contacts from './Pages/Contacts';

// default page needs to prompt the user to login or signup
function App() {
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
          </Switch>
        </div>
     </Router>
    );
}

export default App;
