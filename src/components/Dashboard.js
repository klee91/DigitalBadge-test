import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Main Dashboard after initial login
// Depending on teacher or student, will render different links
class Dashboard extends Component {
    handleLogout() {
        axios.post('/api/logout'
        // , {headers:{'Content-Type' : 'application/x-www-form-urlencoded'}}
        ).then (res => {
            console.log("RES: " + res);
        }).catch (error => {
            console.log("logoutUser error: " + error);
        });
    }
    render() {
        return(
            <div id="dashboard">
                <nav> 
                <ul id="dashboardLinks">
                    <Link to='/home'><li>Home</li></Link>
                    <Link to='/profile'><li>Profile</li></Link>
                    <Link to='/badges'><li>Badges</li></Link>
                    <Link to='/students'><li>Students</li></Link>
                    <Link to='/' onClick={this.handleLogout.bind(this)}><li>Log Out</li></Link>
                </ul>
                </nav>
            </div>
        )
    }
}

export default Dashboard;