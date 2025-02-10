import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useFetching} from "./useFetching.js"

export function useFetchHall(city, filial, seance) {

    const [url, set_url] = useState('')
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState(undefined)

    const halls = useSelector(state => state.halls.halls)

    useEffect(() => {
        const hall = halls.find(hall => hall.uid === seance.uid_hall)
        if (filial !== undefined && seance !== undefined && hall === undefined) {
            set_url(`http://${filial.ip}:${filial.port}/api/get_hall?uid_hall=${seance.uid_hall}`)
        } else {
            set_data(hall)
        }
    }, [filial, halls, seance])

    useEffect(() => {
        if (fetch_data !== null) {
            set_data(fetch_data)
        }
    }, [fetch_data])

    return [data, fetch_errors, fetch_loading]
}