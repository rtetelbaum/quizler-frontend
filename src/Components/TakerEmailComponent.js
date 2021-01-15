import React from 'react'
import {connect} from 'react-redux'
import {setTakerEmail} from '../Redux/actions'

class TakerEmailComponent extends React.Component {

	state = {
		email: ""
	}

	changeHandler = (e) => {
		this.setState({[e.target.name]: e.target.value})
		this.props.setTakerEmail(e.target.value)
	}

	render() {
		return (
			<div>
				<p>What is your email?</p>
				<input type="email" name="email" value={this.state.email} onChange={this.changeHandler} required />
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