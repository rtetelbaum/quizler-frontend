import React from 'react'

function AnswerComponent(props) {
	return (
		<div>
			<input type="radio" id={props.answer.id} name={props.question} value={props.answer.answer} onChange={props.changeHandler} required />
			<label htmlFor={props.answer.answer}>{props.answer.answer}</label><br />
		</div>
	)
}

export default AnswerComponent
