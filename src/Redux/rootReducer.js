import {combineReducers} from 'redux'

const defaultState = {
	users: null,
	user: null
}

function usersReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "GET_USERS" : 
			return action.payload
		default :
			return prevState
	}
}

function userReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "SET_USER" :
			return action.payload
		case "LOGOUT_USER" :
			return null
		case "POST_USER" :
			return action.payload
		default :
			return prevState
	}
}

const rootReducer = combineReducers({
	users: usersReducer,
	user: userReducer
})

export default rootReducer