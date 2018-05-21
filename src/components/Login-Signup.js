import React, {Component} from 'react';
import helpers from '../utils/helpers.js';
import axios from 'axios';
class LoginSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayLogin: false,
            displaySignup: false,
            firstName: '',
            lastName: '',
            email: '',
            isStudent: false,
            isTeacher: false,
            password: '',
            loginemail: '',
            loginpassword: '',
            isAuthenticated: false
        }
        //'this' bindings for event handlers
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleSignupClick = this.handleSignupClick.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }
    componentDidMount() {
        //if user has act cookie, automatically authenticate and log in
        console.log(this.state.isAuthenticated);
    }
    handleChange = event => {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }
    handleUserChange = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;

        this.setState({
        [name]: value
        });
        // if(event.target.value == )
        // this.setState({
        //     event.target.name = ;
        // })
    }
    handleSignup = event =>{
        event.preventDefault();
        console.log(this.state);
        helpers.addUser(this.state);
    }
    handleLogin = event => {
        event.preventDefault();
        let user = {
            email: this.state.loginemail,
            password: this.state.loginpassword
        };
        axios.post('/api/login', {
            user,
            headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
            validateStatus: status => {
                return true;
            }
        }).then(res =>{
            console.log("RES: " + res);
            this.setState({isAuthenticated: true});
        }).catch(error =>{
            console.log("loginUser error: " + error);
        });
    }
    handleLoginClick = event => {
        event.preventDefault();
        this.setState({displayLogin : true}) 
        this.setState({displaySignup : false})
    }
    handleSignupClick = event => {
        event.preventDefault();
        this.setState({displayLogin : false}) 
        this.setState({displaySignup : true})
    }
    handleBack = event => {
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
                    <form onSubmit={this.handleLogin} method="get">
                        <label htmlFor="loginemail">E-mail:</label>
                        <input name="loginemail" type="text"/>
                        <label htmlFor="loginpassword">Password:</label>
                        <input name="loginpassword" type="password"/>
                    
                        <button type="submit">Login</button>
                    </form>
                    <button onClick={this.handleBack}>Back</button>
                </div> 
                : this.state.displaySignup ? 
                <div>
                    {/* Signup Prompt */}
                    <form onSubmit={this.handleSignup} method="post">
                        <label htmlFor="firstName">First Name:</label>
                        <input name="firstName" type="text" onChange={this.handleChange}/>
                        <label htmlFor="lastName">Last Name:</label>
                        <input name="lastName" type="text" onChange={this.handleChange}/>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="text" onChange={this.handleChange}/>
                        <div className="form-group">
                            <div>I am a...</div>
                            <label htmlFor="student">Student</label>
                            <input name="isStudent" type="checkbox" checked={this.state.isStudent} onChange={this.handleUserChange}/>
                            <label htmlFor="student">Teacher</label>
                            <input name="isTeacher" type="checkbox" checked={this.state.isTeacher} onChange={this.handleUserChange}/>
                        </div>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" onChange={this.handleChange}/>
                        <label htmlFor="confirmpass">Confirm Password:</label>
                        <input name="confirmpass" type="password" onChange={this.handleChange}/>
                        <button type="submit">Signup</button>
                        <button onClick={this.handleBack}>Back</button>
                    </form>
                </div> 
                : 
                // Initial Login/Signup Prompt
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