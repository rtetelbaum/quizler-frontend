import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import React from 'react'
import NavComponent from './Components/NavComponent'
import FooterComponent from './Components/FooterComponent'
import HomeComponent from './Components/HomeComponent'
import SignUpComponent from './Components/SignUpComponent'
import LogInComponent from './Components/LogInComponent'
import QuizContainer from './Containers/QuizContainer'
import CreateQuizComponent from './Components/CreateQuizComponent'

function App() {
  return (
    <div id="app">

			<NavComponent />

			<div id="main">
				<Switch>
					<Route path="/home" component={HomeComponent}/>
					<Route path="/signup" component={SignUpComponent} />
					<Route path="/login" component={LogInComponent} />
					<Route path="/quizzes/create" component={CreateQuizComponent}/>
					<Route path="/quizzes" component={QuizContainer} />
					<Route path="/"><Redirect to="/home" /></Route>
				</Switch>
			</div>

			<FooterComponent />

		</div>
  );
}

export default App
