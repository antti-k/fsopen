import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const SuccessNotification = ({ message }) => {
	const style = {
		color: 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '20px'
	}

	if (message === null) {
		return null
	}
	return (
		<div style={style}>
			{message}
		</div>
	)
}

const ErrorNotification  = ({ message }) => {
	const style = {
		color: 'red',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '20px'
	}

	if (message === null) {
		return null
	}
	return (
		<div style={style}>
			{message}
		</div>
	)
}

const App = () => {
	const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ newFilter, setNewFilter ] = useState('')
	const [ successMessage, setSuccessMessage ] = useState(null)
	const [ errorMessage, setErrorMessage ] = useState(null)

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const notify = (message) => {
		setSuccessMessage(message)
		setTimeout(() => {
			setSuccessMessage(null)
		}, 3000)
	}

	const errorNotify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

	const addPerson = (event) => {
		event.preventDefault()
		if (persons.some(person => person.name === newName)) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new on?`)) {
				const personObject = {
					name: newName,
					number: newNumber
				}
				const currentPerson = persons.find(person => person.name === newName)
				const { id } = currentPerson
				personService
					.update(id, personObject)
					.then(returnedPerson => {
						setPersons([...persons.filter(person => person.id !== id), returnedPerson])
						setNewName('')
						setNewNumber('')
						notify(`Updated number of ${newName}`)
					})
					.catch(error => errorNotify(`Information of ${currentPerson.name} has already been removed from server`))
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber
			}
			personService
				.add(personObject)
				.then(returnedPerson => {
					setPersons([...persons, returnedPerson])
					setNewName('')
					setNewNumber('')
					notify(`Added ${newName}`)
				})
		}
	}

	const deletePerson = (personToDelete) => () => {
		if (window.confirm(`Delete ${personToDelete.name}?`)) {
			personService
				.remove(personToDelete.id)
				.then(_ => {
					setPersons(persons.filter(person => person.id !== personToDelete.id))
					notify(`Deleted ${personToDelete.name}`)
				})
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

			<SuccessNotification message={successMessage} />
			<ErrorNotification message={errorMessage} />

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

			<Persons
				persons={persons}
				newFilter={newFilter}
				deletePerson={deletePerson}
			/>
    </div>
  )

}

export default App
