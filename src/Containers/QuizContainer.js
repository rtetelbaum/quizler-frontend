import React from 'react'
import { connect } from 'react-redux'

function QuizContainer(props) {
	
	const arrayOfQuizzes = () => {
		const userQuizzesArray = props.user.quizzes
		const sortedQuizzesArray = userQuizzesArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
		return sortedQuizzesArray.map(quiz =>
			<div key={quiz.id}>
				<h3>Title: {quiz.title}</h3>
				<p>Subject: {quiz.subject}</p>
			</div>
		)
	}

	return (
		props.user ? props.user.id ?
			<div>
				<h1>Quizmaker {props.user.email}'s Saved Quizzes</h1>
				{
					arrayOfQuizzes().length === 0
					?
					<p>You have no saved quizzes, please create one.</p>
					:
					arrayOfQuizzes()
				}
			</div>
			:
			<div>
				<h3>Please log in.</h3>
			</div>
			:
			<div>
				<h3>Please log in.</h3>
			</div>
	)
}

function msp(state) {
	return {
		user: state.user
	}
}

export default connect(msp)(QuizContainer)