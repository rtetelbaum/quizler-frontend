import {
	GET_USER,
	LOGOUT_USER,
	POST_USER
} from './actionTypes'

const BASE_URL = "http://localhost:4000"

export function logOutUser() {
	return function (dispatch) {
		dispatch({ type: LOGOUT_USER })
	}
}
