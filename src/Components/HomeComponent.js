import React from 'react'

function HomeComponent() {
	return (
		<div className="div-aligned fade-in-2">
			<h1 className="p-component">Welcome to Quizler!</h1>
			<p className="home-p">
				Quizler allows you to create multiple choice quizzes, email a link to the quiz to anyone, 
				and receive a score and report with their results! Use Quizler with your students, employees,
				or to help you study for exams. Best of all, it's 100% free!
			</p>
			<p className="home-p"><i>"Quizzing yourself before an exam can enhance your learning."</i> -
				<a href="https://www.curiousneuron.com/learningarticles/2018/9/18/quizzing-yourself-before-an-exam-can-enhance-your-learning" target="_blank" rel="noreferrer">
					<u>Curious Neuron</u>
				</a>
			</p>

			<div className="review-row">

				<div className="review">
					<img src='/SpaceX.jpg' alt='spacex' />
					<p>"First quiz app our astronauts used on Mars. Buy Tesla stock!"</p>
					<p><b>-Elon Musk</b></p>
				</div>

				<div className="review">
					<img src='/GQ.png' alt='gq' />
					<p>"Sexiest app of 2027!"</p>
					<p><b>-GQ</b></p>
				</div>

				<div className="review">
					<img src='/Harvard.png' alt='harvard' />
					<p>"All of our students are required to use Quizler or face expulsion!"</p>
					<p><b>-Harvard University</b></p>
				</div>

				<div className="review">
					<img src='/Flatiron.jpg' alt='flatiron' />
					<p>"From our top graduate of all time!"</p>
					<p><b>-Flatiron School</b></p>
				</div>

				<div className="review">
					<img src='/Microsoft.png' alt='microsoft' />
					<p>"Stop asking me for a review! How did you get this number?"</p>
					<p><b>-Bill Gates</b></p>
				</div>

				<div className="review">
					<img src='/Time.png' alt='time' />
					<p>"App of the Year 2031!"</p>
					<p><b>-Time Magazine</b></p>
				</div>

				<div className="review">
					<img src='/CNET.png' alt='cnet' />
					<p>"#1 unranked quiz app out there!"</p>
					<p><b>-CNET</b></p>
				</div>

			</div>

		</div>
	)
}

export default HomeComponent