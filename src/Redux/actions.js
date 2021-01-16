import {
	POST_USER,
	GET_USER,
	GET_USERS,
	SET_USER,
	LOG_OUT_USER,
	POST_USER_QUIZ,
	DELETE_USER_QUIZ,
	GET_QUIZ,
	SET_TAKER_EMAIL
} from './actionTypes'

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
					alert("Account created successfully! Please log in.")
					ownProps.history.push('/login')
				} else if (userObj.exception) {
					if (userObj.exception.includes("Email has already been taken")) {
						alert("Email has already been taken.")
					} else if (userObj.exception.includes("Email can't be blank")) {
						alert("Email can't be blank.")
					} else if (userObj.exception.includes("Password can't be blank")) {
						alert("Password can't be blank.")
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

export function getUsers() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`)
			.then(r => r.json())
			.then(userObjs => {
				dispatch({ type: GET_USERS, payload: userObjs })
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
		alert("Logged out.")
	}
}

export function postUserQuiz(quizObj,ownProps) {
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
					alert("Quiz created.")
					ownProps.history.push('/quizzes')
				} else {
					alert('Oops... something went wrong. Please try again.')
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
					alert("Quiz deleted.")
				}
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

export function setTakerEmail(takerEmail) {
	return function (dispatch) {
		dispatch({ type: SET_TAKER_EMAIL, payload: takerEmail })
	}
}
