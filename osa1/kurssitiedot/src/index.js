import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
	<h1>{props.name}</h1>
)

const Part = (props) => (
	<p>
		{props.name} {props.exercises}
	</p>
)

const Content = (props) => (
	<div>
		{props.parts.map(part => <Part name={part.name} exercises={part.exercises} />)}
		<Part part={props.part1} exercises={props.exercises1} />
		<Part part={props.part2} exercises={props.exercises2} />
		<Part part={props.part3} exercises={props.exercises3} />
	</div>
)

const Total = (props) => {
	const exercises = props.parts.map(part => part.exercises)
	const sum = exercises.reduce((a, b) => a + b, 0)
	return (
	<p>Number of exercises {sum}</p>
	)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
