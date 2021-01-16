import React from 'react'
import { connect } from 'react-redux'
import { patchQuizQuestion } from '../Redux/actions'

class EditQuestionComponent extends React.Component {

	state = {
		question: ""
	}

	changeHandler = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	editQuestionHandler = () => {
		const questionObj = {
			question: this.state.question,
			quiz_id: this.props.questionObj.quiz_id
		}
		this.props.patchQuestion(questionObj, this.props.questionObj.id)
	}

	render() {
		return (
			<div>
				<input type="text" name="question" placeholder={this.props.questionObj.question} value={this.state.question} onChange={this.changeHandler} required />
				<button type="button" onClick={() => this.editQuestionHandler()}>Submit Edit</button>
			</div>
		)
	}
}

function mdp(dispatch) {
	return {
		patchQuestion: (questionObj, questionID) => dispatch(patchQuizQuestion(questionObj, questionID))
	}
}

export default connect(null, mdp) (EditQuestionComponent)