import React from 'react'

export const InputText = props=> {
	const textPattern = '[A-Za-z]+[A-Za-z0-9_]+'

	return (
		<div className={props.boxClass}>
			<label className="label" htmlFor={props.ID}>
				{props.label}
			</label>
			<input
				type={props.inputType}
				className="input"
				id={props.ID}
				pattern={!props.inputType ? textPattern : undefined}
				title={props.inputType || 'alfa-numerik dan garis-bawah'}
				value={props.value}
				placeholder={props.preText}
				onChange={e=> props.onChange(e.target.value)}
				disabled={props.off} />
		</div>
	)
}

export const InputSelect = props=> {
	const listData = props.data.map(item=>
		<option key={item} value={item}> {item} </option>
	)

	const placeholder = (
		<option key="ph" value="nul" disabled> {props.preText} </option>
	)

	return (
		<div className={props.boxClass} style={{display: 'inline-block'}}>
			<label className="label" htmlFor={props.ID}>
				{props.label}
			</label>
			<select type="text"
				className="input"
				id={props.ID}
				value={props.value}
				onChange={e=> props.onChange(e.target.value)}
				disabled={props.off} >
				{placeholder}
				{listData}
			</select>
		</div>
	)
}

export const InputFile = props=> {
	const fStyle = {
		position: 'absolute',
		height: 0,
		width: 0,
		overflow: 'hidden'
	}
	const lStyle = {
		display: 'inline-block',
		textAlign: 'center'
	}
	const lStyleOff = {
		...lStyle,
		pointerEvents: 'none',
		color: 'gray',
		background: '#e76f51'
	}

	return (
		<label className={props.btnClass}
			htmlFor={props.ID}
			style={props.off ? lStyleOff : lStyle}>

			{props.label}
			<input type="file"
				id={props.ID}
				accept={props.accept}
				style={fStyle}
				onChange={e=> props.onChange(e.target.files)} />

		</label>
	)
}

export const CheckBox = props=> {
	return (
		<label>
			<input type="checkbox"
				value={props.value}
				onChange={props.onChange} />
			<span className="small"> {props.label} </span>
		</label>
	)
}

export const BackButton = props=> {
	const label = '\u00ab Kembali ke Menu'
	return (
		<button	className={props.btnClass || 'back fl'}
			onClick={()=> props.onClick()}
			disabled={props.off}>

			{props.label ? props.label : label}

		</button>
	)
}

export const NextButton = props=> {
	return (
		<button	className={props.btnClass || 'btnAdd fl'}
			style={{position: 'relative'}}
			onClick={props.onClick}
			disabled={props.off}>

			<div className="next">&#x27C0;</div>

		</button>
	)
}

export const Button = props=> {
	return (
		<button	className={props.btnClass}
			onClick={props.onClick}
			disabled={props.off}>
			{props.label}
		</button>
	)
}

export const Spacer = ()=> <span className="opaque">i'm invisible</span>

export const MenuButton = props=> {
	return (
		<button className={'menu '+(props.colorClass)}
			onClick={props.onClick}>

			{props.label}

		</button>
	)
}

export const Image = props=> {
	return (
		<div className={props.boxClass}>
			<img
				src={props.src}
				alt={props.alt ? props.alt : ''}
				className={props.imgClass} />
		</div>
	)
}

export const Watermark = ({boxClass})=> {
	return (
		<img
			src="./img/watermark.svg"
			alt="watermark"
			className={`watermark ${boxClass}`} />
	)
}

export const SettMenu = props=> {
	return (
		<article className="settMenu" id={props.ID}>
			<header className="label">
				<b> {props.title} </b>
			</header>
				{props.children}
			<Button
				btnClass="sButton fr"
				label={props.btnText}
				onClick={props.onButtonClick} />
			<a href={'#' + props.ID} className="hollowButton">
				I am Invisible
			</a>
		</article>
	)
}