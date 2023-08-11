import styles from './App.module.css'
import { useEffect, useState } from 'react'

export const App = () => {
	const [calculated, setCalculated] = useState(false)
	const calculatorNumbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
	const calculatorOperators = ['C', '-', '+', '=']
	const [display, setDisplay] = useState(['0'])

	useEffect(() => {
		const buttons = [...calculatorNumbers, ...calculatorOperators, 'c']
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
		if (calculated && !calculatorOperators.includes(btn)) {
			setCalculated(false)
			setDisplay([btn])
			return
		}
		setCalculated(false)
		if (btn === '=' || (display.length === 3 && calculatorOperators.includes(btn))) {
			const value =
				display.at(1) === '+'
					? Number(display.at(0)) + Number(display.at(2))
					: Number(display.at(0)) - Number(display.at(2))

			setDisplay([String(value)])
			setCalculated(true)
			return
		}
		if (calculatorOperators.includes(btn) && btn !== '=') {
			setDisplay((prev) => [display.at(0), btn])
			return
		}
		if (display.length === 1 && display.at(0) === '0') {
			setDisplay([btn])
			return
		}
		if (display.length === 3 && calculatorNumbers.includes(btn)) {
			setDisplay((prev) => [display.at(0), display.at(1), display.at(2) + btn])
			return
		}
		if (display.length === 2 && calculatorNumbers.includes(btn)) {
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
						{calculatorNumbers.map((btn) => (
							<li key={btn}>
								<button onClick={() => handleButtons(btn)} type="button">
									{btn}
								</button>
							</li>
						))}
					</ul>

					<ul>
						{calculatorOperators.map((btn) => (
							<li key={btn}>
								<button onClick={() => handleButtons(btn)}>{btn}</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}
