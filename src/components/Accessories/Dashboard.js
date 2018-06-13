import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/img/db-logo-prototype.png';
// Main Dashboard after initial login
// Depending on teacher or student, will render different links
export default class Dashboard extends Component {
    handleLogout() {
        axios.post('/api/logout'
        // , {headers:{'Content-Type' : 'application/x-www-form-urlencoded'}}
        ).then (() => {
            this.props.stateLogout();
        }).catch (error => {
            console.log("logoutUser error: " + error);
        });
    }
    render() {
        return(
            <div id="dashboard">
                <div id="navBrand">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <nav> 
                {this.props.user.isStudent ?
                    <ul id="dashboardLinks">
                        <li><NavLink exact activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home' >Home</NavLink></li>
                        <li><NavLink activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home/profile' >Profile</NavLink></li>
                        <li><NavLink activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home/badges' >Badges</NavLink></li>
                        <li><NavLink activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home/students' >Students</NavLink></li>
                        <li><NavLink to='/' onClick={this.handleLogout.bind(this)}>Log Out</NavLink></li>
                    </ul>
                : 
                    <ul id="dashboardLinks">
                        <li><NavLink exact activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home' >Home</NavLink></li>
                        <li><NavLink activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home/profile' >Profile</NavLink></li>
                        <li><NavLink activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home/badges' >Badges</NavLink></li>
                        <li><NavLink activeClassName='selected' activeStyle={{fontWeight: 'bold'}} to='/home/teachers' >Teachers</NavLink></li>
                        <li><NavLink to='/' onClick={this.handleLogout.bind(this)}>Log Out</NavLink></li>
                    </ul>
                }
                </nav>
            </div>
        )
    }
}
