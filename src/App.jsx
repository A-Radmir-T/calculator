import styles from './App.module.css'
import { useEffect, useState } from 'react'

export const App = () => {
	const [calculated, setCalculated] = useState(false)
	const buttons = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', 'C', '-', '+', '=']
	const [display, setDisplay] = useState(['0'])

	const isOperator = (btn) => {
		return ['C', '-', '+', '='].includes(btn)
	}

	useEffect(() => {
		document.onkeydown = (event) => {
			event.preventDefault()
			const { key } = event
			if (key === 'Enter') {
				handleButtons('=')
			}
			if (buttons.includes(key)) {
				handleButtons(key.toString())
			}
		}
	}, [display])

	const handleButtons = (btn) => {
		if (display.length === 1 && display.at(0) === '0' && btn === '0') return
		if (display.length <= 2 && btn === '=') return
		if (btn.toLowerCase() === 'c') {
			setDisplay(['0'])
			setCalculated(false)
			return
		}
		if (calculated && !isOperator(btn)) {
			setCalculated(false)
			setDisplay([btn])
			return
		}
		setCalculated(false)
		if (btn === '=' || (display.length === 3 && isOperator(btn))) {
			const value =
				display.at(1) === '+'
					? Number(display.at(0)) + Number(display.at(2))
					: Number(display.at(0)) - Number(display.at(2))

			setDisplay([String(value)])
			setCalculated(true)
			return
		}
		if (isOperator(btn) && btn !== '=') {
			setDisplay((prev) => [display.at(0), btn])
			return
		}
		if (display.length === 1 && display.at(0) === '0') {
			setDisplay([btn])
			return
		}
		if (display.length === 3 && !isOperator(btn)) {
			setDisplay((prev) => [display.at(0), display.at(1), display.at(2) + btn])
			return
		}
		if (display.length === 2 && !isOperator(btn)) {
			setDisplay((prev) => [...prev, btn])
			return
		}
		setDisplay([display.at(0) + btn])
	}

	return (
		<>
			<div className={styles.calculator}>
				<header>
					<div className={styles.container}>
						<div className={styles.display}>
							<p className={calculated ? styles.changeColor : ''}>{display}</p>
						</div>
					</div>
				</header>

				<div className={styles.buttons}>
					<ul className={styles.numbers}>
						{buttons.map(
							(btn) =>
								!isOperator(btn) && (
									<li key={btn}>
										<button onClick={() => handleButtons(btn)} type="button">
											{btn}
										</button>
									</li>
								),
						)}
					</ul>

					<ul>
						{buttons.slice(10).map(
							(btn) =>
								isOperator(btn) && (
									<li key={btn}>
										<button onClick={() => handleButtons(btn)}>{btn}</button>
									</li>
								),
						)}
					</ul>
				</div>
			</div>
		</>
	)
}
