import React, {Component} from 'react';
import cookies from 'react-cookie';
import helpers from '../utils/helpers.js';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            user: null
        }
    }
    componentWillMount() {
        let userCookie = cookies.load('user_id');
        if (userCookie) {

            this.setState({
                userId: userCookie,
                user: this.props.user
            });
        }

    }
    render() {
        return(
            <div id="profile">
                Profiles
                <div>{this.state.userId}</div>
            </div>
        )
    }
}

export default Profile;