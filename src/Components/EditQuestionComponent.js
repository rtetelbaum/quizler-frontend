import React from 'react'
import { connect } from 'react-redux'
import { patchQuizQuestion, setEditQClicked } from '../Redux/actions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

class EditQuestionComponent extends React.Component {

	state = {
		question: ""
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = (e) => {
		e.preventDefault()
		
		const questionObj = {
			question: this.state.question,
			quiz_id: this.props.questionObj.quiz_id
		}

		this.props.patchQuestion(questionObj, this.props.questionObj.id)

		this.props.setEditQClicked(false)
	}

	render() {
		return (
			<form className="row-margin-no-left-bottom-extra-top" onSubmit={this.submitHandler}>
				<span className="p-float-label">
					<InputText type="text" name="question" value={this.state.question} onChange={this.changeHandler} required />
					<label htmlFor="question">Edit Question</label>
					<span className="button-margin-left">
						<Button className="p-button-raised p-button-rounded" type="submit" label="Submit Edit" icon="pi pi-chevron-circle-right" />
					</span>
				</span>
			</form>
		)
	}
}

function mdp(dispatch) {
	return {
		patchQuestion: (questionObj, questionID) => dispatch(patchQuizQuestion(questionObj, questionID)),
		setEditQClicked: (isClicked) => dispatch(setEditQClicked(isClicked))
	}
}

export default connect(null, mdp)(EditQuestionComponent)