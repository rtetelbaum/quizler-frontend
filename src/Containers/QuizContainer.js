import React from 'react'
import { deleteUserQuiz } from '../Redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function QuizContainer(props) {

	const deleteQuizHandler = (quizID) => {
		if (window.confirm("Are you sure you want to delete this quiz?")) { props.deleteQuiz(quizID) }
	}

	const arrayOfQuizzes = () => {
		const userQuizzesArray = props.user.quizzes

		const sortedQuizzesArray = userQuizzesArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))

		return sortedQuizzesArray.map(quiz =>
			<div key={quiz.id}>
				<Link to={`/quizzes/${quiz.id}`}><h3>Title: {quiz.title} </h3></Link>
				
				<p>Subject: {quiz.subject}</p>
				
				<button type="button" onClick={() => deleteQuizHandler(quiz.id)}>Delete Quiz</button>
			</div>
		)
	}

	return (
		props.user
			?
			props.user.id
				?
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

function mdp(dispatch) {
	return {
		deleteQuiz: (quizID) => dispatch(deleteUserQuiz(quizID))
	}
}

export default connect(msp, mdp)(QuizContainer)