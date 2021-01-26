import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './Redux/rootReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>,
	</React.StrictMode>,
	document.getElementById('root')
)
