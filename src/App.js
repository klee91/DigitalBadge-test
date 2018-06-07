import React, { Component } from 'react';
import LoginSignup from './components/Login-Signup.js';
import cookies from 'react-cookie';
import Main from './components/Main.js';
import {Route} from 'react-router-dom';
import './App.css';
// ADD DETECTION FOR USER TYPE TO PASS TO CHILD MAIN Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isStudent: false,
      isTeacher: false
	}
  }
  componentWillMount() {
	let authcookie = cookies.load('act');
	let usercookie = cookies.load('user_id');
	let typeCookie = cookies.load('type');
	console.log(typeCookie);
	if(authcookie && usercookie) {
		this.setState({isAuthenticated : true});
	} else {
		this.setState({isAuthenticated : false});
	}
	if (typeCookie === 's') {
		this.setState({isStudent: true, isTeacher: false});
	} else if (typeCookie === 't') {
		this.setState({isTeacher: true, isStudent: false});
	}
  }
  componentDidMount() {
	console.log("bisStudent:" + this.state.isStudent);
	console.log("bisTeacher:" + this.state.isTeacher);
  }
  setUserType(user) {
	  if(user === 'student') {
		this.setState({isStudent: true, isTeacher: false});
	  } else {
		this.setState({isTeacher: true, isStudent: false});
	  }
  }
  authenticateToggle() {
	this.state.isAuthenticated ? this.setState({ isAuthenticated: false }) : this.setState({ isAuthenticated: true })
  }
  render() {
    return (
      <div className="App">
        <div>
          <Route path='/' render={({location}) => (
            this.state.isAuthenticated ? (
                <Main authenticateToggle={this.authenticateToggle.bind(this)} user={this.state} location={location}/>
            ) : (
                <LoginSignup authenticateToggle={this.authenticateToggle.bind(this)} setUserType={this.setUserType.bind(this)}/>
            )
          )}/>
          {/* {this.state.isAuthenticated === true ? <Main /> : <LoginSignup isAuthenticated={this.state.isAuthenticated}/> } */}
        </div>
      </div>
    );
  }
}

export default App;
