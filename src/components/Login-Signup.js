import React, {Component} from 'react';
import helpers from '../utils/helpers.js';
import axios from 'axios';
import {CSSTransition} from 'react-transition-group';
// import {Transition} from 'react-spring';

// import cookies from 'react-cookie';
export default class LoginSignup extends Component {
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
            opacity: 1
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

        if(this.state.isStudent) {
            this.props.setUserType('student');
        } else if(this.state.isTeacher) {
            this.props.setUserType('teacher');
        }

        await helpers.addUser(this.state);
        // window.location.replace("/home");
        return this.props.authenticateToggle();
    }
    handleLogin = event => {
        event.preventDefault();
        
        let user = {
            loginemail: this.state.loginemail,
            loginpassword: this.state.loginpassword
        };
        
        axios.post('/api/login', {
            user,
            withCredentials: true,
            validateStatus: status => {
                return true;
            }
        }).then (res => {
            // window.location.reload();
            //********************************************** set state to parent component
            this.props.authenticateToggle();
        }).catch (error => {
            console.log("loginUser error: " + error);
        });
    }
    // this display login prompt
    handleLoginClick = event => {
        event.preventDefault();
        this.setState({displayLogin : true}) 
        this.setState({displaySignup : false})
    }
    // this displays signup prompt
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
                <CSSTransition in={!this.state.displayLogin && !this.state.displaySignup} classNames="fade" timeout={1000} unmountOnExit>
                    {state => (

                    <div id="loginOrSignup" className="container">
                        <h1 className="bold">Eisenhower Middle School</h1>
                        <div id="btnWrapper">
                            <button name="loginbtn" id="loginBtn" type="button" className="btn btn-outline-dark" onClick={this.handleLoginClick}>Login</button>
                            <button name="signupbtn" id="signupBtn" type="button" className="btn btn-dark" onClick={this.handleSignupClick}>Sign Up</button>
                        </div>
                    </div>
                    )}
                </CSSTransition>
                <CSSTransition in={this.state.displayLogin} classNames="fade" timeout={1000} unmountOnExit>
                    {state => (
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
                                <button type="submit" className="btn btn-dark">Login</button>
                                <button type="button" onClick={this.handleBack} className="btn btn-dark">Back</button>
                            </div>
                        </form>
                        </div> 
                    )}
                </CSSTransition>
                <CSSTransition in={this.state.displaySignup} classNames="fade" timeout={1000} unmountOnExit>
                    {state => (
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
                                    <button type="submit" className="btn btn-dark">Signup</button>
                                    <button onClick={this.handleBack} className="btn btn-dark">Back</button>
                                </div>
                            </form>
                        </div>
                    )}
                </CSSTransition>

                
            </div>
        )
    }
} 