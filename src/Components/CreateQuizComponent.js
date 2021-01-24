import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postUserQuiz } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class CreateQuizComponent extends React.Component {

	state = {
		newQuiz: {
			quizmaker: this.props.user ? this.props.user.email : null,
			title: "",
			subject: "",
			user_id: this.props.user ? this.props.user.id : null
		}
	}

	submitHandler = (e) => {
		e.preventDefault()
		this.props.postQuiz(this.state.newQuiz)
	}

	changeHandler = (e) => {
		this.setState(prevState => ({ newQuiz: { ...prevState.newQuiz, [e.target.name]: e.target.value } }))
	}

	render() {
		return (
			this.props.user
				?
				this.props.user.id ?
					<div className="div-aligned fade-in-2">

						<h2 className="p-component">Create a Custom Quiz</h2>

						<form className="form-aligned" onSubmit={this.submitHandler}>
							<span className="p-input-icon-left p-float-label user-form-span-first">
								<i className="pi pi-bars" />
								<InputText type="text" name="title" value={this.state.newQuiz.title} onChange={this.changeHandler} required />
								<label htmlFor="email">Title</label>
							</span>
							<br />
							<span className="p-input-icon-left p-float-label user-form-span-last">
								<i className="pi pi-bars" />
								<InputText type="text" name="subject" value={this.state.newQuiz.subject} onChange={this.changeHandler} required />
								<label htmlFor="subject">Subject</label>
							</span>
							<br />
							<Button className="p-button-raised p-button-rounded user-button" type="submit" label="Create Quiz" icon="pi pi-pencil" />
						</form>

					</div>
					:
					<div>
						<h2 className="p-component fade-in-2">Please log in.</h2>
					</div>
				:
				<div>
					<h2 className="p-component fade-in-2">Please log in.</h2>
				</div>
		)
	}
}

function msp(state) {
	return {
		user: state.user
	}
}

function mdp(dispatch, ownProps) {
	return {
		postQuiz: quizObj => dispatch(postUserQuiz(quizObj, ownProps))
	}
}

export default connect(msp, mdp)(withRouter(CreateQuizComponent))