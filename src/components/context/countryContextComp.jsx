import {createContext, useEffect, useReducer, useRef, useState} from 'react';
import {ThemeIcon} from "../themeIcon/themeIcon.jsx";
import HeartIcon from "../HeartIcon.jsx";
import {Favorite} from "../Favorite.jsx";
import {Route, Routes} from "react-router-dom";
import {CountriesPage} from "../CountriesPage.jsx";
import {CountryPage} from "../CountryPage.jsx";
import {initialState, reducer} from "../state/reducer.js";
import PrivateRoute from "../privateRoute.jsx";
import Login from "../../feature/Login.jsx";
import PrivateAdminRoute from "../privateAdminRoute.jsx";
import AdminPage from "../AdminPage.jsx";

export const CountryContext = createContext(null);

const CountryContextComp = ({toggleTheme, userTheme}) => {
    const favRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
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
    }, []);
    return (
        <CountryContext.Provider
            value={{favourite: state.favourite, addFavourite, removeFavourite}}>

            <Routes>
                <Route path="*"
                       element={
                           <PrivateRoute>

                               <Routes>
                                   <Route path={"/countriesapp/"} element={
                                       <div>
                                           <div className={"settings"}>
                                               <ThemeIcon toggleTheme={toggleTheme} userTheme={userTheme}/>
                                               <div className={"fav_btn"} onClick={() => setShow(!show)}><HeartIcon/>
                                               </div>
                                               <div className={`favorite_wrapper ${show ? 'show' : ''}`} ref={favRef}>
                                                   <Favorite setShow={setShow}/>
                                               </div>
                                           </div>
                                           <CountriesPage/>
                                       </div>
                                   }/>
                                   <Route path={"countriesapp/country/:id"} element={
                                       <div>
                                           <div className={"settings"}>
                                               <ThemeIcon toggleTheme={toggleTheme} userTheme={userTheme}/>
                                               <div className={"fav_btn"} onClick={() => setShow(!show)}><HeartIcon/>
                                               </div>
                                               <div className={`favorite_wrapper ${show ? 'show' : ''}`} ref={favRef}>
                                                   <Favorite setShow={setShow}/>
                                               </div>
                                           </div>
                                           <CountryPage/>
                                       </div>}/>
                                   <Route path={"/countriesapp/admin"} element={
                                       <PrivateAdminRoute>
                                           <AdminPage/>
                                       </PrivateAdminRoute>
                                   }/>
                               </Routes>
                           </PrivateRoute>
                       }/>
                <Route path="/countriesapp/login" element={<Login/>}/>
            </Routes>
        </CountryContext.Provider>
    )
        ;
};

export default CountryContextComp;
