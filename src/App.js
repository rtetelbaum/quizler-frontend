import './App.css'
import 'primereact/resources/themes/arya-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import PrimeReact from 'primereact/api'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from './Redux/actions'
import NavComponent from './Components/NavComponent'
import FooterComponent from './Components/FooterComponent'
import HomeComponent from './Components/HomeComponent'
import SignUpComponent from './Components/SignUpComponent'
import LogInComponent from './Components/LogInComponent'
import QuizContainer from './Containers/QuizContainer'
import CreateQuizComponent from './Components/CreateQuizComponent'
import QuizComponent from './Components/QuizComponent'
import NotFoundComponent from './Components/NotFoundComponent'

class App extends React.Component {

	componentDidMount() {
		const userID = localStorage.getItem("userID")
		if (userID) { this.props.getUser(userID) }
	}

	render() {
		PrimeReact.ripple = true
		return (
			<div id="app">

				<NavComponent />

				<div id="main-div">
					<Switch>
						<Route exact path="/home" component={HomeComponent} />
						<Route exact path="/signup" component={SignUpComponent} />
						<Route exact path="/login" component={LogInComponent} />
						<Route exact path="/quizzes/create" component={CreateQuizComponent} />
						<Route exact path="/quizzes/:id" component={QuizComponent} />
						<Route exact path="/quizzes" component={QuizContainer} />
						<Route exact path="/404" component={NotFoundComponent} />
						<Route exact path="/"><Redirect to="/home" /></Route>
						<Route path="*" component={NotFoundComponent} />
					</Switch>
				</div>

				<FooterComponent />

			</div>
		)
	}
}

function mdp(dispatch) {
	return {
		getUser: userID => dispatch(getUser(userID))
	}
}

export default connect(null, mdp)(App)
