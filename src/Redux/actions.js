import {
	SET_USER,
	LOGOUT_USER,
	POST_USER
} from './actionTypes'

const BASE_URL = "http://localhost:4000"

export function setUser(userObj) {
	return function (dispatch) {
		dispatch({ type: SET_USER, payload: userObj })
	}
}

export function logOutUser() {
	return function (dispatch) {
		dispatch({ type: LOGOUT_USER })
	}
}
