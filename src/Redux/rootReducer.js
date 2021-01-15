import {combineReducers} from 'redux'

const defaultState = {
	user: null,
	quiz: null,
	questions: null,
	takerEmail: null
}

function userReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "SET_USER" :
			return action.payload
		case "LOGOUT_USER" :
			return null
		default :
			return prevState
	}
}

function quizReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "GET_QUIZ" :
			return action.payload
		default :
			return prevState
	}
}

function questionsReducer(prevState = defaultState.questions, action) {
	switch (action.type) {
		case "GET_QUESTIONS" :
			return action.payload
		default :
			return prevState
	}
}

function takerEmailReducer(prevState = defaultState.takerEmail, action) {
	switch (action.type) {
		case "SET_TAKER_EMAIL" :
			return action.payload
		default :
			return prevState
	}
}

const rootReducer = combineReducers({
	user: userReducer,
	quiz: quizReducer,
	questions: questionsReducer,
	takerEmail: takerEmailReducer
})

export default rootReducer