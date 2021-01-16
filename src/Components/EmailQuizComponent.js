import React from 'react'
import emailjs from 'emailjs-com'

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
	}

	emailQuiz = () => {
		const BASE_URL = "http://localhost:3000"

		const templateParams = {
			senderEmail: this.props.senderEmail,
			recipientEmail: this.state.email,
			link: `${BASE_URL}${this.props.url}`
		}

		let quiztakerEmail
		if (this.state.email) {quiztakerEmail = this.state.email}
		
		emailjs.send('service_fcfonus', 'template_3cu6wee', templateParams, process.env.REACT_APP_EMAILJS_USERID)
    .then(function(response) {
			 console.log('SUCCESS!', response.status, response.text)
			 alert(`Quiz invitation successfully sent to ${quiztakerEmail}.`)
    }, function(error) {
			 console.log('FAILED...', error)
			 alert('Oops... something went wrong. Please try again.')
    })
	}

	render() {
		return (
			<div>
				<p>To send to more than one recipient, separate addresses with a commma, e.g. 'john@doe.com, jane@doe.com'</p>
				<form onSubmit={this.submitHandler}>
					<input type="text" name="email" placeholder="Quiz Recipient Email" value={this.state.email} onChange={this.changeHandler} required />
					<button type="submit">Email Quiz</button>
				</form>
			</div>
		)
	}
}

export default EmailQuizComponent