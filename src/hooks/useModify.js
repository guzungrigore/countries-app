import { useState} from "react";

export const useModify = () => {
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const fetchData = async ({url, method ='GET', body = null}) => {
        try {
            setErrorMessage(null)
            setMessage(null)
            setIsLoading(true);
            const response = await fetch(url, {
                method: method,
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken
                },
                body: body && JSON.stringify(body)
            })
            const data = await response.json()
            data.title && setErrorMessage(data.title)
            setMessage(data)
        } catch (error) {
            setErrorMessage(error)
        }
        setIsLoading(false)
    }
    return {isLoading, message, errorMessage, fetchData}
}
