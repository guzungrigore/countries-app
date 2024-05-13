import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateAdminRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token)
    return (
        decode.sub === "admin" ? children : <Navigate to={'/countriesapp/'}/>
    );
};

export default PrivateAdminRoute;
