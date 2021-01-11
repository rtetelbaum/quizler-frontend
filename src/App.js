import './App.css';

function App() {
  return (
    <div id="app">

			<div id="nav">
				<div id="logo">
					<img src="/logo200.png" alt="logo"/>
				</div>
				<button>Home</button>
				<button>Sign Up</button>
				<button>Log In</button>
				<button>Saved Quizzes</button>
				<button>Create Quiz</button>
			</div>

			<div id="main">
				<h1>Home Component</h1>
				<h1>Sign Up Component</h1>
				<h1>Log In Component</h1>
				<h1>Quiz Container</h1>
				<h1>Create Quiz Component</h1>
				<h1>Quiz Component</h1>
				<h1>Email Quiz Component</h1>
				<h1>Submit Quiz Component</h1>
				<h1>Delete Quiz Component</h1>
				<h1>Create Question Component</h1>
				<h1>Question Component</h1>
				<h1>Edit Question Component</h1>
				<h1>Delete Question Component</h1>
			</div>

			<div id="footer">
				<p>Copyright © Quizler {new Date().getFullYear()} A Roman Tetelbaum Project&nbsp;</p>
				<a href="https://github.com/rtetelbaum/quizler-frontend" target="_blank" rel="noreferrer"><img src="/github.png" alt="github" /></a>
			</div>

		</div>
  );
}

export default App;
