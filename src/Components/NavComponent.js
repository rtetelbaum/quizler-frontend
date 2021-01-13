import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logOutUser} from '../Redux/actions'

function NavComponent(props) {

	return (
		<div id="nav">
			<div id="logo">
				<Link to="/home"><img src="/logo200x100.png" alt="logo"/></Link>
			</div>
			<Link to="/home"><button>Home</button></Link>
			{props.user ? props.user.id ? null : <Link to="/signup"><button>Sign Up</button></Link> : <Link to="/signup"><button>Sign Up</button></Link>}
			{props.user ? props.user.id ? null : <Link to="/login"><button>Log In</button></Link> : <Link to="/login"><button>Log In</button></Link>}
			{props.user ? props.user.id ? <Link to="/home"><button onClick={() => props.logOutUser()}>Log Out</button></Link> : null : null}
			{props.user ? props.user.id ? <Link to="/quizzes"><button>Saved Quizzes</button></Link> : null : null}
			{props.user ? props.user.id ? <Link to="/quizzes/create"><button>Create Quiz</button></Link> : null : null}
		</div>
	)
}

function msp(state) {
	return {
		user: state.user
	}
}

function mdp(dispatch) {
	return {
		logOutUser: () => dispatch(logOutUser())
	}
}

export default connect(msp, mdp) (NavComponent)