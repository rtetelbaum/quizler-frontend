import React from 'react'
import {connect} from 'react-redux'
import {getUsers, setUser} from '../Redux/actions'
import {Redirect} from 'react-router-dom'

class LogInComponent extends React.Component {
	state = {
		email: "",
		password: ""
	}

	componentDidMount() {
		this.props.getUsers()
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()
		if (this.props.users) {
			this.findUser()
		} else {
			alert("Something went wrong, please try again.")
		}
	}

	findUser = () => {
		const foundUser = this.props.users.find(user => user.email === this.state.email)
		if (!foundUser) {
			alert("Email and/or password incorrect. Please try again.")
		} else if (foundUser.password === this.state.password) {
			this.props.setUser(foundUser)
		} else {
			alert("Email and/or password incorrect. Please try again.")
		}
	}

	render() {
		return (
			<div>
				<h3>Log In</h3>
				<form onSubmit={e => this.submitHandler(e)}>
					<input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} /><br />
					<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /><br />
					<button type="submit">Log In</button>
				</form>
				{this.props.user ? this.props.user.id ? <Redirect to="/quizzes" /> : null : null }
			</div>
		)
	}
}

function msp(state) {
	return {
		users: state.users,
		user: state.user
	}
}

function mdp(dispatch) {
	return {
		getUsers: () => dispatch(getUsers()),
		setUser: userObj => dispatch(setUser(userObj))
	}
}

export default connect(msp, mdp) (LogInComponent)