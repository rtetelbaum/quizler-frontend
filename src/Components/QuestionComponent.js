import React from 'react'
import AnswerComponent from './AnswerComponent'

class QuestionComponent extends React.Component {

	arrayOfAnswers() {
		const thisQuestion = this.props.question
		const answersArray = thisQuestion.answers
		const sortedAnswers = answersArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedAnswers.map(answer => <AnswerComponent key={answer.id} answer={answer} question={thisQuestion} changeHandler={this.props.changeHandler} />)
	}

	render() {
		return (
			this.props.question
			?
			<li>
				{this.props.question.question}
				{this.arrayOfAnswers()}
				<br />
			</li>
			:
			<h3>Loading questions...</h3>
		)
	}
}

export default QuestionComponent