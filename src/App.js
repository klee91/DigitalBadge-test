import React, { Component } from 'react';
import logo from './assets/img/db-logo-prototype.png';
import LoginSignup from './components/Login-Signup.js';
import cookies from 'react-cookie';
import Main from './components/Main.js';
import {Route} from 'react-router-dom';
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
    let authcookie = cookies.load('act');
    if(authcookie) {
        console.log(authcookie);
        this.setState({isAuthenticated : true});
    } else {
      this.setState({isAuthenticated : false});
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eisenhower Middle School</h1>
        </header>
        <div>
          <Route path='/' render={() => (
            this.state.isAuthenticated ? (
                <Main />
            ) : (
                <LoginSignup isAuthenticated={this.state.isAuthenticated}/>
            )
          )}/>
          {/* {this.state.isAuthenticated === true ? <Main /> : <LoginSignup isAuthenticated={this.state.isAuthenticated}/> } */}
        </div>
      </div>
    );
  }
}

export default App;
