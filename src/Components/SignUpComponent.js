import React from 'react'
import { connect } from 'react-redux'
import { postUser, logOutUser } from '../Redux/actions'
import { Redirect, withRouter } from 'react-router-dom'

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
	}

	render() {
		return (
			<div>
				{this.props.user ? this.props.user.id ? <Redirect to="/quizzes" /> : null : null}
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

function mdp(dispatch, ownProps) {
	return {
		postUser: (userObj) => dispatch(postUser(userObj, ownProps)),
		logOutUser: () => dispatch(logOutUser())
	}
}

export default connect(msp, mdp) (withRouter(SignUpComponent))