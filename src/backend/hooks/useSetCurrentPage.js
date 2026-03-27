import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setCurrentPage} from "../../redux/center/centerReducer.js"

export function useSetCurrentPage(current_page) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page])
}