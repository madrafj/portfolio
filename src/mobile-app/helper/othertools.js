export function formatDate(date) {
	return date.toISOString().slice(0,10)
}

export function getCamera(camRef) {
	const camOptions = {
		video: {
			width: 320,
			height: 320,
			facingMode: { exact: 'user'}
		}
	}

	navigator.mediaDevices.getUserMedia(camOptions).then(stream=> {
		camRef.current.srcObject = stream
		console.log('getCamera')
	})
}

export function disableCamera(camRef, val = true) {
	camRef.current.disabled = val
	val ? camRef.current.style.visibility = 'hidden'
	: camRef.current.style.visibility = 'visible'
}

export function saveAccount(uid, passW) {
	localStorage.setItem('savedUid', uid)
	localStorage.setItem('savedPassW', passW)
}

export function removeAccount() {
	localStorage.removeItem('savedUid')
	localStorage.removeItem('savedPassW')
}

export function exitApp() {
	alert ('Exit Function unavailable in Demo-App. You Still can log Out though.')
}