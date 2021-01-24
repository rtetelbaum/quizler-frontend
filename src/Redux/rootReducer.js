import { combineReducers } from 'redux'

const defaultState = {
	user: null,
	users: null,
	quiz: null,
	quizzes: null,
	takerEmail: null,
	editQClicked: false,
	editQID: null,
	apiQuiz: null
}

function userReducer(prevState = defaultState.user, action) {
	switch (action.type) {
		case "POST_USER":
			return prevState
		case "GET_USER":
			return action.payload
		case "SET_USER":
			return action.payload
		case "LOG_OUT_USER":
			return null
		case "POST_USER_QUIZ":
			return { ...prevState, quizzes: [...prevState.quizzes, action.payload] }
		case "DELETE_USER_QUIZ":
			return { ...prevState, quizzes: [...prevState.quizzes.filter(quiz => quiz.id !== action.payload)] }
		default:
			return prevState
	}
}

function usersReducer(prevState = defaultState.users, action) {
	switch (action.type) {
		case "GET_USERS":
			return action.payload
		default:
			return prevState
	}
}

function quizReducer(prevState = defaultState.quiz, action) {
	switch (action.type) {
		case "GET_QUIZ":
			return action.payload
		case "POST_QUIZ_QUESTION":
			return { ...prevState, questions: [...prevState.questions, action.payload] }
		case "DELETE_QUIZ_QUESTION":
			return { ...prevState, questions: [...prevState.questions.filter(question => question.id !== action.payload)] }
		case "PATCH_QUIZ_QUESTION":
			const questionsPatchQ = prevState.questions.map(questionObj => questionObj.id === action.payload.id
				?
				{ ...questionObj, question: action.payload.question }
				:
				questionObj
			)
			return { ...prevState, questions: questionsPatchQ }
		case "POST_QUIZ_ANSWER":
			const questionsPostA = prevState.questions.map(questionObj => questionObj.id === action.payload.question_id
				?
				{ ...questionObj, answers: [...questionObj.answers, action.payload] }
				:
				questionObj
			)
			return { ...prevState, questions: questionsPostA }
		case "DELETE_QUIZ_ANSWER":
			const questionsDeleteA = prevState.questions.map(questionObj => questionObj.id === action.payload.questionID
				?
				{ ...questionObj, answers: [...questionObj.answers.filter(answer => answer.id !== action.payload.answerID)] }
				:
				questionObj
			)
			return { ...prevState, questions: questionsDeleteA }
		default:
			return prevState
	}
}

function quizzesReducer(prevState = defaultState.quizzes, action) {
	switch (action.type) {
		case "GET_QUIZZES":
			return action.payload
		default:
			return prevState
	}
}

function takerEmailReducer(prevState = defaultState.takerEmail, action) {
	switch (action.type) {
		case "SET_TAKER_EMAIL":
			return action.payload
		default:
			return prevState
	}
}

function editQClickedReducer(prevState = defaultState.editQClicked, action) {
	switch (action.type) {
		case "SET_EDIT_Q_CLICKED":
			return action.payload
		default:
			return prevState
	}
}

function editQIDReducer(prevState = defaultState.editQID, action) {
	switch (action.type) {
		case "SET_EDIT_Q_ID":
			return action.payload
		default:
			return prevState
	}
}

function apiQuizReducer(prevState = defaultState.apiQuiz, action) {
	switch (action.type) {
		case "SET_API_QUIZ":
			return action.payload
		case "REMOVE_API_QUIZ":
			const newApiQuiz = [...prevState]
			newApiQuiz.shift()
			return newApiQuiz
		default:
			return prevState
	}
}

const rootReducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	quiz: quizReducer,
	quizzes: quizzesReducer,
	takerEmail: takerEmailReducer,
	editQClicked: editQClickedReducer,
	editQID: editQIDReducer,
	apiQuiz: apiQuizReducer
})

export default rootReducer