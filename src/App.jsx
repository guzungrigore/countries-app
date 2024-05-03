import "./App.css"
import { useState} from "react";
import CountryContextComp from "./components/context/countryContextComp.jsx";


function App() {
    const [userTheme, setUserTheme] = useState(localStorage.getItem("user-theme") || getMediaPreference());
    document.documentElement.className = userTheme;


    function getMediaPreference(){
        const hasDarkPreference = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        if (hasDarkPreference) {
            return "dark-theme";
        } else {
            return "light-theme";
        }
    }

    const toggleTheme = () => {
        const activeTheme = localStorage.getItem("user-theme");
        console.log(activeTheme)
        if (activeTheme === "light-theme") {
            localStorage.setItem("user-theme", "dark-theme");
            setUserTheme("dark-theme")
            document.documentElement.className = "dark-theme";
        } else {
            localStorage.setItem("user-theme", "light-theme");
            setUserTheme("light-theme")
            document.documentElement.className = "light-theme";
        }
    }

    return (
        <div className="App">
            <CountryContextComp toggleTheme={toggleTheme} userTheme={userTheme}/>
        </div>
    )
}

export default App
