import {useCallback, useContext, useState} from "react";
import {CountryContext} from "../App.jsx";
import {Link} from "react-router-dom";

export const SearchCountries = () => {
    const [search, setSearch] = useState('');
    let [country, setCountry] = useState(null).slice(' ')
    const {isLoading, countries, errorMessage} = useContext(CountryContext)

    function searchCountry(search) {
        const filteredCountry = countries.find(country => {
            const name = country.name.common.toLowerCase();
            return name.includes(search.toLowerCase());
        });
        setCountry(filteredCountry)
    }

    const handleSearch = useCallback((e) =>{
        e.preventDefault()
        if (search.length > 0) {
            searchCountry(search)
            setSearch('')

        }
    },[search])

    const {favourite, addFavourite, removeFavourite} = useContext(CountryContext)
    const handleClose = () => {
        setCountry(null)
    }
    return (
        <div>
            <form className={"search"} onSubmit={handleSearch}>
                <input className={"input"} type={"search"} value={search} onChange={e => setSearch(e.target.value)}
                       placeholder={"Search country..."}/>

                {!country ? <button>Search</button> :
                    <>
                        <button>Search</button>
                        <button onClick={handleClose}>Close</button>
                    </>}

            </form>
            <div>{isLoading && <p>Is loading...</p>}</div>
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            {country &&
                <div className={"searched-country"}>
                    <Link to={`/countriesapp/country/${country.name.common}`}>
                        <img className={"searched-country-img"} src={country.flags.png}/>
                    </Link>
                    <div className={"fav"}>
                        <Link to={`/countriesapp/country/${country.name.common}`}>
                            <h2 className={"searched-country-name"}>{country.name.common}</h2>
                        </Link>
                        {favourite.some(
                            (favCountry) => favCountry.name.common === country.name.common
                        ) ? (
                            <span className={"btn-favorite"} onClick={() => removeFavourite(country)}><svg className={"feather" +
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
                            <span className={"btn-favorite"} onClick={() => addFavourite(country)}><svg className={"feather" +
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
                </div>
            }
        </div>
    )
}