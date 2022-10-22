import React from 'react'
import Person from './person'

const Persons = ({persons, search, deletePerson}) => {
    const showedPerson = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    return(
      showedPerson.map((person) => (
        <div key={person.id}>
          <Person person={person} /> 
          {" "}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </div>
      ))
    )
}

export default Persons