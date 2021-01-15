import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class CreateQuizComponent extends React.Component {

	state = {
		quizmaker: this.props.user.email,
		title: "",
		subject: "",
		user_id: this.props.user.id
	}

	submitHandler = (e) => {
		e.preventDefault()
		this.postQuiz(this.state)
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	BASE_URL = "http://localhost:4000"

	postQuiz = (quizObj) => {
		fetch(`${this.BASE_URL}/api/v1/quizzes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(quizObj),
		})
			.then(r => r.json())
			.then(data => {
				if (data.id) {
					alert("Quiz created!")
					this.props.history.push('/quizzes')
				} else {
					alert('Oops... something went wrong. Please try again.')
				}
			})
	}

	render() {
		return (
			this.props.user ? this.props.user.id ?
				<div>
					<h3>Create Quiz</h3>
					<form onSubmit={this.submitHandler}>
						<input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.changeHandler} required></input><br />
						<input type="text" name="subject" placeholder="subject" value={this.state.subject} onChange={this.changeHandler} required></input><br />
						<button type="submit">Create Quiz</button>
					</form>
				</div>
				:
				<div>
					<h3>Please log in.</h3>
				</div>
				:
				<div>
					<h3>Please log in.</h3>
				</div>
		)
	}
}

function msp(state) {
	return {
		user: state.user
	}
}

export default connect(msp)(withRouter(CreateQuizComponent))