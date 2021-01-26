import {
	POST_USER,
	GET_USER,
	SET_USER,
	LOG_OUT_USER,
	POST_USER_QUIZ,
	DELETE_USER_QUIZ,
	GET_USERS,
	GET_QUIZ,
	POST_QUIZ_QUESTION,
	DELETE_QUIZ_QUESTION,
	PATCH_QUIZ_QUESTION,
	POST_QUIZ_ANSWER,
	DELETE_QUIZ_ANSWER,
	GET_QUIZZES,
	SET_QUIZ_TAKER,
	SET_EDIT_Q_CLICKED,
	SET_EDIT_Q_ID
} from './actionTypes'
import Swal from 'sweetalert2'

const BASE_URL = "http://localhost:4000"

export function postUser(userObj, ownProps) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		})
			.then(r => r.json())
			.then(userObj => {
				if (userObj.id) {
					dispatch({ type: POST_USER, payload: userObj })
					Swal.fire("Account created successfully! Please log in.")
					ownProps.history.push('/login')
				} else if (userObj.exception) {
					if (userObj.exception.includes("Email has already been taken")) {
						Swal.fire("Email has already been taken.")
					} else if (userObj.exception.includes("Email can't be blank")) {
						Swal.fire("Email can't be blank.")
					} else if (userObj.exception.includes("Password can't be blank")) {
						Swal.fire("Password can't be blank.")
					}
				}
			})
	}
}

export function getUser(userID) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users/${userID}`)
			.then(r => r.json())
			.then(userObj => {
				dispatch({ type: GET_USER, payload: userObj })
			})
	}
}

export function setUser(userObj) {
	return function (dispatch) {
		dispatch({ type: SET_USER, payload: userObj })
	}
}

export function logOutUser() {
	return function (dispatch) {
		localStorage.removeItem('userID')
		dispatch({ type: LOG_OUT_USER })
		Swal.fire("Logged out.")
	}
}

export function postUserQuiz(quizObj, ownProps) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/quizzes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(quizObj),
		})
			.then(r => r.json())
			.then(quizObj => {
				if (quizObj.id) {
					dispatch({ type: POST_USER_QUIZ, payload: quizObj })
					Swal.fire("Quiz created.")
					ownProps.history.push(`/quizzes/${quizObj.id}`)
				} else {
					Swal.fire('Oops... something went wrong. Please try again.')
				}
			})
	}
}

export function deleteUserQuiz(quizID) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/quizzes/${quizID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(r => r.json())
			.then(data => {
				if (Object.keys(data).length === 0) {
					dispatch({ type: DELETE_USER_QUIZ, payload: quizID })
				}
			})
	}
}

export function getUsers() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`)
			.then(r => r.json())
			.then(userObjs => {
				dispatch({ type: GET_USERS, payload: userObjs })
			})
	}
}

export function getQuiz(quizId) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/quizzes/${quizId}`)
			.then(r => r.json())
			.then(quizObj => {
				dispatch({ type: GET_QUIZ, payload: quizObj })
			})
	}
}

export function postQuizQuestion(questionObj) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/questions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(questionObj),
		})
			.then(r => r.json())
			.then(questionObj => {
				if (questionObj.id) {
					dispatch({ type: POST_QUIZ_QUESTION, payload: questionObj })
					Swal.fire("Question added.")
				} else {
					Swal.fire('Oops... something went wrong. Please try again.')
				}
			})
	}
}

export function deleteQuizQuestion(questionID) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/questions/${questionID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(r => r.json())
			.then(data => {
				if (Object.keys(data).length === 0) {
					dispatch({ type: DELETE_QUIZ_QUESTION, payload: questionID })
				}
			})
	}
}

export function patchQuizQuestion(questionObj, questionID) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/questions/${questionID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(questionObj),
		})
			.then(r => r.json())
			.then(questionObj => {
				if (questionObj.id) {
					dispatch({ type: PATCH_QUIZ_QUESTION, payload: questionObj })
					Swal.fire("Question edited.")
				} else {
					Swal.fire('Oops... something went wrong. Please try again.')
				}
			})
	}
}

export function postQuizAnswer(answerObj) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/answers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(answerObj),
		})
			.then(r => r.json())
			.then(answerObj => {
				if (answerObj.id) {
					dispatch({ type: POST_QUIZ_ANSWER, payload: answerObj })
					Swal.fire("Answer added.")
				} else {
					Swal.fire('Oops... something went wrong. Please try again.')
				}
			})
	}
}

export function deleteQuizAnswer(questionAnswerID) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/answers/${questionAnswerID.answerID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(r => r.json())
			.then(data => {
				if (Object.keys(data).length === 0) {
					dispatch({ type: DELETE_QUIZ_ANSWER, payload: (questionAnswerID) })
				}
			})
	}
}

export function getQuizzes() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/quizzes`)
			.then(r => r.json())
			.then(quizObjs => {
				dispatch({ type: GET_QUIZZES, payload: quizObjs })
			})
	}
}

export function setQuizTaker(quizTaker) {
	return function (dispatch) {
		dispatch({ type: SET_QUIZ_TAKER, payload: quizTaker })
	}
}

export function setEditQClicked(isClicked) {
	return function (dispatch) {
		dispatch({ type: SET_EDIT_Q_CLICKED, payload: isClicked })
	}
}

export function setEditQID(questionID) {
	return function (dispatch) {
		dispatch({ type: SET_EDIT_Q_ID, payload: questionID })
	}
}