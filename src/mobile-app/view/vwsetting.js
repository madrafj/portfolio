import React, { useState } from 'react'
import { InputText, BackButton, SettMenu, Spacer } from './components'
import { removeAccount } from '../helper/othertools'
import { logOut, changePassW } from '../helper/firebasehelper'

const ViewSetttings = props=> {
  const [newDate, setNewDate] = useState(undefined)
  const [newPassW, setNewPassW]= useState(undefined)

  const inputDate = (
    <InputText
      inputType="date"
      label="Ubah tanggal sesi ini"
      onChange={setNewDate} />
  )
  const inputPassW = (
    <InputText
      inputType="password"
      label="masukkan sandi baru:"
      onChange={setNewPassW} />
	)
	
	const textLogOut = <label>Logout dan Lupakan</label>

  const onChangeDate = ()=> {
		const dateObj = new Date(newDate)
		props.onDateChange(dateObj)
    props.onInfoPop('Tanggal berhasil diganti.')
  }

  const onChangePassW = ()=> {
    changePassW(newPassW, ()=> {
      props.onInfoPop('Password berhasil diubah.')
    })
  }

  const onLogOut = ()=> {
    props.onHide()
    logOut()
    removeAccount()
  }

  return (
    <section className={props.isHidden ? "hidden" : "view nogroup"}>
			<header className="header">Pengaturan</header>
      <div className="settContainer">
        <SettMenu
          title="Ubah Tanggal"
          ID="settDate"
          children={inputDate}
          btnText="Ubah"
          onButtonClick={onChangeDate} />
        <SettMenu
          title="Ubah Sandi" 
          ID="settPassW"
          children={inputPassW}
          btnText="Ubah"
          onButtonClick={onChangePassW} />
        <SettMenu
          title="Log Out"
          ID="settLogout"
          children={textLogOut}
          btnText="Log Out"
          onButtonClick={onLogOut} />
      </div>
      <footer className="control ctrla">
				<BackButton
					onClick={props.onHide}/>
				<Spacer />
      </footer>
    </section>
  )
}

export default ViewSetttings