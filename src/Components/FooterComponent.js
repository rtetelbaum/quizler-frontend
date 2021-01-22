import React from 'react'

function FooterComponent() {
	return (
		<div id="footer-div">
			<p className="p-component">Copyright © Quizler {new Date().getFullYear()} A Roman Tetelbaum Project&nbsp;&nbsp;</p>

			<a href="https://github.com/rtetelbaum/quizler-frontend" target="_blank" rel="noreferrer"><img src="/GitHub-Mark-Light-32px.png" alt="github" /></a>
			<a href="https://www.linkedin.com/in/rtetelbaum/" target="_blank" rel="noreferrer"><img className="footer-logo" src="/LinkedIn.png" alt="linkedin" /></a>
			<a href="https://rtetelbaum.medium.com/" target="_blank" rel="noreferrer"><img className="footer-logo" src="/Medium.png" alt="linkedin" /></a>
		</div>
	)
}

export default FooterComponent
