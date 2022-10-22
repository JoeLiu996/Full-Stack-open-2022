import React from 'react'
import Detail from './countryDetail';


const Countries = ({showedCountries, setShowedCountries}) => {

    if(showedCountries.length > 10) {
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if(showedCountries.length === 1) {
        return(
            <div>
                <Detail country={showedCountries[0]} />
            </div>
        )
    }

    return showedCountries.map((country) => (
        <div key={country.name.official} >
            {country.name.common}
            {" "}
            <button onClick={() => setShowedCountries([country])} >show</button>
        </div>
    ))
    }
export default Countries