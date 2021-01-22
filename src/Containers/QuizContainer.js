import React from 'react'
import { deleteUserQuiz } from '../Redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'

class QuizContainer extends React.Component {

	state = {
		searchValue: ""
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	deleteQuizHandler = (quizID) => {
		if (window.confirm("Are you sure you want to delete this quiz?")) { this.props.deleteQuiz(quizID) }
	}

	arrayOfQuizzes = () => {
		const userQuizzesArray = this.props.user.quizzes

		const sortedQuizzesArray = userQuizzesArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))

		const filteredQuizzesArray = sortedQuizzesArray.filter(quiz => quiz.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))

		return filteredQuizzesArray.map(quiz =>
			<Card
				key={quiz.id}
				className="card"
				title={<Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>}
				subTitle={<Link to={`/quizzes/${quiz.id}`}>{quiz.subject}</Link>}
				header={<Link to={`/quizzes/${quiz.id}`}><img alt="Card" src='/logo200x100.png' /></Link>}
				footer={<span className="card-button-span"><Button className="p-button-raised p-button-rounded p-button-secondary" icon="pi pi-trash" type="button" label="Delete Quiz" onClick={() => this.deleteQuizHandler(quiz.id)} /></span>}>
			</Card>
		)
	}

	render() {
		return (
			this.props.user
				?
				this.props.user.id
					?
					<div className="div-aligned fade-in-2">
						<h1 className="p-component">Quizmaker {this.props.user.email}</h1>
						<h2 className="p-component">Saved Quizzes</h2>

						<span className="p-input-icon-left p-float-label input-span-search">
							<i className="pi pi-search" />
							<InputText className="input-width" type="text" name="searchValue" value={this.state.searchValue} onChange={this.changeHandler} />
							<label htmlFor="Search Quizzes">Search your quizzes</label>
						</span><br />

						<div className="div-aligned-row-wrap">
							{
								this.arrayOfQuizzes().length === 0
									?
									<h3 className="p-component">You have no saved quizzes, please create one.</h3>
									:
									this.arrayOfQuizzes()
							}
						</div>
					</div>
					:
					<div className="fade-in-2">
						<h1 className="p-component">Please log in.</h1>
					</div>
				:
				<div className="fade-in-2">
					<h1 className="p-component">Please log in.</h1>
				</div>
		)
	}
}

function msp(state) {
	return {
		user: state.user
	}
}

function mdp(dispatch) {
	return {
		deleteQuiz: (quizID) => dispatch(deleteUserQuiz(quizID))
	}
}

export default connect(msp, mdp)(QuizContainer)