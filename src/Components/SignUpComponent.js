import React from 'react'
import {connect} from 'react-redux'
import {postUser} from '../Redux/actions'
import {Redirect} from 'react-router-dom'

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
		this.props.postUser(this.state)
		this.alertUser()
	}

	alertUser = () => {
		if (this.props.user) {
			if (this.props.user.id) {
				alert("Account created successfully! You are logged in.")
			} else if (this.props.user.exception) {
				if (this.props.user.exception.includes("Email has already been taken")) {
					alert("Email has already been taken.")
				} else if(this.props.user.exception.includes("Email can't be blank")) {
					alert("Email can't be blank")
				} else if (this.props.user.exception.includes("Password can't be blank")) {
					alert("Password can't be blank.")
				}
			}
		} else {
			alert("Something went wrong (async), please try again.")
		}
	}

	render() {
		return (
			<div>
				<h3>Sign Up</h3>
				<form onSubmit={e => this.submitHandler(e)}>
					<input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} /><br />
					<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br />
					<button type="submit">Sign Up</button>
				</form>
				{this.props.user ? this.props.user.id ? <Redirect to="/quizzes/create" /> : null : null }
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
		postUser: userObj => dispatch(postUser(userObj))
	}
}

export default connect(msp, mdp)(SignUpComponent)