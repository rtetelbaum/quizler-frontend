import React from 'react'
import { connect } from 'react-redux'
import { setTakerEmail } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'

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
			<div>
				<span className="p-input-icon-left p-float-label input-span-sole">
					<i className="pi pi-envelope" />
					<InputText type="email" name="email" value={this.state.email} onChange={this.changeHandler} />
					<label htmlFor="Quiztaker Email">Your Email</label>
				</span>
			</div>
		)
	}
}

function mdp(dispatch) {
	return {
		setTakerEmail: (takerEmail) => dispatch(setTakerEmail(takerEmail))
	}
}

export default connect(null, mdp)(TakerEmailComponent)