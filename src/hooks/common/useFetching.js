import {useEffect, useState} from 'react'
import axios from "axios"
import {TIMEOUT} from "../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {addNotification} from "../../redux/notifierReducer.js"

export function useFetching(url) {

    const dispatch = useDispatch()

    const ref_url = JSON.stringify(url)
    const token = useSelector(state => state.auth.token)
    const wp = useSelector(state => state.interface.wp)

    const [data, set_data] = useState(null)
    const [error, set_error] = useState(null)
    const [loading, set_loading] = useState(true)

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
                if (isMounted) set_data(response.data)
            } catch (err) {
                if (isMounted) {
                    dispatch(addNotification({
                        message: err?.response?.data || err.message,
                        severity: 'error',
                        autoHide: true
                    }))
                    set_error(err.message)
                }
            } finally {
                if (isMounted) set_loading(false)
            }
        }
        if (url !== undefined && wp !== undefined && wp.length > 0) {
            fetchData().then()
        } else {
            set_data(null)
            set_loading(false)
        }
        return () => {
            isMounted = false
        }
    }, [token, ref_url, wp])

    return [data, error, loading]
}