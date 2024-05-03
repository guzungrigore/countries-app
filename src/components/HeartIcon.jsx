import {useContext} from 'react';
import {CountryContext} from "./context/countryContextComp.jsx";

const HeartIcon = () => {
    const {addFavorite} = useContext(CountryContext);
    return (
        <div>
            <span className={"btn-favorite"}
                  onClick={() => addFavorite}><svg
                className={"feather" +
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

        </div>
    );
};

export default HeartIcon;
