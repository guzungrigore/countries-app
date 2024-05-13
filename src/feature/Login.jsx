import {useLogin} from "../hooks/useLogin.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const {token, isLoading, errorMessage, login} = useLogin()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const body = {
        username: username,
        password: password
    }
    const auth = () => {
        login('http://localhost:8080/login', body)
    }
    useEffect(() => {
        if(errorMessage){
            return console.log(errorMessage)
        }
        if(token){
            console.log(token)
            localStorage.setItem('token', JSON.stringify(token))
            navigate('/countriesapp/')
        }
    }, [navigate, errorMessage, token]);
    return (
        <div className={"favourite"}>
            <input className={"input"} type={"text"} placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className={"input"} type={"text"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={auth}>Sign In</button>
        </div>
    );
};

export default Login;
