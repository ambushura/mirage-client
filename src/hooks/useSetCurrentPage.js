import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setCurrentPage} from "../redux/interfaceReducer.js"

export function useSetCurrentPage(page) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentPage(page))
    }, [dispatch, page])
}