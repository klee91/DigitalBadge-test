import React, { Component } from 'react';
import logo from './assets/img/digibadge.jpg';
import LoginSignup from './components/Login-Signup.js';
import cookies from 'react-cookie';
import Main from './components/Main.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      isStudent: false,
      isTeacher: false,
    }
  }
  componentWillMount() {
    if(cookies !== undefined) {
        let authcookie = cookies.load('act');
        console.log(authcookie);
        this.setState({isAuthenticated : true});
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eisenhower Middle School - Digital Badge</h1>
        </header>
        <div>
          <h1>Welcome to the Eisenhower Middle School</h1> 
          { this.state.isAuthenticated === true ? <Main /> : <LoginSignup /> }
        </div>
      </div>
    );
  }
}

export default App;
