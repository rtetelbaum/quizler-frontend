import {
	SET_USER,
	LOGOUT_USER,
	ADD_USER_QUIZ,
	GET_QUIZ,
	GET_QUESTIONS,
	SET_TAKER_EMAIL
} from './actionTypes'

const BASE_URL = "http://localhost:4000"

export function setUser(userObj) {
	return ({ type: SET_USER, payload: userObj })
}

export function logOutUser() {
	localStorage.removeItem('userID')
	return ({ type: LOGOUT_USER })
}

export function addUserQuiz(quizObj) {
	return ({ type: ADD_USER_QUIZ, payload: quizObj})
}

export function getQuiz(quizId) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/quizzes/${quizId}`)
			.then(r => r.json())
			.then(data => {
				dispatch({ type: GET_QUIZ, payload: data})
			})
	}
}

export function getQuestions() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/questions`)
			.then(r => r.json())
			.then(data => {
				dispatch({ type: GET_QUESTIONS, payload: data})
			})
	}
}

export function setTakerEmail(takerEmail) {
	return ({ type: SET_TAKER_EMAIL, payload: takerEmail })
}
