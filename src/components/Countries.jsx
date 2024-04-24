import {useContext} from "react";
import {CountryContext} from "../App.jsx";
import {Country} from "./Country.jsx";

export const Countries = () => {
    const { countries, errorMessage} = useContext(CountryContext)
    return (
        <div>
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            <div className={"countries"}>
                {countries && countries.map(country => (
                    <Country country={country} key={country.flag}/>
                ))}
            </div>
        </div>
    )
}