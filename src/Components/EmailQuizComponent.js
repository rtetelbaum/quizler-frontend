import React from 'react'
import emailjs from 'emailjs-com'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class EmailQuizComponent extends React.Component {

	state = {
		email: ""
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()

		this.validateAnswers()

		this.setState({ email: "" })
	}

	validateAnswers = () => {
		const qNoAnswers = this.props.questions.filter(question => question.answers.length === 0)
		
		const qWithAnswers = this.props.questions.filter(question => question.answers.length > 0)

		const qNoCorrectAnswers = qWithAnswers.filter(question => !question.answers.some(answer => answer.correct === true))

		if (qNoAnswers.length > 0 || qNoCorrectAnswers.length > 0) {
			alert("Please make sure all questions have at least one correct answer before sending a quiz.")
		} else {
			this.emailQuiz()
		}
	}

	emailQuiz = () => {
		const BASE_URL = "http://localhost:3000"

		const templateParams = {
			senderEmail: this.props.senderEmail,
			recipientEmail: this.state.email,
			link: `${BASE_URL}${this.props.url}`
		}

		let quiztakerEmail

		if (this.state.email) { quiztakerEmail = this.state.email }

		emailjs.send('service_fcfonus', 'template_3cu6wee', templateParams, process.env.REACT_APP_EMAILJS_USERID)
			.then(function (response) {
				console.log('SUCCESS!', response.status, response.text)
				alert(`Quiz invitation successfully sent to ${quiztakerEmail}.`)
			}, function (error) {
				console.log('FAILED...', error)
				alert('Oops... something went wrong. Please try again. Make sure you entered email address(es) correctly.')
			})
	}

	render() {
		return (
			<div className="div-aligned">
				<p>To send to more than one recipient, separate addresses with a comma, e.g. 'john@doe.com, jane@doe.com'</p>
				<form className="row-margin" onSubmit={this.submitHandler}>

					<span className="p-float-label label-span-width">
						<InputText className="input-width" type="text" name="email" value={this.state.email} onChange={this.changeHandler} required />
						<label htmlFor="email">Quiz Recipient Email(s)</label>
						<span className="button-margin-left">
							<Button className="p-button-raised p-button-rounded button-width" type="submit" label="Email Quiz" icon="pi pi-envelope" />
						</span>
					</span>

				</form>

			</div>
		)
	}
}

export default EmailQuizComponent