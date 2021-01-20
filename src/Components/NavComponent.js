import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../Redux/actions'
import { Button } from 'primereact/button'

function NavComponent(props) {

	return (
		<div id="nav-div">

			<div id="logo-div">
				<Link to="/home"><img src="/logo200x100.png" alt="logo" /></Link>
			</div>

			<div id="nav-button-div">

				<Link to="/home"><Button type="button" label="Home" icon="pi pi-home" className="p-button-raised p-button-rounded" /></Link>

				{
					props.user
						?
						props.user.id
							?
							null
							:
							<Link to="/signup"><Button type="button" label="Sign Up" icon="pi pi-user-plus" className="p-button-raised p-button-rounded" /></Link>
						:
						<Link to="/signup"><Button type="button" label="Sign Up" icon="pi pi-user-plus" className="p-button-raised p-button-rounded" /></Link>
				}

				{
					props.user
						?
						props.user.id
							?
							null
							:
							<Link to="/login"><Button type="button" label="Log In" icon="pi pi-sign-in" className="p-button-raised p-button-rounded" /></Link>
						:
						<Link to="/login"><Button type="button" label="Log In" icon="pi pi-sign-in" className="p-button-raised p-button-rounded" /></Link>
				}

				{
					props.user
						?
						props.user.id
							?
							<Link to="/home"><Button type="button" onClick={() => props.logOutUser()} label="Log Out" icon="pi pi-sign-out" className="p-button-raised p-button-rounded" /></Link>
							: null
						:
						null
				}

				{
					props.user
						? props.user.id
							? <Link to="/quizzes"><Button type="button" label="Saved Quizzes" icon="pi pi-save" className="p-button-raised p-button-rounded" /></Link>
							:
							null
						:
						null
				}

				{
					props.user
						?
						props.user.id
							?
							<Link to="/quizzes/create"><Button type="button" label="Create Quiz" icon="pi pi-pencil" className="p-button-raised p-button-rounded" /></Link>
							:
							null
						:
						null
				}

			</div>

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

export default connect(msp, mdp)(NavComponent)