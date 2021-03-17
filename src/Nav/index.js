import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

const Nav = ()=> {
	return (
		<>
			<NavLink className="nav" activeClassName="navActive" to="/" exact>Home</NavLink>
			<NavLink className="nav" activeClassName="navActive" to="/demo-game" exact>Game: Connect Me</NavLink>
			<NavLink className="nav" activeClassName="navActive" to="/mobile-app" exact>Mobile Attendance</NavLink>
		</>
	)
}

export default Nav