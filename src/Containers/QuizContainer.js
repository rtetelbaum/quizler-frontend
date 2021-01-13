import React from 'react'
import {connect} from 'react-redux'

function QuizContainer(props) {
	return (
		<div>
			<h1>Quiz Container</h1>
		</div>
	)
}

function msp(state) {
	return {
		
	}
}

export default connect(msp) (QuizContainer)