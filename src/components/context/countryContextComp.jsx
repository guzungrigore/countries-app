import React, {createContext, useEffect, useReducer, useRef, useState} from 'react';
import {ThemeIcon} from "../themeIcon/themeIcon.jsx";
import HeartIcon from "../HeartIcon.jsx";
import {Favorite} from "../Favorite.jsx";
import {Route, Routes} from "react-router-dom";
import {CountriesPage} from "../CountriesPage.jsx";
import {CountryPage} from "../CountryPage.jsx";
import {useCountries} from "../../hooks/useCountries.js";
import {initialState, reducer} from "../state/reducer.js";
export const CountryContext = createContext(null);

const CountryContextComp = ({toggleTheme, userTheme}) => {
    const favRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {isLoading, countries, errorMessage} = useCountries("https://restcountries.com/v3.1/all")
    const [show, setShow] = useState(false)
    const addFavourite = (country) => {
        dispatch({type: "ADD", payload: country});
    };

    const removeFavourite = (country) => {
        dispatch({type: "REMOVE", payload: country});
    };

    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(state.favourite));
    }, [state.favourite]);

    useEffect(() => {
        const handler = (event) => {
            if (favRef.current && !favRef.current?.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    },[]);
    return (
        <CountryContext.Provider
            value={{isLoading, countries, errorMessage, favourite: state.favourite, addFavourite, removeFavourite}}>
            <div className={"settings"}>
                <ThemeIcon toggleTheme={toggleTheme} userTheme={userTheme}/>
                <div className={"fav_btn"} onClick={() => setShow(!show)}><HeartIcon/></div>
                <div className={`favorite_wrapper ${show ? 'show' : ''}`} ref={favRef}>
                    <Favorite setShow={setShow}/>
                </div>
            </div>
            <Routes>
                <Route path={"/countriesapp/"} element={<CountriesPage/>}/>
                <Route path={"countriesapp/country/:name"} element={<CountryPage/>}/>
            </Routes>
        </CountryContext.Provider>
    );
};

export default CountryContextComp;
