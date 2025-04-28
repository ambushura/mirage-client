import {useEffect, useState} from "react"
import {useFetchingArray} from "../common/useFetchingArray.js"
import {useDispatch, useSelector} from "react-redux"
import {setFilm} from "../../redux/scheduleReducer.js"

export function useSetFilm() {

    const dispatch = useDispatch()

    const [urls, set_urls] = useState([])
    const fetch_data = useFetchingArray(urls)

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)
    const uid_film = useSelector(state => state.interface.params.uid_film)

    useEffect(() => {
        let urls_new = []
        if (city !== undefined && filial === undefined) {
            city.filials.forEach(filial => {
                urls_new.push({
                    filial: filial,
                    url: `https://${filial.ip}/api/get_film_seances?uid_filial=${filial.uid}&date_shift=${param_date}&uid_film=${uid_film}`
                })
            })
        } else if (city !== undefined && filial !== undefined) {
            urls_new.push({
                filial: filial,
                url: `https://${filial.ip}/api/get_film_seances?uid_filial=${filial.uid}&date_shift=${param_date}&uid_film=${uid_film}`
            })
        }
        set_urls(urls_new)
    }, [city, filial, param_date, uid_film])

    useEffect(() => {
        let film_new = undefined
        fetch_data.forEach(filial_data => {
            if (filial_data.data !== null) {
                film_new = filial_data.data.film
            }
        })
        dispatch(setFilm({film: film_new, data: fetch_data}))
        return () => {
            dispatch(setFilm({film: undefined, data: []}))
        }
    }, [fetch_data])

}