import React, { Component } from 'react';
import logo from './assets/img/digibadge.jpg';
import LoginSignup from './components/Login-Signup.js';
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eisenhower Middle School - Digital Badge</h1>
        </header>
        <div>
          <h1>Welcome to the Eisenhower Digital Badge Application</h1> 
          <LoginSignup user={this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
