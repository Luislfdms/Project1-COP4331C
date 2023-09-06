import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

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
          </Switch>
        </div>
     </Router>
    );
}

export default App;
