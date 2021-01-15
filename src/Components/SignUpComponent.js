import React from 'react'
import {connect} from 'react-redux'
import {logOutUser} from '../Redux/actions'
import {Redirect, withRouter} from 'react-router-dom'

class SignUpComponent extends React.Component {
	state = {
		email: "",
		password: ""
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()
		this.postUser(this.state)
	}

	BASE_URL = "http://localhost:4000"

	postUser = (userObj) => {
		fetch(`${this.BASE_URL}/api/v1/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		})
			.then(r => r.json())
			.then(userObj => {
				if (userObj.id) {
					alert("Account created successfully! Please log in.")
					this.props.history.push('/login')
				} else if (userObj.exception) {
					if (userObj.exception.includes("Email has already been taken")) {
						alert("Email has already been taken.")
					} else if(userObj.exception.includes("Email can't be blank")) {
						alert("Email can't be blank")
					} else if (userObj.exception.includes("Password can't be blank")) {
						alert("Password can't be blank.")
					}
				}
			})
	}

	render() {
		return (
			<div>
				{this.props.user ? <Redirect to="/quizzes" /> : null }
				<h3>Sign Up</h3>
				<form onSubmit={this.submitHandler}>
					<input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} /><br />
					<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br />
					<button type="submit">Sign Up</button>
				</form>
			</div>
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
		logOutUser: () => dispatch(logOutUser())
	}
}

export default connect(msp, mdp) (withRouter(SignUpComponent))