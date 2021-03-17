import React, {useState, useEffect} from 'react'
import { InputSelect, InputFile, InputText, BackButton, NextButton, Button, Image} from './components'
import { getGroups, getMembers } from '../helper/firebasehelper'

const ViewFaceRef = props=> {
	const [groups, fillGroups] = useState([]),
		[groupID, setGroupID] = useState('nul'),
		[members, fillMembers] = useState([]),
		[memberID, setMemberID] = useState(''),
		[imgSource, setImage] = useState(undefined),
		[onModal, openModal] = useState(false),
		[modalOption, setOption] = useState('nul'),
		[btnSaveOff, setBtnSaveOff] = useState(true)

	useEffect(()=> {
		if (props.isHidden) {
			getGroups(fillGroups)
			setGroupID('nul')
			setMemberID('nul')
			setImage(undefined)
		}
	}, [props.isHidden])

	useEffect(()=> {
		setImage(undefined)
	}, [groupID])

	useEffect(()=> {
		if(imgSource) {
			setBtnSaveOff(false)
		}
	}, [imgSource])
	
	const updateMembers = (keys, obj)=> {
		if (keys) {
			keys = keys.map((key) => {
				return key + ' ' + (obj[key].descripted ? '✔' : '✖')
			})
		}
		fillMembers(keys)
	}

	const onGroupSelected = async(e)=> {
		setGroupID(e)
		getMembers(e, updateMembers)
	}

	const onFileChange = async(e)=> {
		const fileURL = URL.createObjectURL(e[0])
		setImage(fileURL)
	}

	const saveReferences = ()=> {
		props.onInfoPop('Data berhasil ditambahkan.')
		setBtnSaveOff(true)
	}

	const onOpenModal = e=> {
		openModal(true)
		setOption(e)
	}
	
	const addNewName = (e1,e2,e3)=> {
		if (e1!==e3) { fillGroups([...groups, e1]) }
		setGroupID(e1)
		fillMembers([...members, e2])
		setMemberID(e2)
		alert(e1,e2)
	}

	return (
		<>
			<section className={props.isHidden ? "hidden" : "view basic"}>
				<header className="header">Rekam Data Wajah</header>
				<div className="g ctrla">
					<InputSelect 
						boxClass="fr"
						label="Grup:"
						preText="-Pilih Grup-"
						data={groups}
						value={groupID}
						onChange={onGroupSelected} />
					<Button
						btnClass="btnAdd f"
						label="Baru"
						onClick={()=>onOpenModal('nul')} />
				</div>
				<Image
					src={imgSource}
					boxClass="content fc"
					imgClass="preview" />
				<footer className="control ctrla">
					<div className="f">
						<InputSelect
							label="Member"
							preText="-Pilih Member-"
							data={members}
							value={memberID}
							onChange={setMemberID}
							off={members.length===0} />
						<Button
							btnClass="btnAdd f"
							label="✚"
							off={groupID==='nul'}
							onClick={()=>onOpenModal(groupID)} />
					</div>
					<InputFile
						off={memberID==='nul'}
						label="📷/📂"
						btnClass="sButton f"
						onChange={onFileChange} />
					<BackButton
						off={false}
						onClick={props.onHide} />
					<Button
						btnClass="sButton f"
						off={btnSaveOff}
						label="Simpan"
						onClick={saveReferences} />
				</footer>
			</section>
			<ModalNew
				isHidden={!onModal}
				onHide={()=>openModal(false)}
				option={modalOption}
				onGroupAdd={addNewName} />
		</>
	)
}

const ModalNew = props=> {
  const [groupName, setGroup] = useState(''),
		[memberName, setMember] = useState(''),
		[txtLock, lockText] = useState(false)
	const option = props.option

	useEffect(()=> {
		if (props.isHidden) {
			setGroup('')
			setMember('')
			lockText(false)
			console.log('clear field')
		} else {
			option!=='nul' && setGroup(option)
		}
		// eslint-disable-next-line
	}, [props.isHidden])

  const onAddGroup = e=> {
		e.preventDefault()
		lockText(true)
  }

  const onAddMember = e=> {
		e.preventDefault()
		props.onGroupAdd(groupName, memberName, option)
    props.onHide() 
	}

  return (
    <section className={props.isHidden ? 'hidden' : 'abso g'}>
      <div className="view" style={{opacity: ".8"}}> </div>
      <div className="pop modal fc">  
        <h3 className="fc">
          Tambah Member Baru
        </h3>
        <form className="g inpbox" onSubmit={onAddGroup}>
          <InputText
            boxClass="f"
						label="Nama Grup:"
						off={option!=='nul' || txtLock}
						preText={props.option!=='nul' ? option : ''}
						value={groupName}
            onChange={setGroup} />
          <NextButton
						off={option!=='nul' || groupName==='' || txtLock} />
        </form>
        <form className="g inpbox" onSubmit={onAddMember}>
          <InputText
            boxClass="f"
						label="Nama Member:"
						off={option!=='nul' ? false : !txtLock}
						value={memberName}
            onChange={setMember} />
          <NextButton
						off={memberName===''} />
        </form>
        <BackButton
					btnClass="back fc"
					label="Batal"
					onClick={props.onHide} />
      </div>
    </section>
  )
}

export default ViewFaceRef