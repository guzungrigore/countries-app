import {useContext} from "react";
import {Link} from "react-router-dom";
import {CountryContext} from "../App.jsx";

export const Favorite = ({setShow}) => {
    const {favourite, removeFavourite} = useContext(CountryContext)
    return (
        <div className={"favourite-container"}>
            <h2 className={"favourite-name"}>Favorite</h2>
            <div className={"favourite"}>
                {favourite.map(country => (
                    <div className={"country"} key={country.flag}>
                        <Link to={`/country/${country.name.common}`} onClick={() => setShow(false)}>
                            <img className={"img"} src={country.flags.png}/>
                        </Link>
                        <div className={"fav"}>
                            <Link to={`/country/${country.name.common}`}  onClick={() => setShow(false)}>
                                <p>{country.name.common}</p>
                            </Link>
                            <span className={"btn-favorite"} onClick={() => removeFavourite(country)}>❤️</span>
                        </div>
                    </div>
                )).reverse()}
            </div>
        </div>
    )
}
