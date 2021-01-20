import React from 'react'
import { connect } from 'react-redux'
import { postQuizQuestion } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class CreateQuestionComponent extends React.Component {
	state = {
		question: ""
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = (e) => {
		e.preventDefault()

		const questionObj = {
			question: this.state.question,
			quiz_id: this.props.quiz.id
		}

		this.props.postQuizQuestion(questionObj)

		this.setState({ question: "" })
	}

	render() {
		return (
			<form  className="row-margin" onSubmit={this.submitHandler}>
				<span className="p-float-label">
					<InputText type="text" name="question" value={this.state.question} onChange={this.changeHandler} required />
					<label htmlFor="email">New Question</label>
					<span className="button-margin-left">
						<Button className="p-button-raised p-button-rounded" type="submit" label="Add Question" icon="pi pi-plus-circle" />
					</span>
				</span>
			</form>
		)
	}
}

function msp(state) {
	return {
		quiz: state.quiz
	}
}

function mdp(dispatch) {
	return {
		postQuizQuestion: (questionObj) => dispatch(postQuizQuestion(questionObj))
	}
}

export default connect(msp, mdp)(CreateQuestionComponent)