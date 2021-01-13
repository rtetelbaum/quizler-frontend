import React from 'react'
import { connect } from 'react-redux'

function CreateQuizComponent(props) {
	return (
		props.user ? props.user.id ?
			<div>
				<h3>Create Quiz Component</h3>
			</div>
			:
			<div>
				<h3>Please log in.</h3>
			</div>
			:
			<div>
				<h3>Please log in.</h3>
			</div>
	)
}

function msp(state) {
	return {
		user: state.user
	}
}

export default connect(msp)(CreateQuizComponent)