import {Link} from "react-router-dom";
import {CountryContext} from "../App.jsx";
import {useContext} from "react";

export const Country = ({country}) => {
    const {favourite, addFavourite, removeFavourite} = useContext(CountryContext)
    return (
        <div className={"country"} key={country.flag}>
            <Link to={`/countriesapp/country/${country.name.common}`}>
                <img className={"img"} src={country.flags.png}/>
            </Link>
            <div className={"fav"}>
                <Link to={`/countriesapp/country/${country.name.common}`}>
                    <p>{country.name.common}</p>
                </Link>
            </div>
            {favourite.some(
                (favCountry) => favCountry.name.common === country.name.common
            ) ? (
                <span className={"btn-favorite"} onClick={() => removeFavourite(country)}>❤️</span>
            ) : (
                <span className={"btn-favorite"} onClick={() => addFavourite(country)}>🩶</span>
            )}
        </div>
    )
}
