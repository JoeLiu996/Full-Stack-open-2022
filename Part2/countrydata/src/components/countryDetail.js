import React from 'react'

const Detail = ({country}) => {
    const languages = country.languages
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital}
                <br></br>
                area {country.area}
            </p>
            <h3>languages:</h3>
            <ul>
                {Object.values(languages).map(language => (
                <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="No flag found" height="250" width="350" />
        </div>
    )
}

export default Detail