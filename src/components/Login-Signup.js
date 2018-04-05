import React, {Component} from 'react';
import helpers from '../utils/helpers.js';

class LoginSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayLogin: false,
            displaySignup: false
        }
        //'this' bindings for handler events
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignupClick = this.handleSignupClick.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleSignup(event) {
        event.preventDefault();
    }
    handleLogin(event) {
        event.preventDefault();
    }
    handleLoginClick(event) {
        event.preventDefault();
        this.setState({displayLogin : true}) 
        this.setState({displaySignup : false})
    }
    handleSignupClick(event) {
        event.preventDefault();
        this.setState({displayLogin : false}) 
        this.setState({displaySignup : true})
    }
    handleBack(event) {
        event.preventDefault();
        this.setState({displayLogin: false});
        this.setState({displaySignup: false});
    }
    render() {
        return(
            <div id="login-signup-prompt">
                {/* display initial signup or login */}
                {!this.state.displayLogin && !this.state.displaySignup ?
                <div>
                    <h1>Login or Signup</h1>
                    <button name="loginbtn" onClick={this.handleLoginClick}>Login</button>
                    <button name="signupbtn" onClick={this.handleSignupClick}>Signup</button>
                </div>
                : this.state.displayLogin ? 
                <div>
                    {/* Login Prompt */}
                    <form method="get">
                        <label for="loginemail">E-mail:</label>
                        <input name="loginemail" type="text"/>
                        <label for="loginpassword">Password:</label>
                        <input name="loginpassword" type="password"/>
                    </form>
                    <button onClick={this.handleLogin}>Login</button>
                    <button onClick={this.handleBack}>Back</button>
                </div> 
                : this.state.displaySignup ? 
                <div>
                    {/* Signup Prompt */}
                    <form method="get">
                        <label for="fname">First Name:</label>
                        <input name="fname" type="text"/>
                        <label for="fname">Last Name:</label>
                        <input name="lname" type="text"/>
                        <div className="form-group">
                            <div>I am a...</div>
                            <label for="student">Student</label>
                            <input name="student" type="checkbox" value="Student"/>
                            <label for="student">Teacher</label>
                            <input name="teacher" type="checkbox" value="Teacher"/>
                        </div>
                        <label for="password">Password:</label>
                        <input name="password" type="password"/>
                        <label for="confirmpass">Confirm Password:</label>
                        <input name="confirmpass" type="password"/>
                        <button onClick={this.handleSignup}>Signup</button>
                        <button onClick={this.handleBack}>Back</button>
                    </form>
                </div> 
                : 
                <div>
                    <h1>Login or Signup</h1>                
                    <button name="loginbtn" onClick={this.handleLoginClick}>Login</button>
                    <button name="signupbtn" onClick={this.handleSignupClick}>Signup</button>
                </div>
                }
            </div>
        )
    }
} 

export default LoginSignup;