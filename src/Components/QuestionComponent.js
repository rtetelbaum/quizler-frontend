import React from 'react'
import AnswerComponent from './AnswerComponent'
import { deleteQuizQuestion } from '../Redux/actions'
import { connect } from 'react-redux'

class QuestionComponent extends React.Component {

	arrayOfAnswers() {
		const thisQuestion = this.props.question
		const answersArray = thisQuestion.answers
		const sortedAnswers = answersArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedAnswers.map(answer => <AnswerComponent key={answer.id} answer={answer} question={thisQuestion} changeHandler={this.props.changeHandler} />)
	}

	deleteQuestionHandler = (questionID) => {
		if (window.confirm("Are you sure you want to delete this question?")) {this.props.deleteQuestion(questionID)}
	}

	render() {
		return (
			this.props.question
			?
			<li>
				{this.props.question.question}
				{this.props.user
				?
				<button type="button" onClick={() => this.deleteQuestionHandler(this.props.question.id)}>Delete Question</button>
				:
				null
				}
				{this.arrayOfAnswers()}
				<br />
			</li>
			:
			<h3>Loading questions...</h3>
		)
	}
}

function msp(state) {
	return {
		user: state.user
	}
}

function mdp(dispatch) {
	return {
		deleteQuestion: (questionID) => dispatch(deleteQuizQuestion(questionID))
	}
}

export default connect(msp, mdp) (QuestionComponent)