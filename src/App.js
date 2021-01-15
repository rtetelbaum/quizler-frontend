import './App.css'
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './Redux/actions'
import NavComponent from './Components/NavComponent'
import FooterComponent from './Components/FooterComponent'
import HomeComponent from './Components/HomeComponent'
import SignUpComponent from './Components/SignUpComponent'
import LogInComponent from './Components/LogInComponent'
import QuizContainer from './Containers/QuizContainer'
import CreateQuizComponent from './Components/CreateQuizComponent'
import QuizComponent from './Components/QuizComponent'

class App extends React.Component {

	BASE_URL = "http://localhost:4000"

	componentDidMount() {
		const userID = localStorage.getItem("userID")
		if (userID) {
			fetch(`${this.BASE_URL}/api/v1/users/${userID}`)
				.then(r => r.json())
				.then(userObj => {
					this.props.setUser(userObj)
				})
		}
	}

	render() {
		return (
			<div id="app">
	
				<NavComponent />
	
				<div id="main">
					<Switch>
						<Route path="/home" component={HomeComponent}/>
						<Route path="/signup" component={SignUpComponent} />
						<Route path="/login" component={LogInComponent} />
						<Route path="/quizzes/create" component={CreateQuizComponent}/>
						<Route exact path="/quizzes/:id" component={QuizComponent}/>
						<Route path="/quizzes" component={QuizContainer} />
						<Route path="/"><Redirect to="/home" /></Route>
					</Switch>
				</div>
	
				<FooterComponent />
	
			</div>
		)
	}
}

function mdp(dispatch) {
	return {
		setUser: userObj => dispatch(setUser(userObj))
	}
}

export default connect(null, mdp) (App)
