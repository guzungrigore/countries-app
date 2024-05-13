import {useState} from "react";

export const useLogin = () => {
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const login = async (url, body) => {
        try {
            setErrorMessage(null)
            setToken(false)
            setIsLoading(true);
            const response = await fetch(url, {
                method: "POST",
                headers: {"content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(body)
            })
            const data = await response.json()
            data.title && setErrorMessage(data.title)
            setToken(data)
        } catch (error) {
            setErrorMessage(error)
        } finally {
            setIsLoading(false)
        }
    }
    return {isLoading, token, errorMessage, login}
}
