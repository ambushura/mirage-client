import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

export function useFullScreen() {

    const current_page = useSelector(state => state.interface.current_page)
    const [full, set_full] = useState(false)

    useEffect(() => {
        if (current_page === 'seance') {
            set_full(true)
        } else {
            set_full(false)
        }
    }, [current_page])

    return full
}