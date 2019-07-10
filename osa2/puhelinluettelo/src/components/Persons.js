import React from 'react'

const Persons = ({ persons, newFilter, deletePerson}) => {

	return (
		<div>
			{
				persons
					.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
					.map(person => <p key={person.name}>{person.name} {person.number}<button onClick={deletePerson(person)}>delete</button></p>)
			}
		</div>
	)
}

export default Persons
