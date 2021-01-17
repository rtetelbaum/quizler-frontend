import React from 'react'
import { connect } from 'react-redux'
import { deleteQuizAnswer } from '../Redux/actions'

function AnswerComponent(props) {

	const deleteAnswerHandler = (answerID) => {
		const questionAnswerID = {
			questionID: props.question.id,
			answerID: answerID
		}

		if (window.confirm("Are you sure you want to delete this answer?")) { props.deleteAnswer(questionAnswerID) }
	}

	return (
		<div>
			{props.user
				?
				<input type="radio" name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} />
				:
				<input type="radio" name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} />
			}

			<label htmlFor={props.answer.answer}>{props.answer.answer}</label>

			{props.user
				?
				<>
					<button type="button" onClick={() => deleteAnswerHandler(props.answer.id)}>Delete Answer</button>
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
		deleteAnswer: (answerID, questionID) => dispatch(deleteQuizAnswer(answerID, questionID)),
		// setEditQClicked: (isClicked) => dispatch(setEditQClicked(isClicked)),
		// setEditQID: (questionID) => dispatch(setEditQID(questionID))
	}
}

export default connect(msp, mdp)(AnswerComponent)
