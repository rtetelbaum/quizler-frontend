import {combineReducers} from 'redux'

const defaultState = {
	user: null
}

function userReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "SET_USER" :
			return action.payload
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