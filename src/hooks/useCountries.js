import { useEffect, useState} from "react";

export const useCountries = (url) => {
    const [countries, setCountries] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setErrorMessage(null)
                setCountries(null)
                setIsLoading(true);
                const response = await fetch(url, {
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken
                    }
                })
                const data = await response.json()
                data.title && setErrorMessage(data.title)
                setCountries(data)
            } catch (error) {
                setErrorMessage(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, []);
    return {isLoading, countries, errorMessage}
}
