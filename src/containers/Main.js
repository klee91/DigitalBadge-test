import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';
import Dashboard from '../components/Accessories/Dashboard';
import Profile from '../components/Pages/Profile';
import BadgePage from './BadgePage';
import Home from '../components/Pages/Home';
import Students from "../components/Pages/Students";
// import Student from '../components/Items/Student';
import Teachers from "../components/Pages/Teachers";
import cookies from 'react-cookie';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
// import cookies from 'react-cookies';
// import helpers from '../utils/helpers.js'
// import logo from '../assets/img/db-logo-prototype.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux'; 
import { fetchUser } from '../actions/index';

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
	// console.log(this.props.user);
	let typeCookie = cookies.load('type');

	//-----------------------------------------------------------------------------------------------------------------------
	//this needs fixing. make sure isStudent/isTeacher is being set in the App.js so it is passed properly to this component
	//-----------------------------------------------------------------------------------------------------------------------
	if(this.props.user.isStudent) {
		this.setState({isStudent: true, isTeacher: false});
	} else if(this.props.user.isTeacher){
		this.setState({isTeacher: true, isStudent: false});
	}

	if (typeCookie === 's') {
		this.setState({isStudent: true, isTeacher: false});
	} else if (typeCookie === 't') {
		this.setState({isTeacher: true, isStudent: false});
	}
	
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
						{/* <Route path="/home/students/:studentid" component={Student} /> */}
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

// function mapStateToProps(state) {
// 	return {
// 		user: state.user
// 	};
// }

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({fetchUser: fetchUser},dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Main);