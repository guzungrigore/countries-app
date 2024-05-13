import {Country} from "./Country.jsx";
import {useEffect, useState} from "react";
import {useModify} from "../hooks/useModify.js";

export const Countries = () => {
    const [page, setPage] = useState(1)
    const {message, errorMessage, fetchData} = useModify()
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchData({
            url: `http://localhost:8080/country?page=${page}&size=8`
        })

    }, [page])

    useEffect(() => {
        if (message?.totalPages) {
            setTotalPages(message.totalPages)
        }
    }, [message])

    return (
        <div>
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            <div className={'btns-1'}>
                {page > 1 ? <button onClick={() => setPage(page - 1)}>Prev</button> : <button disabled>Prev</button>}
                {page < totalPages ? <button onClick={() => setPage(page + 1)}>Next</button> : <button disabled>Next</button>}
            </div>
            <div className={"countries"}>
                {message && message.content.map(country => (
                    <Country country={country} key={country.id}/>
                ))}
            </div>

        </div>
    )
}
