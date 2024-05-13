import {useContext} from "react";
import {Link} from "react-router-dom";
import {CountryContext} from "./context/countryContextComp.jsx";

export const Favorite = ({setShow}) => {
    const {favourite, removeFavourite} = useContext(CountryContext);
    return (
        <div className={"favourite-container"}>
            <h2 className={"favourite-name"}>Favorite</h2>
            <div className={"favourite"}>
                {favourite.map(country => (
                    <div className={"country"} key={country.id}>
                        <Link to={`/country/${country.id}`} onClick={() => setShow(false)}>
                            <img className={"img"} src={country.image}/>
                        </Link>
                        <div className={"fav"}>
                            <Link to={`/country/${country.id}`}  onClick={() => setShow(false)}>
                                <p>{country.name}</p>
                            </Link>
                            <span className={"btn-favorite"} onClick={() => removeFavourite(country)}><span className={"btn-favorite"} onClick={() => removeFavourite(country)}><svg className={"feather" +
                                " feather-heart icon-1"}
                                                                                                                                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                                     viewBox="0 0 24 24"
                                                                                                                                                                                     fill="none"
                                                                                                                                                                                     stroke="currentColor"
                                                                                                                                                                                     strokeWidth="2"
                                                                                                                                                                                     strokeLinecap="round"
                                                                                                                                                                                     strokeLinejoin="round"
                            ><path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span></span>
                        </div>
                    </div>
                )).reverse()}
            </div>
        </div>
    )
}
