import React from 'react'
import {connect} from 'react-redux'
import {getQuiz} from '../Redux/actions'
import QuestionComponent from './QuestionComponent'

class QuizComponent extends React.Component {

	componentDidMount() {
		this.props.getQuiz(18)
	}

	arrayOfQuestions() {
		const questionsArray = this.props.quiz.questions
		const sortedQuestionsArray = questionsArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedQuestionsArray.map(question => <QuestionComponent key={question.id} question={question} />)
	}

	render() {
		return (
			this.props.quiz
			?
			<div>
				<h1>Quiz by Quizmaker {this.props.quiz.quizmaker}</h1>
				<h3>Title: {this.props.quiz.title}</h3>
				<p>Subject: {this.props.quiz.subject}</p>
				<form>
					<ol>
						{this.arrayOfQuestions()}
					</ol>
				</form>
			</div>
			:
			<h3>Loading quiz...</h3>
		)
	}
}

function msp(state) {
	return {
		quiz: state.quiz
	}
}

function mdp(dispatch) {
	return {
		getQuiz: (quizId) => dispatch(getQuiz(quizId))
	}
}

export default connect(msp, mdp)(QuizComponent)