import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import BadgePage from './BadgePage';
import Home from './Home';
import Students from "./Students";

// import View from './View';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /profile
// and /badges routes will match any pathname that starts
// with /profile or /badges. The / route will only match
// when the pathname is exactly the string "/"
const Main = props => (
  <main id="main">
    <Dashboard />
    <div id="view">
        <Switch>
            <Route exact path='/home' component={Home}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/badges' component={BadgePage}/>
            <Route path='/students' component={Students}/>
            <Route path ='/logout'/>
        </Switch>
    </div>
  </main>
)

export default Main