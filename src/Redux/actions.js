import {
	POST_USER,
	GET_USER,
	GET_USERS,
	SET_USER,
	LOGOUT_USER,
	ADD_USER_QUIZ,
	REMOVE_USER_QUIZ,
	GET_QUIZ,
	GET_QUESTIONS,
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
						alert("Email can't be blank")
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
				dispatch({ type: GET_USER, payload: userObj})
			})
	}
}

export function getUsers() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`)
			.then(r => r.json())
			.then(userObjs => {
				dispatch({ type: GET_USERS, payload: userObjs})
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
		dispatch({ type: LOGOUT_USER })
	}
}

export function addUserQuiz(quizObj) {
	return function (dispatch) {
		dispatch({ type: ADD_USER_QUIZ, payload: quizObj })
	}
}

export function removeUserQuiz(quizID) {
	return function (dispatch) {
		dispatch({ type: REMOVE_USER_QUIZ, payload: quizID })
	}
}

export function getQuiz(quizId) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/quizzes/${quizId}`)
			.then(r => r.json())
			.then(data => {
				dispatch({ type: GET_QUIZ, payload: data })
			})
	}
}

export function getQuestions() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/questions`)
			.then(r => r.json())
			.then(data => {
				dispatch({ type: GET_QUESTIONS, payload: data })
			})
	}
}

export function setTakerEmail(takerEmail) {
	return function (dispatch) {
		dispatch({ type: SET_TAKER_EMAIL, payload: takerEmail })
	}
}
