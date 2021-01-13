import {combineReducers} from 'redux'

const defaultState = {
	user: 1
}

function userReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "GET_USER" :
			return action.payload.user
		case "LOGOUT_USER" :
			return null
		case "POST_USER" :
			return prevState
		default :
			return prevState
	}
}

const rootReducer = combineReducers({
	user: userReducer,
})

export default rootReducer