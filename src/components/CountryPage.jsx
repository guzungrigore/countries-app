import {Link, useParams} from "react-router-dom";
import {useCountries} from "../hooks/useCountries.js";
import {useContext} from "react";
import {CountryContext} from "./context/countryContextComp.jsx";

export const CountryPage = () => {
    const {id} = useParams()
    const {isLoading, countries, errorMessage} = useCountries(`http://localhost:8080/country/${id}`);
    const {favourite, addFavourite, removeFavourite} = useContext(CountryContext);

    return (
        <div>
            <div>{isLoading && <p>Is loading...</p>}</div>
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            {countries && (
                <div className={"single-country"}>
                    <div className={"single-country-nav"}>
                        <Link to={"/countriesapp/"} className={'back'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="feather feather-arrow-left icon">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        </Link>
                        {favourite.some(
                            (favCountry) => favCountry.name === countries.name
                        ) ? (
                            <span className={"btn-favorite"} onClick={() => removeFavourite(countries)}><svg className={"feather" +
                                " feather-heart icon-1"}
                                                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                                                           viewBox="0 0 24 24"
                                                                                                           fill="none"
                                                                                                           stroke="currentColor"
                                                                                                           strokeWidth="2"
                                                                                                           strokeLinecap="round"
                                                                                                           strokeLinejoin="round"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                        ) : (
                            <span className={"btn-favorite"} onClick={() => addFavourite(countries)}><svg className={"feather" +
                                " feather-heart icon-2"}
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        fill="none"
                                                                                                        stroke="currentColor"
                                                                                                        strokeWidth="2"
                                                                                                        strokeLinecap="round"
                                                                                                        strokeLinejoin="round"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                        )}
                    </div>
                    <h1 className={"single-country-name"}>{countries.name}</h1>
                    <div className={"single-country-information"}>
                        <div className={"single-country-info"}>
                            <p>Capital: </p>
                            <h3>{countries.capital}</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Region: </p>
                            <h3>{countries.continent}</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Population: </p>
                            <h3>{countries.population} People</h3>
                        </div>
                        <div className={"single-country-info"}>
                            <p>Native Language: </p>
                            <h3>{countries.language}</h3>
                        </div>
                    </div>
                    <img className={"img"} src={countries.image}/>
                </div>
            )
            }
        </div>
    )
}
