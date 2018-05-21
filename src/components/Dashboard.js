import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return(
            <div id="dashboard">
                <nav> 
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/badges'>Badges</Link></li>
                </ul>
                </nav>
            </div>
        )
    }
}

export default Dashboard;