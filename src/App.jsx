import "./App.css"
import {createContext} from "react";
import {useCountries} from "./hooks/useCountries.js";
import {CountriesPage} from "./components/CountriesPage.jsx";
import {CountryPage} from "./components/CountryPage.jsx";
import {Route, Routes} from "react-router-dom";
export const CountryContext = createContext(null);

function App() {
    const {isLoading, countries, errorMessage} = useCountries("https://restcountries.com/v3.1/all")

  return (
      <div className="App">
          <CountryContext.Provider
              value={{isLoading, countries, errorMessage}}>
              <Routes>
                  <Route path={"/"} element={<CountriesPage/>}/>
                  <Route path={"/country/:name"} element={<CountryPage/>}/>
              </Routes>
          </CountryContext.Provider>
      </div>
  )
}

export default App
