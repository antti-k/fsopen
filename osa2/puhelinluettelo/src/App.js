import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ newFilter, setNewFilter ] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => setPersons(response.data))
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		if (persons.some(person => person.name === newName)) {
			window.alert(`${newName} is already added to phonebook`)
		} else {
			const personObject = {
				name: newName,
				number: newNumber
			}
			setPersons([...persons, personObject])
			setNewName('')
			setNewNumber('')
		}
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}



  return (
    <div>
      <h2>Phonebook</h2>

			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

			<h3>Add a new</h3>

			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>

      <h3>Numbers</h3>

			<Persons persons={persons} newFilter={newFilter} />
    </div>
  )

}

export default App
