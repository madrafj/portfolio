import React, { useState } from 'react'
import { InputText, Button, Watermark, CheckBox } from './components'
import { logIn } from '../helper/firebasehelper'
import { saveAccount, exitApp } from '../helper/othertools'

const ViewLogIn = props=> {
	const [userID, setUserID] = useState(undefined)
	const [passW, setPassW] = useState(undefined)
	const [saveMe, checkSaveMe] = useState(false)

	const processLogin = e=> {
		e.preventDefault()
		logIn(userID, passW)
		saveMe && saveAccount(userID, passW)
	}

	return (
		<section className={props.isHidden ? "hidden" : "view login"}>
			<header className="header">Log In</header>
			<form className="loginBox f" onSubmit={processLogin}>
				<InputText
					inputType="email"
					boxClass="fl"
					label="User ID"
					onChange={setUserID} />
				<InputText
					inputType="password"
					boxClass="fl"
					label="Password"
					onChange={setPassW} />
				<div className="g ctrlb">
					<CheckBox
						label=" Ingat Saya"
						value={saveMe}
						onChange={checkSaveMe} />
					<Button
						btnClass="sButton fr"
						label="Login" />
				</div>
			</form>
			<h4 className="cancel f" onClick={exitApp}>Keluar</h4>
			<Watermark boxClass="fc" />
		</section>
	)
}

export default ViewLogIn