import React from 'react'
import { connect } from 'react-redux'
import { setTakerEmail } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class TakerEmailComponent extends React.Component {

	state = {
		email: ""
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
		this.props.setTakerEmail(e.target.value)
	}

	render() {
		return (
			<form className="form-aligned" onSubmit={(e) => this.props.submitHandler(e, this.props.takerEmail)}>
				<span className="p-input-icon-left p-float-label input-span-sole">
					<i className="pi pi-envelope" />
					<InputText type="email" name="email" value={this.state.email} onChange={this.changeHandler} />
					<label htmlFor="Quiztaker Email">Your Email</label>
				</span><br />
				<Button className="p-button-raised p-button-rounded button-margin-bottom" type="submit" label="Submit & Email to Quizmaker" />
			</form>
		)
	}
}

function msp(state) {
	return {
		takerEmail: state.takerEmail
	}
}

function mdp(dispatch) {
	return {
		setTakerEmail: (takerEmail) => dispatch(setTakerEmail(takerEmail))
	}
}

export default connect(msp, mdp)(TakerEmailComponent)