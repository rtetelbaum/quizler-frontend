import React from 'react'
import { connect } from 'react-redux'
import { patchQuizQuestion, setEditQClicked } from '../Redux/actions'

class EditQuestionComponent extends React.Component {

	state = {
		question: ""
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = (e) => {
		e.preventDefault()
		
		const questionObj = {
			question: this.state.question,
			quiz_id: this.props.questionObj.quiz_id
		}

		this.props.patchQuestion(questionObj, this.props.questionObj.id)

		this.props.setEditQClicked(false)
	}

	render() {
		return (
			<form onSubmit={this.submitHandler}>
				<input type="text" name="question" placeholder={this.props.questionObj.question} value={this.state.question} onChange={this.changeHandler} required />
				<button type="button">Submit Edit</button>
			</form>
		)
	}
}

function mdp(dispatch) {
	return {
		patchQuestion: (questionObj, questionID) => dispatch(patchQuizQuestion(questionObj, questionID)),
		setEditQClicked: (isClicked) => dispatch(setEditQClicked(isClicked))
	}
}

export default connect(null, mdp)(EditQuestionComponent)