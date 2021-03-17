import React, { useState, useEffect } from 'react'
import ViewFaceRef from './vwfaceref'
import ViewAttends from './vwattends'
import ViewFaceCam from './vwabsens'
import ViewSettings from './vwsetting'
import StartUp from './startUp'
import { Spacer, MenuButton, Watermark } from './components'
import ViewLogIn from './login'
import firebase from 'firebase/app'
import 'firebase/auth'
import { exitApp } from '../helper/othertools'

const ViewMenu = ()=> {
	const [isHidden, hideMe] = useState(false),
		[onFaceRef, openFaceRef] = useState(false),
		[onAttends, openAttends] = useState(false),
		[onFaceCam, openFaceCam] = useState(false),
		[onSetting, openSetting] = useState(false),
		[onLogin, openLogin] = useState(false),
		[onStart, openStart] = useState(true),
		[infoMsg, setMsg] = useState(''),
		[date, setDate] = useState(new Date()),
		[popClass, setPopClass] = useState('hidden')

	useEffect(()=> {
		firebase.auth().onAuthStateChanged(user=> {
			if (user) {
				openLogin(false)
			} else {
				openLogin(true)
			}
		})
	}, [])

	useEffect(()=> {
		hideMe(onFaceRef||onAttends||onFaceCam||onStart||onLogin)
	}, [onFaceRef, onAttends, onFaceCam, onStart, onLogin])

	const popInfo = msg=> {
		setMsg(msg)
		setPopClass('info')
	}

	const onExit = ()=> {
		firebase.auth().signOut()
		exitApp()
	}

	return (
		<>
			<section className={isHidden ? "hidden" : "view basic"}>
				<header className="header">Menu Utama</header>
				<span className="f">
					Welcome...
				</span>
				<nav className="g boxMenu">
					<MenuButton 
						label="Referensi Wajah"
						colorClass="typeE"
						onClick={openFaceRef} />
					<MenuButton 
						label="Absensi Wajah"
						colorClass="typeC"
						onClick={openFaceCam} />
					<MenuButton
						label="Data Absensi"
						onClick={openAttends} />
					<MenuButton 
						label="Pengaturan"
						colorClass="typeE"
						onClick={openSetting} />
					<Spacer />
					<MenuButton
						colorclass="typeC"
						label="KELUAR"
						onClick={onExit} />
				</nav>
				<Watermark boxClass="fc" />
			</section>
			<ViewFaceRef
				isHidden={!onFaceRef}
				onHide={()=>openFaceRef(false)}
				date={date}
				onInfoPop={popInfo} />
			<ViewAttends
				isHidden={!onAttends}
				onHide={()=>openAttends(false)}
				onInfoPop={popInfo} />
			<ViewFaceCam
				isHidden={!onFaceCam}
				onHide={()=>openFaceCam(false)}
				date={date}
				onInfoPop={popInfo} />
			<ViewSettings
				isHidden={!onSetting}
				onHide={()=>openSetting(false)}
				onDateChange={setDate}
				onInfoPop={popInfo} />
			<div className={popClass} onAnimationEnd={()=>setPopClass('hidden')}>
				{infoMsg}
			</div>
			<ViewLogIn
				isHidden={!onLogin}
				onHide={openLogin} />
			<StartUp
				isHidden={!onStart}
				onHide={()=>openStart(false)} />
		</>
	)
}

export default ViewMenu