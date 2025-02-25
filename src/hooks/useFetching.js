import {useEffect, useState} from 'react'
import axios from "axios"
import {TIMEOUT} from "../service/fetch_service.js"

export function useFetching(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {timeout: TIMEOUT})
                if (isMounted) setData(response.data.data)
            } catch (err) {
                if (isMounted) setError(err.message)
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        if (url !== undefined) {
            fetchData().then()
        } else {
            setData(null)
            setLoading(false)
        }
        return () => {
            isMounted = false
        }
    }, [url])

    return [data, error, loading]
}