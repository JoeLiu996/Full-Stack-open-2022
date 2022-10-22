import { useState, useEffect } from 'react'

import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './service/person'
import Notification from './components/notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  //fetch person data from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPersons = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const flag = persons.find(person => person.name === personObject.name)
    if(flag) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const sameName = persons.filter(person => person.name === personObject.name)
        personService
          .update(sameName[0].id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setMessage(`Updated ${personObject.name}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setMessage(`Failed. Information of ${personObject.name} has already been removed from server`)
          })
      }
  }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${personObject.name}`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage(`Failed. Information of ${personObject.name} has already been removed from server`)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          const newPersons = persons.filter((person) => person.id !== id)
          setPersons(newPersons)
          setMessage(`Deleted ${name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} 
      addPersons={addPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
