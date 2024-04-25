import "./App.css"
import {createContext, useState} from "react";
import {useCountries} from "./hooks/useCountries.js";
import {CountriesPage} from "./components/CountriesPage.jsx";
import {CountryPage} from "./components/CountryPage.jsx";
import {Route, Routes} from "react-router-dom";
import {ThemeIcon} from "./components/themeIcon/themeIcon.jsx";

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
    return (
        <div className="App">
            <CountryContext.Provider
                value={{isLoading, countries, errorMessage}}>
                <div className={"settings"}>
                    <ThemeIcon toggleTheme={toggleTheme} userTheme={userTheme}/>
                </div>
                <Routes>
                    <Route path={"/"} element={<CountriesPage/>}/>
                    <Route path={"/country/:name"} element={<CountryPage/>}/>
                </Routes>
            </CountryContext.Provider>
        </div>
    )
}

export default App
