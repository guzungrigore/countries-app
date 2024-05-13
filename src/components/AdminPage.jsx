import {useEffect, useState} from "react";
import CountryAdmin from "./CountryAdmin.jsx";
import {useCountries} from "../hooks/useCountries.js";
import NewCountryComponent from "./newCountryComponent.jsx";

const AdminPage = () => {
    const {countries: countriesData, errorMessage} = useCountries("http://localhost:8080/country?page=1&size=30")

    useEffect(() => {
        if (countriesData && countriesData.content) {
            localStorage.setItem("countries", JSON.stringify(countriesData.content))
        }

    }, [countriesData])

    const [countries, setCountries] = useState(JSON.parse(localStorage.getItem("countries")) || [])

    return (
        <div>
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            <div className={"countries"}>
            <NewCountryComponent countries={countries} setCountries={setCountries}/>
                {countries && countries.map(country => (
                    <CountryAdmin country={country} key={country.name} countries={countries} setCountries={setCountries}/>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
