import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setCurrentPage} from "../../redux/centerReducer.js"

export function useSetCurrentPage(current_page) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page])
}