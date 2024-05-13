import {useModify} from "../hooks/useModify.js";
import {useState} from "react";

const CountryAdmin = ({country, countries, setCountries}) => {
    const {fetchData} = useModify()
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(country.name);
    const [capital, setCapital] = useState(country.capital);
    const [continent, setContinent] = useState(country.continent);
    const [population, setPopulation] = useState(country.population);
    const [language, setLanguage] = useState(country.language);
    const [image, setImage] = useState(country.image);

    const deleteCountry = () => {
        fetchData({url: `http://localhost:8080/country/${country.id}`, method: "DELETE"})
        const updatedCountries = countries.filter(c => c.id !== country.id)
        setCountries(updatedCountries)
        console.log(updatedCountries)
        localStorage.setItem("countries", JSON.stringify(updatedCountries))
    }

    const updateCountry = () => {
        const newCountry = {
            name: name,
            capital: capital,
            continent: continent,
            population: population,
            language: language,
            image: image
        }
        fetchData({url: `http://localhost:8080/country/${country.id}`, method: "PUT", body: newCountry})
        const index = countries.findIndex(c => c.id === country.id)
        countries[index] = newCountry
        setCountries(countries)
        console.log(countries)
        localStorage.setItem("countries", JSON.stringify(countries))
    }

    return (
        <div className={"country-admin"} key={country.id}>
            {isUpdating ? <input className={"img"} type={"text"} value={image} onChange={(e) => setImage(e.target.value)}/>:
            <img className={"img"} src={country.image} align={name}/>}
            <div className={"single-country-information"}>
                <div className={"single-country-admin"}>
                    <p>Name: </p>
                    <span>{isUpdating ? <input type={"text"} value={name} onChange={(e) => setName(e.target.value)}/> :
                        <b>{name}</b>}</span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Capital: </p>
                    <span>{isUpdating ?
                        <input type={"text"} value={capital} onChange={(e) => setCapital(e.target.value)}/> :
                        <b>{capital}</b>}</span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Region: </p>
                    <span>{isUpdating ?
                        <input type={"text"} value={continent} onChange={(e) => setContinent(e.target.value)}/> :
                        <b>{continent}</b>}</span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Population: </p>
                    <span>{isUpdating ?
                        <input type={"text"} value={population} onChange={(e) => setPopulation(e.target.value)}/> :
                        <b>{population}</b>}</span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Native Language: </p>
                    <span>{isUpdating ?
                        <input type={"text"} value={language} onChange={(e) => setLanguage(e.target.value)}/> :
                        <b>{language}</b>}</span>
                </div>
            </div>
            <div className={"btns"}>
                {isUpdating ? <button className={'btn-admin'} onClick={() => {
                        setIsUpdating(false)
                        updateCountry()
                    }}>Confirm</button>
                    : <button className={'btn-admin'} onClick={() => setIsUpdating(true)}>Update</button>}
                {isUpdating && <button className={'btn-admin'} onClick={() => setIsUpdating(false)}>X</button>}
                <button className={'btn-admin'} onClick={deleteCountry}>Delete</button>
            </div>
        </div>
    )
};

export default CountryAdmin;
