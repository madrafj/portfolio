import React, { useState, useEffect, useRef } from 'react'
import { InputSelect, BackButton, Button } from './components'
import { getGroups } from '../helper/firebasehelper'
import { getCamera, disableCamera } from '../helper/othertools'

const ViewFaceCam = props=> {
	const [groups, fillGroups] = useState([]),
		[groupID, setGroupID] = useState('nul'),
		[onStream, toggleStream] = useState(false)

	const	camRef = useRef()

	useEffect(()=> getCamera(camRef), [])

	useEffect(()=> {
		getGroups(fillGroups)
		setGroupID('nul')
	}, [props.isHidden])

	useEffect(()=> {
		disableCamera(camRef)
	}, [groupID])

	useEffect(()=> {
		if (onStream) {
			camRef.current.disabled && disableCamera(camRef, false)
			camRef.current.play()
		} else {
			camRef.current.pause()
		}
	}, [onStream])
	
	const updateAttendances = ()=>  {
		props.onInfoPop('Sorry, This Feature is Disabled')
	}

	return (
		<section className={props.isHidden ? "hidden" : "view basic"}>
			<header className="header">Kamera Absens</header>
			<div className="g ctrla">
				<InputSelect
					boxClass="fr"
					label="Grup:"
					preText="-Pilih Grup-"
					off={onStream}
					data={groups}
					value={groupID}
					onChange={setGroupID} />
			</div>
			<div className="content">
				<video
					className="video"
					ref={camRef}
					width="320"
					height="320"
					muted />
			</div>
			<footer className="control ctrlb">
				<Button
					btnClass="sButton f"
					off={onStream || groupID==='nul'}
					label="START"
					onClick={()=>toggleStream(true)} />
				<Button
					btnClass="sButton f"
					off={!onStream || groupID==='nul'}
					label="STOP"
					onClick={()=>toggleStream(false)} />
				<BackButton
					off={onStream}
					onClick={props.onHide} /> 
				<Button
					btnClass="sButton f"
					off={onStream || groupID==='nul'}
					label="Simpan"
					onClick={updateAttendances} />
			</footer>
		</section>
	)
}

export default ViewFaceCam