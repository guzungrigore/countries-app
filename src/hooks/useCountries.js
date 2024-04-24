import {useEffect, useState} from "react";

export const useCountries = (url) => {
    const [countries, setCountries] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url)
                const data = await response.json()
                setCountries(data)
                setErrorMessage(null)
            } catch (error) {
                setErrorMessage(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])
    return {isLoading, countries, errorMessage}
}
