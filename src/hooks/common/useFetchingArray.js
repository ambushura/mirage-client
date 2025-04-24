import { useEffect, useState } from 'react'
import axios from "axios"
import {TIMEOUT} from "../../service/fetch_service.js"
import {useSelector} from "react-redux";

export function useFetchingArray(urls) {

    const token = useSelector(state => state.auth.token)
    const wp = useSelector(state => state.interface.wp)

    const [results, set_results] = useState([])

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            const initialResults = urls.map(url => ({
                url: url.url,
                data: null,
                filial: url.filial,
                loading: true,
                error: null
            }))
            set_results(initialResults)
            const fetchResults = await Promise.all(
                urls.map(async (url) => {
                    try {
                        const response = await axios.get(url.url, {
                            timeout: TIMEOUT,
                            headers: {
                                Authorization: token,
                                wp: wp,
                            },
                        })
                        return {url: url.url, data: response.data.data, filial: url.filial, loading: false, error: null}
                    } catch (err) {
                        return {url: url.url, data: null, filial: url.filial, loading: false, error: err.message}
                    }
                })
            )
            if (isMounted) {
                set_results(fetchResults)
            }
        }
        if (wp !== undefined && wp.length > 0) {
            fetchData()
        }
        return () => {
            isMounted = false
        }
    }, [urls])

    return results
}