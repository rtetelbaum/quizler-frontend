import React from 'react'
import AnswerComponent from './AnswerComponent'
import EditQuestionComponent from './EditQuestionComponent'
import { deleteQuizQuestion, setEditQClicked, setEditQID } from '../Redux/actions'
import { connect } from 'react-redux'

class QuestionComponent extends React.Component {

	arrayOfAnswers() {
		const thisQuestion = this.props.question
		const answersArray = thisQuestion.answers
		const sortedAnswers = answersArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedAnswers.map(answer => <AnswerComponent key={answer.id} answer={answer} question={thisQuestion} changeHandler={this.props.changeHandler} />)
	}

	deleteQuestionHandler = (questionID) => {
		if (window.confirm("Are you sure you want to delete this question?")) { this.props.deleteQuestion(questionID) }
	}

	editQHandler = () => {
		if (!this.props.editQClicked) {
			this.props.setEditQClicked(true)
		}
		this.props.setEditQID(this.props.question.id)
	}

	render() {
		return (
			this.props.question
				?
				<li>
					{this.props.question.question}
					{this.props.user
						?
						<div>
							{this.props.editQID
								?
								this.props.editQClicked && this.props.editQID === this.props.question.id
									?
									<div><EditQuestionComponent questionObj={this.props.question} /><br /></div>
									:
									null
								:
								null
							}
							<button type="button" onClick={() => this.editQHandler()}>Edit Question</button>
							<button type="button" onClick={() => this.deleteQuestionHandler(this.props.question.id)}>Delete Question</button>
						</div>
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
		user: state.user,
		editQClicked: state.editQClicked,
		editQID: state.editQID
	}
}

function mdp(dispatch) {
	return {
		deleteQuestion: (questionID) => dispatch(deleteQuizQuestion(questionID)),
		setEditQClicked: (isClicked) => dispatch(setEditQClicked(isClicked)),
		setEditQID: (questionID) => dispatch(setEditQID(questionID))
	}
}

export default connect(msp, mdp)(QuestionComponent)