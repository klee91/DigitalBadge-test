import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import BadgePage from './BadgePage';
import Home from './Home';
import Students from "./Students";
import Teachers from "./Teachers";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
// import cookies from 'react-cookies';
// import helpers from '../utils/helpers.js'
// import logo from '../assets/img/db-logo-prototype.png';
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /profile
// and /badges routes will match any pathname that starts
// with /profile or /badges. The / route will only match
// when the pathname is exactly the string "/"
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      isStudent: false,
	  isTeacher: false,
	  user: {}
    }
    this.stateLogout = this.stateLogout.bind(this);
  }
  componentWillMount() {
	console.log(this.props.user);
	if(this.props.user.isStudent) {
		this.setState({isStudent: true, isTeacher: false});
	  } else if(this.props.user.isTeacher){
		this.setState({isTeacher: true, isStudent: false});
	  }
  }
  componentDidMount() {
	  console.log(this.props.user.isAuthenticated);
  }
  stateLogout() {
    this.setState({
      isAuthenticated: false
	});
	this.props.authenticateToggle();
    console.log("User has been logged out.")
  }
  render() {
    return (
      <div>
		{/* <header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Eisenhower Middle School</h1>
		</header> */}
		<main id="main">
			<Dashboard user={this.state} stateLogout={this.stateLogout}/>
			<div id="view">
			<TransitionGroup>
				<CSSTransition key={this.props.location.key} classNames="fade" timeout={1000}>
					<Switch location={this.props.location}>
						<Route exact path='/home' component={Home}/>
						<Route path='/home/profile' component={Profile}/>
						<Route path='/home/badges' component={BadgePage}/>
						{this.state.isStudent ? <Route path='/home/students' component={Students}/> : <Route path='/home/teachers' component={Teachers}/> }
						<Route path ='/logout'/>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			</div>
		</main>
      </div>
    )
 }
}
