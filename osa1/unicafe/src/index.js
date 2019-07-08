import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Statistic = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)

const Statistics = ({good, bad, neutral}) => {
	if (good + bad + neutral === 0) {
		return (
			<p>No feedback give</p>
		)
	} else {
		return (
			<table>
				<tbody>
					<Statistic text='good' value={good} />
					<Statistic text='neutral' value={neutral} />
					<Statistic text='bad' value={bad} />
					<Statistic text='all' value={good + neutral + bad} />
					<Statistic text='average' value={(good - bad) / (good + neutral + bad)} />
					<Statistic text='positive' value={`${good / (good + neutral + bad) * 100} %`} />
				</tbody>
			</table>
		)
	}
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

	const handleGoodClick = () => {
		setGood(good + 1)
	}

	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
	}

	const handleBadClick = () => {
		setBad(bad + 1)
	}

  return (
    <div>
			<h1>give feedback</h1>
			<Button handleClick={handleGoodClick} text='good' />
			<Button handleClick={handleNeutralClick} text='neutral' />
			<Button handleClick={handleBadClick} text='bad' />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
