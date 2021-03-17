import React, { useState, useEffect } from 'react'
import { getGroups, getMemberz, getAttends } from '../helper/firebasehelper'
import { InputSelect, BackButton, Button } from './components'

const ViewAttends = props=> {
	const [groups, fillGroups] = useState([]),
		[groupID, setGroupID] = useState('nul'),
		[members, fillMembers] = useState([]),
		[data, setData] = useState(undefined)

	useEffect(()=> {
		if (props.isHidden) {
			getGroups(fillGroups)
			setGroupID('nul')
			setData(undefined)
			fillMembers([])
		}
	}, [props.isHidden])

	const onGroupSelected = async(e)=> {
		setGroupID(e)
		getAttends(e, setData)
		getMemberz(e, fillMembers)
	}

	return (
		<section className={props.isHidden?"hidden":"view onebtn"}>
			<header className="header">Data Kehadiran</header>
			<div className="g inpbox">
				<InputSelect
					boxClass="f"
					label="Grup:"
					preText="-Pilih Grup-"
					data={groups}
					value={groupID}
					onChange={onGroupSelected} />
			</div>
			<TableA ID="thisTable"
				data={data} members={members} />
			<footer className="control ctrla">
				<BackButton onClick={props.onHide} />
				<Button label="UNDUH" off />
			</footer>
		</section>
	)
}

const monthName = [
	'Januari', 'Februari', 'Maret', 'April', 'Mei','Juni', 'Juli',
	'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'
]

const TableA = props=> {
	const [tableHead, setTableHead] = useState(undefined)
	const [tableBody, setTableBody] = useState(undefined)

	const drawTable = (data, members)=> {
		let fDates
		try {
			fDates = Object.keys(data).sort()	// sort dates as keys
		} 
		catch(er) {
			setTableHead(
				<tr key="dataIs"><th>Data is</th></tr>
			)
			setTableBody(
				<tr key="empty"><th>Empty</th></tr>
			)
			return
		}
		const months = [], days = []
		fDates.forEach(dt=> {               // divide dates to months and days
			const splitDate = dt.split('-')
			months.push(splitDate[1])
			days.push(splitDate[2])
		})
		let monthSet = new Set(months)       // distinct months
		monthSet = Array.from(monthSet)
		setTableHead (
			<>
				<tr key="monthead">
					<th rowSpan={2} className="tHName">Nama</th>
					{
						monthSet.map((month, i)=> {
							const count = months.filter(m=> m===month).length
							return (
								<th key={i} colSpan={count} className="tMonth">
									{monthName[month-1]}
								</th>
							)
						})
					}
				</tr>
				<tr key="dayhead">
					{ days.map((day, i)=> <th key={i} className="tDate">{day}</th>) }
				</tr>
			</>
		)
		setTableBody (
			members.map(mbr=> {
				return (
					<tr key={mbr}>
						<th className="tName">{mbr}</th>
						{
							fDates.map((dt, j)=> {
								return data[dt][mbr] ? (<th key={j}>✔</th>) : (<th>-</th>)
							})
						}
					</tr>
				)
			})
		)
	}

	useEffect(()=> {
		drawTable(props.data, props.members)
	}, [props.data, props.members])

	return (
		<div className="boxTable">
			<table id={props.ID} className="table">
				<thead>
					{tableHead}
				</thead>
				<tbody>
					{tableBody}
				</tbody>
			</table>
		</div>
	)
}

export default ViewAttends