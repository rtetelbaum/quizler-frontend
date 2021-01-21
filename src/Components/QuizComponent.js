import React from 'react'
import { connect } from 'react-redux'
import { getQuiz } from '../Redux/actions'
import QuestionComponent from './QuestionComponent'
import EmailQuizComponent from './EmailQuizComponent'
import TakerEmailComponent from './TakerEmailComponent'
import CreateQuestionComponent from './CreateQuestionComponent'
import emailjs from 'emailjs-com'
import { withRouter } from 'react-router-dom'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'

class QuizComponent extends React.Component {

	state = {}

	componentDidMount() {
		this.props.getQuiz(this.props.match.params.id)
	}

	arrayOfQuestions() {
		const questionsArray = this.props.quiz.questions
		const sortedQuestionsArray = questionsArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedQuestionsArray.map(question => <QuestionComponent key={question.id} question={question} changeHandler={this.changeHandler} quizState={this.state} />)
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	validateEmail = (takerEmail) => {
		const mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

		if (takerEmail === null) {
			alert("Email cannot be blank.")
		} else if (takerEmail.match(mailformat)) {
			this.emailQuizResults()
		} else {
			alert("You have entered an invalid email address.")
		}
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
				<b>Correct Answer:</b> ${Object.values(arrayOfCorrectQA[i])[0]}</li><br>`
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
				<div className="div-aligned">
					<h1 className="p-component"><b><u>Quiz by Quizmaker</u>:</b> {this.props.quiz.quizmaker}</h1>
					<h3 className="p-component"><b><u>Title</u>:</b> {this.props.quiz.title}</h3>
					<h3 className="p-component"><b><u>Subject</u>:</b> {this.props.quiz.subject}</h3>
					{this.props.user ? <EmailQuizComponent senderEmail={this.props.user.email} url={this.props.match.url} /> : null}
					{this.props.user ? <CreateQuestionComponent /> : null}
					<div className="div-aligned-ol">
						<ol>
							{this.arrayOfQuestions()}
						</ol>
					</div>
					{!this.props.user ? <TakerEmailComponent /> : null}
					{
						!this.props.user
							?
							<Button className="p-button-raised p-button-rounded button-margin-bottom" type="button" label="Submit & Email to Quizmaker" onClick={() => this.validateEmail(this.props.takerEmail)} />
							:
							null
					}
				</div>
				:
				<div className="div-aligned">
					<ProgressSpinner />
					<h3 className="p-component">Loading quiz...</h3>
				</div>
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