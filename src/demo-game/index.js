import React, { Fragment as div, useState, useEffect } from 'react'
import './game.css'

const Square = ({input, counter})=> {
	const [count, setCount] = useState(-2)
	const [outMotion, setMotion] = useState(undefined)
	
	const addOutMotion = ()=> {
		const motion = (
			input[1] === 'F' ? { animation: `${input[0]}-out .5s forwards` }
			: input[1] === 'L' ? { transform: `rotate(-180deg)` }
			: input[1] === 'R' ? { transform: `rotate(180deg)` }
			: undefined
		)
		setMotion(motion)
	}

	useEffect(()=> {
		input[1] !== '0' && count === -2 ? setCount(counter)
		: counter === count + 1 && addOutMotion()
		// eslint-disable-next-line
	}, [counter])

	return (
		<div className="square">
			<div className={
					input[1] === 'F' ? `${input[0]}${input[1]}`
					: input[1] === 'L' ? `rlt ${input[0]}${input[1]} turnL`
					: input[1] === 'R' ? `rlt ${input[0]}${input[1]} turnR`
					: undefined
				} style={outMotion}> </div>
		</div>
	)
}

const Board = ({input, onMsg})=> {
	const [count, setCount] = useState(0)
	const [pos, setPos] = useState([4, 4])
	const [face, setFace] = useState('n')
	const [inputMap, setMap] = useState([
		[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]
	])

	const arr = new Array(64).fill().map((_,i)=> i)
	const squares = arr.map(i=> {
		const [a, b] = [Math.floor(i/8), i%8]
		const inp = inputMap[a][b]
		return (
			<Square key={i} input={inp!==0 ? inp : [0, '0']} counter={count} />
		)
	})

	const getNextPos = (input)=> {
		const [a, b] = pos
		switch (face) {
			case 'n':
				return (
					input === 'F' ? [[a, b-1], 'n']
					: input === 'L' ? [[a-1, b], 'w']
					: input === 'R' ? [[a+1, b], 'e']
					: [pos, 'n']
				)
			case 'e':
				return (
					input === 'F' ? [[a+1, b], 'e']
					: input === 'L' ? [[a, b-1], 'n']
					: input === 'R' && [[a, b+1], 's']
				)
			case 's':
				return (
					input === 'F' ? [[a, b+1], 's']
					: input === 'L' ? [[a+1, b], 'e']
					: input === 'R' && [[a-1, b], 'w']
				)
			case 'w':
				return (
					input === 'F' ? [[a-1, b], 'w']
					: input === 'L' ? [[a, b+1], 's']
					: input === 'R' && [[a, b-1], 'n']
				)
			default:
				return [pos, 'n']
		}
	}

	const updateMap = fInput=> {
		try {
			setMap([
				...inputMap.slice(0, pos[1]),
				[
					...inputMap[pos[1]].slice(0, pos[0]),
					fInput,
					...inputMap[pos[1]].slice(pos[0]+1)
				],
				...inputMap.slice(pos[1]+1)
			])
		} catch {
			inputMap[pos[1]][pos[0]] = fInput
		}
	}

	const addSquare = fInput=> {
		inputMap[pos[1]] = []
		inputMap[pos[1]][pos[0]] = fInput
	}

	const onCrashed = ()=> {
		pos.values === [4, 4].values && face === 'n'
		? onMsg('CONGRATULATION !!! You Win!')
		: onMsg("GAME OVER ! You've Crahed")
	}

	useEffect(()=> {
		const [dir] = input.slice(-1)
		const fInput = [face, dir]
		!inputMap[pos[1]] ? addSquare()
		: !inputMap[pos[1]][pos[0]] || input.length === 2
		? inputMap[pos[1]][pos[0]] = fInput	: onCrashed()
		const result = getNextPos(dir)
		setPos(result[0])
		setFace(result[1])
		setCount(input.length)
		// eslint-disable-next-line
	}, [input])

	return (
		<div className="board">
			{squares}
		</div>
	)
}

const InputPad = ({onInput})=> {
	const [keyOn, toggleKey] = useState(false)

	useEffect(()=> {
		if (keyOn) {
			document.body.onkeyup = function (e) {
				e.keyCode === 38 ? onInput('F')
				: e.keyCode === 37 ? onInput('L')
				: e.keyCode === 39 && onInput('R')
			}
		} else {
			document.body.onkeyup = undefined
		}
	}, )

	return (
		<div className="inputPad"
			onMouseEnter={()=> toggleKey(true)}
			onMouseLeave={()=> toggleKey(false)}>
			<h4>Place Your Pointer Here!</h4>
		</div>
	)
}

const Info = ()=> {
	return (
		<div className="gameInfo">
			<b>Try Connect Snake's Head to its tail.
				You still able to go out of Boundary-Box in Blind Spot.
				Game Over when you crash to Body.</b>
		</div>
	)
}

const Alert = ({msg})=> {
	return (
		<div className="alertLayer"
			style={!msg ? {transform: 'scale(0)'} : undefined}>
			
			<div>{msg}</div>
			<div>Refresh to Restart</div>

		</div>
	)
}

const Game = ()=> {
	const [input, setInput] = useState(['0'])
	const [msg, setMsg] = useState(undefined)

	return (
		<div className="main">
			<Board input={input} onMsg={e=> setMsg(e)} />
			<InputPad onInput={e=> setInput([...input, e])} />
			<Info />
			<Alert msg={msg} />
		</div>
	)
}

export default Game