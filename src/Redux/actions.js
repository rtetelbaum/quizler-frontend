import {
	GET_USERS,
	SET_USER,
	LOGOUT_USER,
	POST_USER,
	GET_QUIZ,
	GET_QUESTIONS
} from './actionTypes'

const BASE_URL = "http://localhost:4000"

export function getUsers() {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`)
			.then(r => r.json())
			.then(data => {
				dispatch({ type: GET_USERS, payload: data})
			})
	}
}

export function setUser(userObj) {
	return ({ type: SET_USER, payload: userObj })
}

export function logOutUser() {
	return ({ type: LOGOUT_USER })
}

export function postUser(userObj) {
	return function (dispatch) {
		fetch(`${BASE_URL}/api/v1/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		})
			.then(r => r.json())
			.then(data => {
				dispatch({ type: POST_USER, payload: data })
			})
	}
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
