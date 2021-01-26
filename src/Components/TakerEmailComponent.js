import React from 'react'
import { connect } from 'react-redux'
import { setQuizTaker } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class TakerEmailComponent extends React.Component {

	state = {
		name: "",
		email: ""
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => this.props.setQuizTaker(this.state))
	}

	render() {
		return (
			<form className="form-aligned" onSubmit={(e) => this.props.submitHandler(e, this.props.quizTaker)}>

				<span className="p-input-icon-left p-float-label input-span-sole">
					<i className="pi pi-user-edit" />
					<InputText className="input-width" type="text" name="name" value={this.state.name} onChange={this.changeHandler} required />
					<label htmlFor="Quiztaker Name">Your Full Name</label>
				</span><br />

				<span className="p-input-icon-left p-float-label input-span-last">
					<i className="pi pi-envelope" />
					<InputText className="input-width" type="email" name="email" value={this.state.email} onChange={this.changeHandler} required />
					<label htmlFor="Quiztaker Email">Your Email</label>
				</span><br />

				<span>
					<Button className="p-button-raised p-button-rounded button-margin-bottom" type="submit" label="Submit & Email to Quizmaker" />
				</span>

			</form>
		)
	}
}

function msp(state) {
	return {
		quizTaker: state.quizTaker
	}
}

function mdp(dispatch) {
	return {
		setQuizTaker: (quizTaker) => dispatch(setQuizTaker(quizTaker))
	}
}

export default connect(msp, mdp)(TakerEmailComponent)