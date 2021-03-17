import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Nav from './Nav'
import Game from './demo-game'
import Ricog from './mobile-app'

const Home = ()=> {
	return (
		<>
			<h1>Welcome to My Portfolio App</h1>
			<p style={{fontSize: '1.2em', margin: '5% 20% 5% 10%'}}>
				Hi, My name is Ahmad Rafsanjani. I am a Front-end Developer. This demo 
				page served as my Portfolio-App, built with React and paginated with 
				React-router. I included 2 of my projects here. One is a simple game 
				made with CSS and React component. The other one is a hybrid app 
				intended for Android users as a client side app Attendance System 
				powered by <a href="https://justadudewhohacks.github.io/face-api.js/docs/index.html">
					face-api.js
				</a>.
			</p>
			<ol style={{fontSize: '1.2em',margin: '0 10%'}}>
				<li>
					<Link to="/demo-game" exact>Game: Connect Me</Link>
				</li>
				<li>
					<Link to="/mobile-app" exact>Mobile Attendance</Link>
				</li>
			</ol>
		</>
	)
}

const App = ()=> {
	return (
		<BrowserRouter>
			<Nav />
			<Switch>
				<Route
					path="/"
					exact
					component={Home}
				/>
				<Route
					path="/demo-game"
					component={()=> {
						return (
							<>
								<h1>This is My Demo Game titled ConnectMe!</h1>
								<Game />
							</>
						)
					}}
				/>
				<Route
					path="/mobile-app"
					component={()=> {
						return (
							<>
								<h1>This is My Demo App titled Ricognisi!</h1>
								<Ricog />
							</>
						)
					}}
				/>
			</Switch>
		</BrowserRouter>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)