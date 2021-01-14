import React from 'react'
import {connect} from 'react-redux'
import {getQuestions} from '../Redux/actions'
import AnswerComponent from './AnswerComponent'

class QuestionComponent extends React.Component {

	componentDidMount() {
		this.props.getQuestions()
	}

	arrayOfAnswers() {
		const thisQuestion = this.props.allQuestions.filter(q => q.id === this.props.question.id)
		const answersArray = thisQuestion[0].answers
		const sortedAnswers = answersArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedAnswers.map(answer => <AnswerComponent key={answer.id} answer={answer} question={this.props.question.question} />)
	}

	render() {
		return (
			this.props.allQuestions
			?
			<li>
				<p>{this.props.question.question}</p>
				{this.arrayOfAnswers()}
			</li>
			:
			<h3>Loading questions...</h3>
		)
	}
}

function msp(state) {
	return {
		allQuestions: state.questions
	}
}

function mdp(dispatch) {
	return {
		getQuestions: () => dispatch(getQuestions())
	}
}

export default connect(msp, mdp)(QuestionComponent)