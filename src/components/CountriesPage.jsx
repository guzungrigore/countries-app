import {SearchCountries} from "./SearchCountries.jsx";
import {Countries} from "./Countries.jsx";

export const CountriesPage = () => {
    return (
        <div className={"container"}>
            <SearchCountries/>
            <Countries/>
        </div>
    )
}