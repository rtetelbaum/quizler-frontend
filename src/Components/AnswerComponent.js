import React from 'react'
import { connect } from 'react-redux'
import { deleteQuizAnswer } from '../Redux/actions'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'

function AnswerComponent(props) {

	const deleteAnswerHandler = (answerID) => {
		const questionAnswerID = {
			questionID: props.question.id,
			answerID: answerID
		}

		const accept = () => {
			props.deleteAnswer(questionAnswerID)
		}

		confirmDialog({
			message: 'Are you sure you want to delete this answer?"',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: accept,
			reject: null
		})
	}

	const selectedAnswer = props.quizState[props.question.question]

	return (
		<div className="div-aligned-answer fade-in-2">
			{props.user
				?
				<>
					<div className="answer-radio">
						<RadioButton name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} checked={props.answer.answer === selectedAnswer} />
						<label className="answer-margin" htmlFor={props.answer.answer}>{props.answer.answer}</label>
					</div>
					<span className="correct-margin-left">
						{props.answer.correct ? <i className="pi pi-check-square answer-correct"> Correct Answer</i> : null}
					</span>
					<span className="delete-answer-button">
						<Button className="p-button-raised p-button-rounded p-button-secondary" type="button" label="Delete Answer" icon="pi pi-trash" onClick={() => deleteAnswerHandler(props.answer.id)} />
					</span>
				</>
				:
				<div className="answer-radio-no-user">
					<RadioButton name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} checked={props.answer.answer === selectedAnswer} />
					<label className="answer-margin" htmlFor={props.answer.answer}>{props.answer.answer}</label>
				</div>
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
