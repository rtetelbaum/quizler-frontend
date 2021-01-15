import React from 'react'
import emailjs from 'emailjs-com'

class EmailQuizComponent extends React.Component {

	state = {
		email: ""
	}

	BASE_URL = "http://localhost:3000"

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()
		
		const templateParams = {
			senderEmail: this.props.senderEmail,
			recipientEmail: this.state.email,
			link: `${this.BASE_URL}${this.props.url}`
		}

		let quiztakerEmail
		if (this.state.email) {quiztakerEmail = this.state.email}
		
		emailjs.send('service_fcfonus', 'template_3cu6wee', templateParams, process.env.REACT_APP_EMAILJS_USERID)
    .then(function(response) {
			 console.log('SUCCESS!', response.status, response.text)
			 alert(`Quiz invitation successfully sent to ${quiztakerEmail}!`)
    }, function(error) {
			 console.log('FAILED...', error)
			 alert('Oops... something went wrong. Please try again.')
    })
	}

	render() {
		return (
			<form onSubmit={this.submitHandler}>
				<input type="email" name="email" placeholder="Quiz Recipient Email" value={this.state.email} onChange={this.changeHandler} />
				<button type="submit">Email Quiz</button>
			</form>
		)
	}
}

export default EmailQuizComponent