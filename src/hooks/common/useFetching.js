import {useEffect, useState} from 'react'
import axios from "axios"
import {TIMEOUT} from "../../service/fetch_service.js"
import {useSelector} from "react-redux";

export function useFetching(url) {

    const token = useSelector(state => state.auth.token)
    const wp = useSelector(state => state.interface.wp)

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    timeout: TIMEOUT,
                    headers: {
                        Authorization: token,
                        wp: wp,
                    },
                })
                if (isMounted) setData(response.data.data)
            } catch (err) {
                if (isMounted) setError(err.message)
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        if (url !== undefined && wp !== undefined && wp.length > 0) {
            fetchData().then()
        } else {
            setData(null)
            setLoading(false)
        }
        return () => {
            isMounted = false
        }
    }, [url, wp])

    return [data, error, loading]
}