import React from 'react'

const Header = ({ name }) => (
	<h1>{name}</h1>
)

const Part = ({ name, exercises }) => (
	<p>
		{name} {exercises}
	</p>
)

const Content = ({parts}) => (
	<div>
		{parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
	</div>
)

const Total = ({ parts }) => {
	const exercises = parts.map(part => part.exercises)
	const sum = exercises.reduce((a, b) => a + b, 0)
	return (
		<p><b>total of {sum} exercises</b></p>
	)
}

const Course = ({ course }) => (
    <div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
    </div>
)

export default Course
