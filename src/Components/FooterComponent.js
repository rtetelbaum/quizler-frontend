import React from 'react'

function FooterComponent() {
	return (
		<div id="footer">
			<p className="p-component">Copyright © Quizler {new Date().getFullYear()} A Roman Tetelbaum Project&nbsp;&nbsp;</p>

			<a href="https://github.com/rtetelbaum/quizler-frontend" target="_blank" rel="noreferrer"><img src="/GitHub-Mark-Light-32px.png" alt="github" /></a>
		</div>
	)
}

export default FooterComponent
