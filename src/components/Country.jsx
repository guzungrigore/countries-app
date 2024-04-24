import {Link} from "react-router-dom";

export const Country = ({country}) => {
    return (
        <div className={"country"} key={country.flag}>
            <Link to={`/country/${country.name.common}`}>
                <img className={"img"} src={country.flags.png}/>
            </Link>

            <div className={"fav"}>
                <Link to={`/country/${country.name.common}`}>
                    <p>{country.name.common}</p>
                </Link>
            </div>
        </div>
    )
}
