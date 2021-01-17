import React from 'react'
import { connect } from 'react-redux'

function AnswerComponent(props) {

	return (
		<div>
			{props.user
				?
				<input type="radio" name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} />
				:
				<input type="radio" name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} />
			}

			<label htmlFor={props.answer.answer}>{props.answer.answer}</label>

		</div>
	)
}

function msp(state) {
	return {
		user: state.user
	}
}

export default connect(msp)(AnswerComponent)
