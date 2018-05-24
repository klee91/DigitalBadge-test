import React, {Component} from 'react';
import helpers from '../utils/helpers.js';
import axios from 'axios';
import cookies from 'react-cookie';
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
            loginpassword: ''
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
        console.log('from parent: ' + this.props.isAuthenticated);
        console.log('from current: ' + this.state.isAuthenticated);
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
    handleSignup = async event => {
        event.preventDefault();
        await helpers.addUser(this.state);
        window.location.replace("/home");
        return false;
    }
    handleLogin = event => {
        event.preventDefault();

        let user = {
            loginemail: this.state.loginemail,
            loginpassword: this.state.loginpassword
        };
        // let act = cookies.load('act');
        axios.post('/api/login', {
            user,
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
                // 'x-access-token' : cookies.load('act'),
            },
            // Cookie: "act=" + act,
            withCredentials:true,
            validateStatus: status => {
                return true;
            }
        }).then (res => {
            console.dir( res);
            //********************************************** set state to parent component
            // this.setState({isAuthenticated: true});
        }).catch (error => {
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
                <div id="loginOrSignup" className="container">
                    <h1>Login or Sign Up</h1>
                    <div id="btnWrapper">
                        <button name="loginbtn" id="loginBtn" type="button" className="btn btn-outline-info" onClick={this.handleLoginClick}>Login</button>
                        <button name="signupbtn" id="signupBtn" type="button" className="btn btn-info" onClick={this.handleSignupClick}>Sign Up</button>
                    </div>
                </div>
                : this.state.displayLogin ? 
                <div id="loginForm">
                    {/* Login Prompt */}
                    <form onSubmit={this.handleLogin} method="get">
                        <h2 className="formTitle">Login</h2>
                        <div className="form-group">
                            <input name="loginemail" id="loginemail" type="text" className="form-control form-control-lg" placeholder="Enter Email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input name="loginpassword" id="loginpassword" type="password" className="form-control form-control-lg" placeholder="Enter Password" onChange={this.handleChange}/>
                        </div>
                        <div className="btnFormWrapper">
                            <button type="submit" className="btn">Login</button>
                            <button type="button" onClick={this.handleBack} className="btn">Back</button>
                        </div>
                    </form>
                </div> 
                : this.state.displaySignup ? 
                <div id="signupForm">
                    {/* Signup Prompt */}
                    <form onSubmit={this.handleSignup} method="post">
                        <h2 className="formTitle">Sign Up</h2>
                        <div className="form-group">
                            <input className="form-control" id="firstName" name="firstName" type="text" onChange={this.handleChange} placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" id="lastName" name="lastName" type="text" onChange={this.handleChange} placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" id="email" name="email" type="text" onChange={this.handleChange} placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <div>I am a...</div>
                            <div className="form-check">
                                <input className="form-check-input" id="isStudent" name="isStudent" type="checkbox" checked={this.state.isStudent} onChange={this.handleUserChange}/>
                                <label className="form-check-label" htmlFor="student">Student</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" id="isTeacher" name="isTeacher" type="checkbox" checked={this.state.isTeacher} onChange={this.handleUserChange}/>
                                <label className="form-check-label" htmlFor="student">Teacher</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input className="form-control" id="password" name="password" type="password" onChange={this.handleChange} placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" id="confirmpass" name="confirmpass" type="password" onChange={this.handleChange} placeholder="Confirm Password"/>
                        </div>
                        <div className="btnFormWrapper">
                            <button type="submit" className="btn">Signup</button>
                            <button onClick={this.handleBack} className="btn">Back</button>
                        </div>
                    </form>
                </div> 
                : 
                // Initial Login/Signup Prompt
                <div id="loginOrSignup" className="container">
                    <h1>Login or Sign Up</h1>
                    <div id="btnWrapper">
                        <button name="loginbtn" id="loginBtn" type="button" className="btn btn-outline-info" onClick={this.handleLoginClick}>Login</button>
                        <button name="signupbtn" id="signupBtn" type="button" className="btn btn-info" onClick={this.handleSignupClick}>Sign Up</button>
                    </div>
                </div>
                }
            </div>
        )
    }
} 

export default LoginSignup;