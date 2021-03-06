import React from 'react'
import { connect } from 'react-redux'
import { postUser, logOutUser } from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class SignUpComponent extends React.Component {

	state = {
		email: "",
		first_name: "",
		last_name: "",
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
		this.setState({
			email: "",
			first_name: "",
			last_name: "",
			password: ""
		})
	}

	render() {
		return (
			<div className="div-aligned fade-in-2">

				{this.props.user ? this.props.user.id ? <Redirect to="/quizzes" /> : null : null}

				<h2 className="p-component">Sign Up</h2>

				<form className="form-aligned" onSubmit={this.submitHandler}>
					<span className="p-input-icon-left p-float-label user-form-span">
						<i className="pi pi-envelope" />
						<InputText type="email" name="email" value={this.state.email} onChange={this.changeHandler} required />
						<label htmlFor="email">Email</label>
					</span>
					<br />

					<span className="p-input-icon-left p-float-label user-form-span">
						<i className="pi pi-user-edit" />
						<InputText type="text" name="first_name" value={this.state.first_name} onChange={this.changeHandler} required />
						<label htmlFor="First Name">First Name</label>
					</span>
					<br />

					<span className="p-input-icon-left p-float-label user-form-span">
						<i className="pi pi-user-edit" />
						<InputText type="text" name="last_name" value={this.state.last_name} onChange={this.changeHandler} required />
						<label htmlFor="Last Name">Last Name</label>
					</span>
					<br />

					<span className="p-input-icon-left p-float-label user-form-span">
						<i className="pi pi-eye-slash" />
						<InputText type="password" name="password" value={this.state.password} onChange={this.changeHandler} required />
						<label htmlFor="password">Password</label>
					</span>
					<br />
					<Button className="p-button-raised p-button-rounded user-button" type="submit" label="Sign Up" icon="pi pi-user-plus" />
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

export default connect(msp, mdp)(SignUpComponent)