import {setParams, setSearchParams} from "../../redux/center/centerReducer.js"
import {useParams, useSearchParams} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useEffect} from 'react'

export function useSetCenterParams() {

    const dispatch = useDispatch()

    const params = useParams()
    const [search_params] = useSearchParams()

    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    useEffect(() => {
        const obj = Object.fromEntries(search_params.entries())
        dispatch(setSearchParams(obj))
    }, [dispatch, search_params])

}