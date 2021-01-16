import { combineReducers } from 'redux'

const defaultState = {
	user: null,
	users: null,
	quiz: null,
	takerEmail: null
}

function userReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "POST_USER" :
			return prevState
		case "GET_USER" :
			return action.payload
		case "SET_USER" :
			return action.payload
		case "LOG_OUT_USER" :
			return null
		case "POST_USER_QUIZ" :
			return {...prevState, quizzes: [...prevState.quizzes, action.payload]}
		case "DELETE_USER_QUIZ" :
			return {...prevState, quizzes: [...prevState.quizzes.filter(quiz => quiz.id !== action.payload)]}
		default :
			return prevState
	}
}

function usersReducer(prevState = defaultState.users, action) {
	switch (action.type) {
		case "GET_USERS" :
			return action.payload
		default :
			return prevState
	}
}

function quizReducer(prevState = defaultState.quiz, action) {
	switch (action.type) {
		case "GET_QUIZ" :
			return action.payload
		case "POST_QUIZ_QUESTION" :
			return {...prevState, questions: [...prevState.questions, action.payload]}
		case "DELETE_QUIZ_QUESTION" :
			return {...prevState, questions: [...prevState.questions.filter(question => question.id !== action.payload)]}
		case "PATCH_QUIZ_QUESTION" :
			const questions = prevState.questions.map(questionObj => questionObj.id === action.payload.id ? {...questionObj, question: action.payload.question} : questionObj)
			return {...prevState, questions: questions}
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
	users: usersReducer,
	quiz: quizReducer,
	takerEmail: takerEmailReducer
})

export default rootReducer