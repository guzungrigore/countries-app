import {useCallback, useContext, useState} from "react";
import {Link} from "react-router-dom";
import HeartIconSearch from "./HeartIconSearch.jsx";
import HeartIconFilled from "./HeartIconFilled.jsx";
import {CountryContext} from "./context/countryContextComp.jsx";

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
                            <span className={"btn-favorite"} onClick={() => removeFavourite(country)}><HeartIconSearch/></span>
                        ) : (
                            <span className={"btn-favorite"} onClick={() => addFavourite(country)}><HeartIconFilled/></span>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
