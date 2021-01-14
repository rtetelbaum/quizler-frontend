import React from 'react'
import {connect} from 'react-redux'
import {getQuiz} from '../Redux/actions'
import QuestionComponent from './QuestionComponent'
import EmailQuizComponent from './EmailQuizComponent'

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
		const numQuestions = this.props.quiz.questions.length
		const quizQA = this.props.allQuestions.filter(q => q.quiz_id === this.props.quiz.id)
		const sortedQuizQA = quizQA.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		const arrayOfCorrectQA = sortedQuizQA.map(qa => {
			let rObj = {}
			rObj[qa.question] = qa.answers.filter(a => a.correct)[0].answer
			return rObj
		})
		const userQA = Object.entries(this.state)
		const arrayOfUserQA = userQA.map(qa => {
			let rObj = {}
			rObj[qa[0]] = qa[1]
			return rObj
		})
		let numCorrectAnswers = 0
		for (let i = 0,  l = numQuestions; i < l; i++) {
			if (JSON.stringify(arrayOfCorrectQA[i]) === JSON.stringify(arrayOfUserQA[i])) {
				numCorrectAnswers++
			}
		}
		const score = "Your score: " + ((numCorrectAnswers / numQuestions) * 100).toString() + "%"

		// console.log("arrayOfCorrectQA", arrayOfCorrectQA)
		// console.log("arrayOfUserQA", arrayOfUserQA)
		// console.log("number of correct answers: ", numCorrectAnswers)
		// console.log(score)
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
					{!this.props.user ? <button type="submit">Submit & Email to Quizmaker</button> : null}
				</form>
				{this.props.user ? <EmailQuizComponent senderEmail={this.props.user.email} url={this.props.match.url} /> : null}
			</div>
			:
			<h3>Loading quiz...</h3>
		)
	}
}

function msp(state) {
	return {
		user: state.user,
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