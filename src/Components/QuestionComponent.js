import React from 'react'
import AnswerComponent from './AnswerComponent'
import EditQuestionComponent from './EditQuestionComponent'
import CreateAnswerComponent from './CreateAnswerComponent'
import { deleteQuizQuestion, setEditQClicked, setEditQID } from '../Redux/actions'
import { connect } from 'react-redux'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'

class QuestionComponent extends React.Component {

	arrayOfAnswers() {
		const thisQuestion = this.props.question
		const answersArray = thisQuestion.answers
		const sortedAnswers = answersArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedAnswers.map(answer => <AnswerComponent key={answer.id} answer={answer} question={thisQuestion} changeHandler={this.props.changeHandler} quizState={this.props.quizState} />)
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
				<div className="question-div fade-in-2">
					<li className="li-margin-bottom">
						<b>{this.props.question.question}</b>
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
								<div className="row-margin-no-left-bottom">
									<span>
										<Button className="p-button-raised p-button-rounded" type="button" label="Edit Question" icon="pi pi-pencil" onClick={() => this.editQHandler()} />
										<span className="button-margin-left">
											<Button className="p-button-raised p-button-rounded p-button-secondary" type="button" label="Delete Question" icon="pi pi-trash" onClick={() => this.deleteQuestionHandler(this.props.question.id)} />
										</span>
									</span>
								</div>
								<br />
								<CreateAnswerComponent question={this.props.question} />
							</div>
							:
							null
						}
						{this.arrayOfAnswers()}
						<br />
					</li>
				</div>
				:
				<div className="div-aligned">
					<ProgressSpinner />
					<h3 className="p-component">Loading questions...</h3>
				</div>
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