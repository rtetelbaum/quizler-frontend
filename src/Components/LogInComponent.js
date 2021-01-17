import React from 'react'
import { connect } from 'react-redux'
import { getUsers, setUser } from '../Redux/actions'
import { Redirect } from 'react-router-dom'

class LogInComponent extends React.Component {
	state = {
		email: "",
		password: ""
	}

	componentDidMount() {
		if (!this.props.user) { this.props.getUsers() }
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()

		if (Object.keys(this.props.users).length > 0) {
			this.findUser()
		} else {
			alert("Something went wrong, please try again.")
		}

		this.setState({
			email: "",
			password: ""
		})
	}

	findUser = () => {
		const foundUser = this.props.users.find(user => user.email === this.state.email)

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
				this.props.user.id
					?
					<Redirect to="/quizzes" />
					:
					<h3>Loading...</h3>
				:
				this.props.users
					?
					Object.keys(this.props.users).length > 0
						?
						<div>
							<h3>Log In</h3>

							<form onSubmit={this.submitHandler}>
								<input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} required /><br />
								<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} required /><br />
								<button type="submit">Log In</button>
							</form>

						</div>
						:
						<h3>Loading...</h3>
					:
					<h3>Loading...</h3>
		)
	}
}

function msp(state) {
	return {
		user: state.user,
		users: state.users
	}
}

function mdp(dispatch) {
	return {
		getUsers: () => dispatch(getUsers()),
		setUser: userObj => dispatch(setUser(userObj))
	}
}

export default connect(msp, mdp)(LogInComponent)