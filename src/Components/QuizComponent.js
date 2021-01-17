import React from 'react'
import { connect } from 'react-redux'
import { getQuiz } from '../Redux/actions'
import QuestionComponent from './QuestionComponent'
import EmailQuizComponent from './EmailQuizComponent'
import TakerEmailComponent from './TakerEmailComponent'
import CreateQuestionComponent from './CreateQuestionComponent'
import emailjs from 'emailjs-com'
import { withRouter } from 'react-router-dom'

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
		this.setState({ [e.target.name]: e.target.value })
	}

	emailQuizResults = () => {
		const numQuestions = this.props.quiz.questions.length
		
		const quizQA = this.props.quiz.questions
		
		const sortedQuizQA = quizQA.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		
		const arrayOfCorrectQA = sortedQuizQA.map(qa => {
			let rObj = {}
			if (qa.answers.length > 1) {
				rObj[qa.question] = qa.answers.filter(a => a.correct)[0].answer
			}
			return rObj
		})
		
		const userQA = Object.entries(this.state)
		
		const arrayOfUserQA = userQA.map(qa => {
			let rObj = {}
			rObj[qa[0]] = qa[1]
			return rObj
		})

		let numCorrectAnswers = 0
		for (let i = 0, l = numQuestions; i < l; i++) {
			if (JSON.stringify(arrayOfCorrectQA[i]) === JSON.stringify(arrayOfUserQA[i])) {
				numCorrectAnswers++
			}
		}

		const score = Math.round((numCorrectAnswers / numQuestions) * 100).toString() + "%"

		const quizAnswers = []

		for (let i = 0, l = arrayOfUserQA.length; i < l; i++) {
			quizAnswers.push(`<li><b>Question:</b> ${Object.keys(arrayOfUserQA[i])[0]}<br>
				<b>Quiztaker Answer:</b> ${Object.values(arrayOfUserQA[i])[0]}<br>
				<b>Correct Answer:</b> ${Object.values(arrayOfCorrectQA[i])[0]}</li>`
			)
		}

		const templateParams = {
			senderEmail: this.props.takerEmail,
			recipientEmail: this.props.quiz.quizmaker,
			title: this.props.quiz.title,
			score: score,
			quiz: quizAnswers.join('')
		}

		let quizmaker
		if (this.props.quiz) { quizmaker = this.props.quiz.quizmaker }

		const pushHome = () => { this.props.history.push('/home') }

		emailjs.send('service_fcfonus', 'template_ej9tm39', templateParams, process.env.REACT_APP_EMAILJS_USERID)
			.then(function (response) {
				console.log('SUCCESS!', response.status, response.text)
				alert(`Quiz results successfully sent to ${quizmaker}.`)
				pushHome()
			}, function (error) {
				console.log('FAILED...', error)
				alert('Oops... something went wrong. Please try again.')
			})

	}

	render() {
		return (
			this.props.quiz
				?
				<div>
					<h1>Quiz by Quizmaker: {this.props.quiz.quizmaker}</h1>
					<h3>Title: {this.props.quiz.title}</h3>
					<p>Subject: {this.props.quiz.subject}</p>
					{!this.props.user ? <TakerEmailComponent /> : null}
					{this.props.user ? <EmailQuizComponent senderEmail={this.props.user.email} url={this.props.match.url} /> : null}
					{this.props.user ? <CreateQuestionComponent /> : null}
					<ol>
						{this.arrayOfQuestions()}
					</ol>
					{!this.props.user ? <button type="button" onClick={() => this.emailQuizResults()}>Submit & Email to Quizmaker</button> : null}
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
		takerEmail: state.takerEmail
	}
}

function mdp(dispatch) {
	return {
		getQuiz: (quizId) => dispatch(getQuiz(quizId))
	}
}

export default connect(msp, mdp)(withRouter(QuizComponent))