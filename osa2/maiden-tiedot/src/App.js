import React, { useState, useEffect } from 'react'
import axios from 'axios'


const generateWeatherContent = (weatherData) => {
	const { current, location } = weatherData
	const { condition } = current
	return(
		<div>
			<h3>Weather in {location.name}</h3>
			<p><b>temperature: </b>{current.temp_c} Celsius</p>
			<img src={condition.icon} alt={condition.text} />
			<p><b>wind: </b>{current.wind_kph} kph direction {current.wind_dir}</p>
		</div>
	)
}

const Weather = ({ city }) => {
	const [ content, setContent ] = useState('')

	useEffect(() => {
		axios
			.get(`https://api.apixu.com/v1/current.json?key=bae4c5ecfd754a379c1125734190907&q=${city}`)
			.then(response => {
				const weatherData = response.data
				setContent(generateWeatherContent(weatherData))
			})
	}, [city])

	return(
		<div>
			{content}
		</div>
	)
}

const FullCountry = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h3>languages</h3>
			<ul>
				{country.languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>
			<img src={country.flag} alt={`Flag of ${country.name}`} height='100'/>
			<Weather city={country.capital} />
		</div>
	)
}

const Countries = ({ countries, search }) => {
	const [ selected, setSelected] = useState('')

	const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
	const countryCount = filteredCountries.length

	const handleSelectedChange = (countryName) => () => {
		setSelected(countryName)
	}

	if (selected !== '') {
		const country = countries.find(country => country.name === selected)

		return(
			<FullCountry country={country} />
		)
	} else if (countryCount > 10) {
		return(
			<div>
				Too many matches, specify another filter
			</div>
		)
	} else if (countryCount === 1) {
		const country = filteredCountries[0]
		return(
			<FullCountry country={country} />
		)
	} else {
		return(
			<div>
				{
					filteredCountries.map(country => {
						return(
							<div key={country.name}>
								{country.name}
								<button
									onClick={handleSelectedChange(country.name)}
								>
									show
								</button>
							</div>
						)
					})
				}
			</div>
		)
	}
}

const App = () => {
	const [countries, setCountries] =  useState([])
	const [newSearch, setNewSearch] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => setCountries(response.data))
	}, [])

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value)
	}

	return(
		<div>
			find countries
			<input
				value={newSearch}
				onChange={handleSearchChange}
			/>
			<Countries countries={countries} search={newSearch} />
		</div>
	)

}

export default App;
