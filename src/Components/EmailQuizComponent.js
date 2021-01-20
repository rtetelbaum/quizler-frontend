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

		this.emailQuiz()

		this.setState({ email: "" })
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
				<form onSubmit={this.submitHandler}>

					<span className="p-float-label">
						<InputText type="text" name="email" value={this.state.email} onChange={this.changeHandler} required />
						<label htmlFor="email">Quiz Recipient Email(s)</label>
						<Button className="p-button-raised p-button-rounded" type="submit" label="Email Quiz" icon="pi pi-envelope" />
					</span>

				</form>

			</div>
		)
	}
}

export default EmailQuizComponent