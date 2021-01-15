import React from 'react'
import { connect } from 'react-redux'

class CreateQuizComponent extends React.Component {

	state = {
		quizmaker: this.props.user.email,
		title: "",
		subject: "",
		user_id: this.props.user.id
	}

	render() {
		return (
			this.props.user ? this.props.user.id ?
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
}

function msp(state) {
	return {
		user: state.user
	}
}

export default connect(msp)(CreateQuizComponent)