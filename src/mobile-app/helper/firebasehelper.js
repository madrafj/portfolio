import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

/* Initializing Firebase App */

const firebaseConfig = {
	apiKey: "AIzaSyCyMOJIJDHo36RIsZcRTrKJPFws-80SBBE",
	authDomain: "fir-app-24f81.firebaseapp.com",
	projectId: "fir-app-24f81",
	storageBucket: "fir-app-24f81.appspot.com",
	messagingSenderId: "808132996311",
	appId: "1:808132996311:web:e522c30b194f9cb95e9492",
	measurementId: "G-0ZZM2MG6WG"
}

firebase.initializeApp(firebaseConfig)

/* Firebase Database Helper */

const db = firebase.database(),
	GFaces = db.ref('GFaces'),
	GDesc = db.ref('GDesc'),
	GAttendances = db.ref('GAttendances'),
	GMembers = db.ref('GMembers')

export async function getGroups(func) {
	await GDesc.once('value', snap=> {
		const obj = snap.val()
		const arr = Object.keys(obj)
		func(arr)
	})
}

export async function getMembers(e, func) {
	await GMembers.child(e).once('value', snap=> {
		const obj = snap.val()
		if (obj) {
			let arr = Object.keys(obj)
			func(arr, obj)
		} else {
			func([])
		}
	})
}

export async function getMemberz(e, func) {
	await GDesc.child(e).child('memberList').once('value', snap=> {
		let obj = snap.val()
		func(Object.keys(obj))
	})
}

export async function getAttends(e, func) {
	await GAttendances.child(e).once('value',snap=> {
		const data = snap.val()
		data ? func(data) : func(null)
	})
}

export async function getFaceDatas(group, func) {
	await GFaces.child(group).once('value',snap=> {
		const groupFaces = snap.val()
		groupFaces ? func(groupFaces) : func(undefined)
	})
}

export function updateFaceData(res, group, member) {
	GFaces.child(group).set(res).catch(err=> alert(err.message))
	GDesc.child(group+'/memberList/'+member).set(true)
	GMembers.child(group+'/'+member+'/descripted').set(true)
}

export function updateAttnder(date, group, memberList) {
	GAttendances.child(group + '/' + date).set(memberList)
}

/* Firebase Auth Helper */

export function logIn(uid, passw) {
	firebase.auth().signInWithEmailAndPassword(uid, passw).catch(err=> {
		let errorCode = err.code, errorMessage
		if (errorCode === 'auth/network-request-failed') {
			errorMessage = 'Anda Tidak Terhubung ke Internet'
		} else {
			errorMessage = err.message
		}
		window.alert('Error: ' + errorMessage)
	})
}

export function autoLogIn() {
	const savedUid = localStorage.getItem('savedUid')
	const savedPassW = localStorage.getItem('savedPassW')
	if (savedUid && savedPassW) {
		logIn(savedUid, savedPassW)
	}
}

export function logOut() { firebase.auth().signOut() }

export function changePassW(newPassW, func) {
	firebase.auth().currentUser.updatePassword(newPassW).then(func).catch(err=> {
		alert('Error: ' + err.message)
	})
}
