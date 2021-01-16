import React from 'react'

function AnswerComponent(props) {
	return (
		<div>
			<input type="radio" name={props.question.question} value={props.answer.answer} onChange={props.changeHandler} required />
			<label htmlFor={props.answer.answer}>{props.answer.answer}</label>
		</div>
	)
}

export default AnswerComponent
