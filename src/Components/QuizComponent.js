import React from 'react'
import { connect } from 'react-redux'
import { getQuiz, getQuizzes } from '../Redux/actions'
import QuestionComponent from './QuestionComponent'
import EmailQuizComponent from './EmailQuizComponent'
import TakerEmailComponent from './TakerEmailComponent'
import CreateQuestionComponent from './CreateQuestionComponent'
import emailjs from 'emailjs-com'
import { withRouter, Redirect } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner'
import Swal from 'sweetalert2'

class QuizComponent extends React.Component {

	state = {
		tempQuizID: null,
		redirect: false,
		userAnswers: {}
	}

	componentDidMount() {
		this.props.getQuizzes()
	}

	componentDidUpdate() {
		const quizIDS = this.props.quizzes ? this.props.quizzes.map(quiz => quiz.id) : null
		if (quizIDS && !this.state.tempQuizID) {
			if (quizIDS.includes(parseInt(this.props.match.params.id))) {
				this.props.getQuiz(this.props.match.params.id)
				this.setState({ tempQuizID: this.props.match.params.id })
			} else {
				this.setState({ redirect: true })
			}
		}
	}

	arrayOfQuestions() {
		const questionsArray = this.props.quiz.questions
		const sortedQuestionsArray = questionsArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedQuestionsArray.map(question => <QuestionComponent key={question.id} question={question} changeHandler={this.changeHandler} quizState={this.state.userAnswers} />)
	}

	changeHandler = (e) => {
		this.setState(prevState => ({ userAnswers: { ...prevState.userAnswers, [e.target.name]: e.target.value } }))
	}

	submitHandler = (e, quizTaker) => {
		e.preventDefault()
		this.validateEmail(quizTaker.email)
	}

	validateEmail = (takerEmail) => {
		const mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

		if (takerEmail === null) {
			Swal.fire("Email cannot be blank.")
		} else if (takerEmail.match(mailformat)) {
			this.emailQuizResults()
		} else {
			Swal.fire("You have entered an invalid email address.")
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

		const userQA = Object.entries(this.state.userAnswers)

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

		for (let i = 0, l = arrayOfCorrectQA.length; i < l; i++) {
			quizAnswers.push(
				`
				<li>
					<b>Question:</b><br>
					<textarea rows="3" cols="50" readonly='true'>${Object.keys(arrayOfCorrectQA[i])[0]}</textarea><br>
					<b>Quiztaker Answer:</b><br>
					<textarea rows="3" cols="50" readonly='true'>${arrayOfUserQA[i] ? Object.values(arrayOfUserQA[i])[0] : "Not Answered"}</textarea><br>
					<b>Correct Answer:</b><br>
					<textarea rows="3" cols="50"readonly='true'>${Object.values(arrayOfCorrectQA[i])[0]}</textarea>
				</li><br>
				`
			)
		}

		const templateParams = {
			takerEmail: this.props.quizTaker.email,
			takerName: this.props.quizTaker.name,
			recipientEmail: this.props.quiz.quizmaker_email,
			title: this.props.quiz.title,
			score: score,
			quiz: quizAnswers.join('')
		}

		let quizMakerName
		let quizMakerEmail
		if (this.props.quiz) { 
			quizMakerName = this.props.quiz.quizmaker_name
			quizMakerEmail = this.props.quiz.quizmaker_email
		}

		const pushHome = () => { this.props.history.push('/home') }

		emailjs.send('service_fcfonus', 'template_ej9tm39', templateParams, 'user_YURUYwTaCWnST7CBoFniH')
			.then(function (response) {
				console.log('SUCCESS!', response.status, response.text)
				Swal.fire(`Your score: ${score}. Results successfully sent to ${quizMakerName} at ${quizMakerEmail}.`)
				pushHome()
			}, function (error) {
				console.log('FAILED...', error)
				Swal.fire('Oops... something went wrong. Please try again.')
			})

	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/404" />
		} else {
			return (
				this.props.quiz
					?
					<div className="div-aligned fade-in-2">
						<h1 className="p-component"><b>Quiz by QuizMaker:</b> {this.props.quiz.quizmaker_name}</h1>
						<h3 className="p-component"><b>Title:</b> {this.props.quiz.title}</h3>
						<h3 className="p-component"><b>Subject:</b> {this.props.quiz.subject}</h3>
						{this.props.user
							?
							<EmailQuizComponent questions={this.props.quiz.questions} makerEmail={this.props.user.email} makerName={this.props.user.first_name + " " + this.props.user.last_name} url={this.props.match.url} />
							: null
						}
						{this.props.user ? <CreateQuestionComponent /> : null}
						<div className="div-aligned-ol">
							<ol>
								{this.arrayOfQuestions()}
							</ol>
						</div>
						{!this.props.user ? <TakerEmailComponent submitHandler={this.submitHandler} /> : null}
					</div>
					:
					<div className="div-aligned">
						<ProgressSpinner />
						<h3 className="p-component">Loading quiz...</h3>
					</div>
			)
		}
	}
}

function msp(state) {
	return {
		quizzes: state.quizzes,
		quiz: state.quiz,
		user: state.user,
		quizTaker: state.quizTaker
	}
}

function mdp(dispatch) {
	return {
		getQuizzes: () => dispatch(getQuizzes()),
		getQuiz: (quizId) => dispatch(getQuiz(quizId))
	}
}

export default connect(msp, mdp)(withRouter(QuizComponent))