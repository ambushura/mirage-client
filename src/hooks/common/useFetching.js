import {useEffect, useState} from 'react'
import axios from "axios"
import {TIMEOUT} from "../../service/fetch_service.js"
import {useSelector} from "react-redux"

export function useFetching(url) {

    const ref_url = JSON.stringify(url)

    const token = useSelector(state => state.auth.token)
    const wp = useSelector(state => state.interface.wp)

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await axios.get(url.url, {
                    timeout: TIMEOUT,
                    headers: {
                        Authorization: token,
                        uid_filial: url.uid_filial,
                        wp: wp,
                    },
                    params: url.params
                })
                if (isMounted) setData(response.data)
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
    }, [token, ref_url, wp])

    return [data, error, loading]
}