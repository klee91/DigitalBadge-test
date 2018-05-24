import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Profile from './Profile';
import BadgePage from './BadgePage';
import Home from './Home';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /profile
// and /badges routes will match any pathname that starts
// with /profile or /badges. The / route will only match
// when the pathname is exactly the string "/"
const View = () => (
    <div id="view">
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/badges' component={BadgePage}/>
        </Switch>
    </div>
);

export default View;