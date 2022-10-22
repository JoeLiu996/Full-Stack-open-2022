import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/countries'

const App = () => {
    const [countries, setCoutries] = useState([])
    const [search, setSearch] = useState('')
    const [showedCountries, setShowedCountries] = useState([])

    useEffect(() =>{
        axios
            .get('http://localhost:3001/countries')
            .then(response => {
                setCoutries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        //need a new virable to update to the showedCountries part
        const query = event.target.value
        setSearch(query)
        setShowedCountries(
            countries.filter((country) => 
                                                        //compare to query which is newest search change
                country.name.common.toLowerCase().includes(query.toLowerCase()))
        )
    }

    
    return(
        <div>
            <Filter search={search} handleSearchChange={handleSearchChange} />
            <Countries showedCountries={showedCountries} setShowedCountries={setShowedCountries}/>
        </div>
    )
}

export default App