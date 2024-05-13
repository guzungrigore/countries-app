import {useEffect, useState} from 'react';
import {useModify} from "../hooks/useModify.js";

const NewCountryComponent = () => {
    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [continent, setContinent] = useState("");
    const [population, setPopulation] = useState("");
    const [language, setLanguage] = useState("");
    const [image, setImage] = useState("");
    const {fetchData, message} = useModify()

    const updateCountry = () => {
        const newCountry = {
            name: name,
            capital: capital,
            continent: continent,
            population: population,
            language: language,
            image: image
        }

        fetchData({url: `http://localhost:8080/country`, method: "POST", body: newCountry})
        setName('')
        setCapital('')
        setImage('')
        setPopulation('')
        setContinent('')
        setLanguage('')
        console.log(message)
    }
    // useEffect(() => {
    //     console.log(message.message)
    // }, [message]);
    return (
        <div className={"country-admin"}>
            {message?.message !== null ? <div>{message?.message}</div> :<div>Add a country</div>}
            {message?.title !== null ? <div>{message?.title}</div> :<div>Add a country</div>}
                <input className={"img"} type={"text"} value={image} onChange={(e) => setImage(e.target.value)} placeholder={"Enter image link"}/>
            <div className={"single-country-information"}>
                <div className={"single-country-admin"}>
                    <p>Name: </p>
                    <span><input type={"text"} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Enter country name"}/></span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Capital: </p>
                    <span><input type={"text"} value={capital} onChange={(e) => setCapital(e.target.value)} placeholder={"Enter country capital"}/></span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Region: </p>
                    <span><input type={"text"} value={continent} onChange={(e) => setContinent(e.target.value)} placeholder={"Enter country continent"}/></span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Population: </p>
                    <span><input type={"text"} value={population} onChange={(e) => setPopulation(e.target.value)} placeholder={"Enter country population"}/></span>
                </div>
                <div className={"single-country-admin"}>
                    <p>Native Language: </p>
                    <span><input type={"text"} value={language} onChange={(e) => setLanguage(e.target.value)} placeholder={"Enter country language"}/></span>
                </div>
            </div>
            <div className={"btns"}>
                <button className={'btn-admin'} onClick={() => {
                        updateCountry()
                    }}>Confirm</button>
                 <button className={'btn-admin'}>X</button>
            </div>
        </div>
    );
};

export default NewCountryComponent;
