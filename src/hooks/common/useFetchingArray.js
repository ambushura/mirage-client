import {useEffect, useState} from 'react'
import axios from "axios"
import {TIMEOUT} from "../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {addNotification} from "../../redux/notifierReducer.js"

export function useFetchingArray(urls) {

    const dispatch = useDispatch()
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
                error: null,
                params: url.params,
            }))
            set_results(initialResults)
            const fetchResults = await Promise.all(
                urls.map(async (url) => {
                    try {
                        const response = await axios.get(url.url, {
                            timeout: TIMEOUT,
                            headers: {
                                Authorization: token,
                                uid_filial: url.filial.uid,
                                wp: wp,
                            },
                            params: url.params,
                        })
                        return {
                            url: url.url,
                            data: response.data,
                            filial: url.filial,
                            loading: false,
                            error: null,
                            params: url.params
                        }
                    } catch (e) {
                        let message
                        if (e.code === 'ERR_NETWORK') {
                            message = 'Сервер не отвечает'
                        } else if (e.code === 'ECONNABORTED') {
                            message = 'Превышено время ожидания ответа от сервера'
                        } else if (e.response?.data) {
                            message = e.response.data
                        } else {
                            message = e.message
                        }
                        dispatch(addNotification({
                            message,
                            severity: 'error',
                            autoHide: true
                        }))
                        return {
                            url: url.url,
                            data: null,
                            filial: url.filial,
                            loading: false,
                            error: e.message,
                            params: url.params
                        }
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
    }, [token, urls, wp])

    return results
}