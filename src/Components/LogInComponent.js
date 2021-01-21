import React from 'react'
import { connect } from 'react-redux'
import { getUsers, setUser } from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'

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
					<div className="div-aligned">
						<ProgressSpinner />
						<h2 className="p-component">Loading Log In...</h2>
					</div>
				:
				this.props.users
					?
					Object.keys(this.props.users).length > 0
						?
						<div className="div-aligned fade-in-2">

							<h2 className="p-component">Log In</h2>

							<form className="form-aligned" onSubmit={this.submitHandler}>
								<span className="p-input-icon-left p-float-label user-form-span-first">
									<i className="pi pi-envelope" />
									<InputText type="email" name="email" value={this.state.email} onChange={this.changeHandler} required />
									<label htmlFor="email">Email</label>
								</span>
								<br />
								<span className="p-input-icon-left p-float-label user-form-span-last">
									<i className="pi pi-eye-slash" />
									<InputText type="password" name="password" value={this.state.password} onChange={this.changeHandler} required />
									<label htmlFor="password">Password</label>
								</span>
								<br />
								<Button className="p-button-raised p-button-rounded user-button" type="submit" label="Log In" icon="pi pi-sign-in" />
							</form>

						</div>
						:
						<div className="div-aligned">
							<ProgressSpinner />
							<h2 className="p-component">Loading Log In...</h2>
						</div>
					:
					<div className="div-aligned">
						<ProgressSpinner />
						<h2 className="p-component">Loading Log In...</h2>
					</div>
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