import React from 'react'
import { connect } from 'react-redux'
import { postQuizAnswer } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'

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
				<form className="form-row row-margin-no-left" onSubmit={this.submitHandler}>
					<span className="p-float-label">
						<InputText type="text" name="answer" value={this.state.answer} onChange={this.answerChangeHandler} required />
						<label htmlFor="answer">New Answer</label>
					</span>
					{this.props.question.answers.find(answer => answer.correct === true)
						?
						null
						:
						<>
							<span className="button-margin-left">
								<Checkbox type="checkbox" value="correct" name="correct" onChange={this.checkboxChangeHandler}></Checkbox>
								<label htmlFor="correct"> Correct?</label>
							</span>
						</>
					}
					<span className="button-margin-left">
						<Button className="p-button-raised p-button-rounded" type="submit" label="Add Answer" icon="pi pi-plus-circle" />
					</span>
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