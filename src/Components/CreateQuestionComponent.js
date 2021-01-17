import React from 'react'
import { connect } from 'react-redux'
import { postQuizQuestion } from '../Redux/actions'

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
			<form onSubmit={this.submitHandler}>
				<input type="text" name="question" placeholder="New Question" value={this.state.question} onChange={this.changeHandler} required />
				<button type="submit">Add Question</button>
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