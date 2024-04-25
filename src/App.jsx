import "./App.css"
import {createContext, useEffect, useReducer, useRef, useState} from "react";
import {useCountries} from "./hooks/useCountries.js";
import {CountriesPage} from "./components/CountriesPage.jsx";
import {CountryPage} from "./components/CountryPage.jsx";
import {Route, Routes} from "react-router-dom";
import {ThemeIcon} from "./components/themeIcon/themeIcon.jsx";
import {Favorite} from "./components/Favorite.jsx";

export const CountryContext = createContext(null);

function App() {
    const {isLoading, countries, errorMessage} = useCountries("https://restcountries.com/v3.1/all")

    const getMediaPreference = () => {
        const hasDarkPreference = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        if (hasDarkPreference) {
            return "dark-theme";
        } else {
            return "light-theme";
        }
    }
    const [userTheme, setUserTheme] = useState(localStorage.getItem("user-theme") || getMediaPreference());
    document.documentElement.className = userTheme;

    const setTheme = (theme) => {
        localStorage.setItem("user-theme", theme);
        setUserTheme(theme)
        document.documentElement.className = theme;
    }

    const toggleTheme = () => {
        const activeTheme = localStorage.getItem("user-theme");
        console.log(activeTheme)
        if (activeTheme === "light-theme") {
            setTheme("dark-theme");
        } else {
            setTheme("light-theme");
        }
    }

    const initialState = {
        favourite: JSON.parse(localStorage.getItem('favorite')) || []
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                if (!state.favourite.some(country => country.name.common === action.payload.name.common)) {
                    return {
                        ...state,
                        favourite: [...state.favourite, action.payload],

                    }
                }
                return state
            case "REMOVE":
                return {
                    ...state,
                    favourite: state.favourite.filter((country) => country.name.common !== action.payload.name.common)
                }
            default:
                return state
        }
    }

    const [show, setShow] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);
    const addFavourite = (country) => {
        dispatch({type: "ADD", payload: country});

    };

    const removeFavourite = (country) => {
        dispatch({type: "REMOVE", payload: country});

    };

    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(state.favourite));
    }, [state.favourite]);

    const favRef = useRef(null);
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
        <div className="App">
            <CountryContext.Provider
                value={{isLoading, countries, errorMessage, favourite: state.favourite, addFavourite, removeFavourite}}>
                <div className={"settings"}>
                    <ThemeIcon toggleTheme={toggleTheme} userTheme={userTheme}/>
                    <div className={"fav_btn"} onClick={() => setShow(!show)}>❤️</div>
                    <div className={`favorite_wrapper ${show ? 'show' : ''}`} ref={favRef}>
                        <Favorite setShow={setShow}/>
                    </div>
                </div>
                <Routes>
                    <Route path={"/countriesapp/"} element={<CountriesPage/>}/>
                    <Route path={"countriesapp/country/:name"} element={<CountryPage/>}/>
                </Routes>
            </CountryContext.Provider>
        </div>
    )
}

export default App
