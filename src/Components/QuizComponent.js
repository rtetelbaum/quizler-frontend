import React from 'react'
import {connect} from 'react-redux'
import {getQuiz} from '../Redux/actions'
import QuestionComponent from './QuestionComponent'

class QuizComponent extends React.Component {

	state = {}

	componentDidMount() {
		this.props.getQuiz(this.props.match.params.id)
	}

	arrayOfQuestions() {
		const questionsArray = this.props.quiz.questions
		const sortedQuestionsArray = questionsArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedQuestionsArray.map(question => <QuestionComponent key={question.id} question={question} changeHandler={this.changeHandler} />)
	}

	changeHandler = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	submitHandler = (e) => {
		e.preventDefault()
		// const numberOfQuestions = this.props.quiz.questions.length
		const thisQuizQA = this.props.allQuestions.filter(q => q.quiz_id === this.props.quiz.id)
		const arrayOfCorrectQA = thisQuizQA.map(qa => {
			let rObj = {}
			rObj[qa.question] = qa.answers.filter(a => a.correct)[0].answer
			return rObj
		})
		const arrayOfUserQA = Object.entries(this.state)
		console.log("thisQuizQA", thisQuizQA)
		console.log("arrayOfCorrectQA", arrayOfCorrectQA)
		console.log("arrayOfUserQA", arrayOfUserQA)
	}

	render() {
		return (
			this.props.quiz
			?
			<div>
				<h1>Quiz by Quizmaker {this.props.quiz.quizmaker}</h1>
				<h3>Title: {this.props.quiz.title}</h3>
				<p>Subject: {this.props.quiz.subject}</p>
				<form onSubmit={e => this.submitHandler(e)}>
					<ol>
						{this.arrayOfQuestions()}
					</ol>
					<button type="submit">Submit & Email to Quizmaker</button>
				</form>
			</div>
			:
			<h3>Loading quiz...</h3>
		)
	}
}

function msp(state) {
	return {
		quiz: state.quiz,
		allQuestions: state.questions
	}
}

function mdp(dispatch) {
	return {
		getQuiz: (quizId) => dispatch(getQuiz(quizId))
	}
}

export default connect(msp, mdp)(QuizComponent)