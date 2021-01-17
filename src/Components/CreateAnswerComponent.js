import React from 'react'
import { connect } from 'react-redux'
import { postQuizAnswer } from '../Redux/actions'

class CreateAnswerComponent extends React.Component {
	state = {
		answer: "",
		correct: false
	}

	answerChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	checkboxChangeHandler = (e) => {
		this.setState({
			correct: e.target.checked
		})
	}

	submitHandler = (e) => {
		e.preventDefault()

		const answerObj = {
			answer: this.state.answer,
			correct: this.state.correct,
			question_id: this.props.question.id
		}

		this.props.postQuizAnswer(answerObj)

		this.setState({
			answer: "",
			correct: false
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<input type="text" name="answer" placeholder="New Answer" value={this.state.answer} onChange={this.answerChangeHandler} required />

					{this.props.question.answers.find(answer => answer.correct === true)
						?
						null
						:
						<>
							<input type="checkbox" name="correct" value="correct" onChange={this.checkboxChangeHandler} />
							<label htmlFor="correct">Correct?</label>
						</>
					}

					<button type="submit">Add Answer</button>
				</form>
			</div>
		)
	}
}

function mdp(dispatch) {
	return {
		postQuizAnswer: (answerObj) => dispatch(postQuizAnswer(answerObj))
	}
}

export default connect(null, mdp)(CreateAnswerComponent)