import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postUserQuiz, setApiQuiz } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

class CreateQuizComponent extends React.Component {

	state = {
		newQuiz: {
			quizmaker: this.props.user ? this.props.user.email : null,
			title: "",
			subject: "",
			user_id: this.props.user ? this.props.user.id : null
		},
		quizApiCategory: "",
		quizApiTitle: ""
	}

	submitHandler = (e) => {
		e.preventDefault()
		this.props.postQuiz(this.state.newQuiz)
	}

	changeHandler = (e) => {
		this.setState(prevState => ({ newQuiz: { ...prevState.newQuiz, [e.target.name]: e.target.value } }))
	}

	setCategory = (e) => {
		this.setState({ quizApiCategory: e.value })

		if (e.value === 'bash') {
			this.setState({ quizApiTitle: 'Bash' })
		} else if (e.value === 'devops') {
			this.setState({ quizApiTitle: 'DevOps' })
		} else if (e.value === 'docker') {
			this.setState({ quizApiTitle: 'Docker' })
		} else if (e.value === 'linux') {
			this.setState({ quizApiTitle: 'Linux' })
		} else if (e.value === 'sql') {
			this.setState({ quizApiTitle: 'SQL' })
		} else if (e.value === 'code') {
			this.setState({ quizApiTitle: 'Various Coding' })
		} else if (e.value === 'cms') {
			this.setState({ quizApiTitle: 'WordPress CMS' })
		}
	}

	getApiQuiz = () => {
		const endpoint = `https://quizapi.io/api/v1/questions?apiKey=${process.env.REACT_APP_QUIZ_API_KEY}&category=${this.state.quizApiCategory}`

		fetch(`${endpoint}`)
			.then(r => r.json())
			.then(quizObj => {
				const quizNoMultiAnswer = quizObj.filter(question => question.multiple_correct_answers === "false")
				this.props.setApiQuiz(quizNoMultiAnswer)
				this.makeApiQuiz()
			})
	}

	makeApiQuiz = () => {

		const newQuiz = {
			quizmaker: this.props.user ? this.props.user.email : null,
			title: this.state.quizApiTitle,
			subject: "Technical Quiz from QuizAPI",
			user_id: this.props.user ? this.props.user.id : null
		}

		this.props.postQuiz(newQuiz)

	}

	quizApiCategories = [
		{ label: 'Bash', value: 'bash' },
		{ label: 'DevOps', value: 'devops' },
		{ label: 'Docker', value: 'docker' },
		{ label: 'Linux', value: 'linux' },
		{ label: 'SQL', value: 'sql' },
		{ label: 'Various Coding', value: 'code' },
		{ label: 'WordPress CMS', value: 'cms' }
	]

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

						<div>
							<h2 className="p-component">Create a Technical Quiz from<a href="https://quizapi.io/" target="_blank" rel="noreferrer"><img src="/QuizAPI.png" alt="QuizAPI" className="inline-image" /></a></h2>
							<Dropdown value={this.state.quizApiCategory} options={this.quizApiCategories} onChange={(e) => this.setCategory(e)} placeholder="Category" />
							<Button className="p-button-raised p-button-rounded" type="button" label="Create Quiz" onClick={() => this.getApiQuiz()} icon="pi pi-pencil" />
						</div>

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
		postQuiz: quizObj => dispatch(postUserQuiz(quizObj, ownProps)),
		setApiQuiz: quizObj => dispatch(setApiQuiz(quizObj))
	}
}

export default connect(msp, mdp)(withRouter(CreateQuizComponent))