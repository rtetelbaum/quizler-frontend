import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getApiQuiz, postUserQuiz } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class CreateQuizComponent extends React.Component {

	state = {
		quizmaker: this.props.user ? this.props.user.email : null,
		title: "",
		subject: "",
		user_id: this.props.user ? this.props.user.id : null
	}

	submitHandler = (e) => {
		e.preventDefault()

		this.props.postQuiz(this.state)

		this.setState({
			title: "",
			subject: ""
		})
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	testApiHandler = () => {
		const endpoint = `https://quizapi.io/api/v1/questions?apiKey=${process.env.REACT_APP_QUIZ_API_KEY}&category=devops&difficulty=Easy&limit=10`
		this.props.getApiQuiz(endpoint)
	}

	render() {
		console.log(this.props.apiQuiz)
		return (
			this.props.user
				?
				this.props.user.id ?
					<div className="div-aligned fade-in-2">

						<h2 className="p-component">Create Quiz</h2>

						<form className="form-aligned" onSubmit={this.submitHandler}>
							<span className="p-input-icon-left p-float-label user-form-span-first">
								<i className="pi pi-bars" />
								<InputText type="text" name="title" value={this.state.title} onChange={this.changeHandler} required />
								<label htmlFor="email">Title</label>
							</span>
							<br />
							<span className="p-input-icon-left p-float-label user-form-span-last">
								<i className="pi pi-bars" />
								<InputText type="text" name="subject" value={this.state.subject} onChange={this.changeHandler} required />
								<label htmlFor="subject">Subject</label>
							</span>
							<br />
							<Button className="p-button-raised p-button-rounded user-button" type="submit" label="Create Quiz" icon="pi pi-pencil" />
						</form>

						<Button className="p-button-raised p-button-rounded" type="button" label="Test Quiz API" onClick={() => this.testApiHandler()} />

					</div>
					:
					<div>
						<h2 className="p-component">Please log in.</h2>
					</div>
				:
				<div>
					<h2 className="p-component">Please log in.</h2>
				</div>
		)
	}
}

function msp(state) {
	return {
		user: state.user,
		apiQuiz: state.apiQuiz
	}
}

function mdp(dispatch, ownProps) {
	return {
		postQuiz: quizObj => dispatch(postUserQuiz(quizObj, ownProps)),
		getApiQuiz: endpoint => dispatch(getApiQuiz(endpoint))
	}
}

export default connect(msp, mdp)(withRouter(CreateQuizComponent))