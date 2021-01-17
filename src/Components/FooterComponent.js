import React from 'react'

function FooterComponent() {
	return (
		<div id="footer">
			<p>Copyright © Quizler {new Date().getFullYear()} A Roman Tetelbaum Project&nbsp;</p>

			<a href="https://github.com/rtetelbaum/quizler-frontend" target="_blank" rel="noreferrer"><img src="/github.png" alt="github" /></a>
		</div>
	)
}

export default FooterComponent
