import React, {Component} from 'react';
import cookies from 'react-cookie';
// import helpers from '../utils/helpers.js';
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
            <div className="page" id="profile">
                <h1 className="page-title">Your Profile</h1>
                <hr />
                <section>
                    {/* <h3 className="subtitle"></h3> */}
                </section>
            </div>
        )
    }
}

export default Profile;