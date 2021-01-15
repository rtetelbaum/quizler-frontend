import React from 'react'
import {connect} from 'react-redux'
import {setUser} from '../Redux/actions'
import {Redirect} from 'react-router-dom'

class LogInComponent extends React.Component {
	state = {
		email: "",
		password: ""
	}

	BASE_URL = "http://localhost:4000"

	allUsers = []

	componentDidMount() {
		if (!this.props.user) {
			fetch(`${this.BASE_URL}/api/v1/users`)
				.then(r => r.json())
				.then(users => {
					this.allUsers = users
				})
		}
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()
		if (this.allUsers) {
			this.findUser()
		} else {
			alert("Something went wrong, please try again.")
		}
	}

	findUser = () => {
		const foundUser = this.allUsers.find(user => user.email === this.state.email)
		if (!foundUser) {
			alert("Email and/or password incorrect. Please try again.")
		} else if (foundUser.password === this.state.password) {
			localStorage.setItem('userID', foundUser.id)
			this.props.setUser(foundUser)
		} else {
			alert("Email and/or password incorrect. Please try again.")
		}
	}

	render() {
		return (
			this.props.user
			?
			<Redirect to="/quizzes" />
			:
				this.allUsers
				?
				<div>
					<h3>Log In</h3>
					<form onSubmit={this.submitHandler}>
						<input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} /><br />
						<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br />
						<button type="submit">Log In</button>
					</form>
				</div>
				:
				<h3>Loading...</h3>
		)
	}
}

function msp(state) {
	return {
		user: state.user
	}
}

function mdp(dispatch) {
	return {
		setUser: userObj => dispatch(setUser(userObj))
	}
}

export default connect(msp, mdp) (LogInComponent)