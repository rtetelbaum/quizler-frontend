import React from 'react'
import { connect } from 'react-redux'
import { deleteQuizAnswer } from '../Redux/actions'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'

function AnswerComponent(props) {

	const deleteAnswerHandler = (answerID) => {
		const questionAnswerID = {
			questionID: props.question.id,
			answerID: answerID
		}

		if (window.confirm("Are you sure you want to delete this answer?")) { props.deleteAnswer(questionAnswerID) }
	}

	return (
		<div className="div-aligned-row">
			{props.user
				?
				<div className="answer-radio">
					<RadioButton name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} />
					<label className="answer-margin" htmlFor={props.answer.answer}>{props.answer.answer}</label>
				</div>
				:
				<div className="answer-radio">
					<RadioButton name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} />
					<label className="answer-margin" htmlFor={props.answer.answer}>{props.answer.answer}</label>
				</div>
			}

			{props.user
				?
				<>
					<Button className="p-button-raised p-button-rounded p-button-secondary" type="button" label="Delete Answer" icon="pi pi-trash" onClick={() => deleteAnswerHandler(props.answer.id)} />
					{props.answer.correct ? "(Correct answer)" : null}
				</>
				:
				null
			}
		</div>
	)
}

function msp(state) {
	return {
		user: state.user
	}
}

function mdp(dispatch) {
	return {
		deleteAnswer: (answerID, questionID) => dispatch(deleteQuizAnswer(answerID, questionID))
	}
}

export default connect(msp, mdp)(AnswerComponent)
