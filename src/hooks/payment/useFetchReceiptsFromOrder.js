import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useFetching} from "../common/useFetching.js"
import {setCurrentHorder, setCurrentPreOrder} from "../../redux/ordersReducer.js";

export function useFetchReceiptsFromOrder(type) {

    const dispatch = useDispatch()

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)

    const filial = useSelector(state => state.data.filial)
    const pre_order = useSelector(state => state.orders.pre_order)
    const horder = useSelector(state => state.orders.horder)

    useEffect(() => {
        if (filial !== undefined) {
            set_url(`http://${filial.ip}:8080/api/get_receipts_from_order?&uid_order=${type === 'horeca' ? horder.uid : pre_order.uid}&type=${type}&time=${new Date().getMinutes()}-${new Date().getSeconds()}`)
        } else {
            set_url(undefined)
        }
    }, [filial, type, horder, pre_order])

    useEffect(() => {
        if (fetch_data !== null) {
            if (type === 'cinema') {
                dispatch(setCurrentPreOrder(fetch_data))
            } else {
                dispatch(setCurrentHorder(fetch_data))
            }
        }
    }, [dispatch, fetch_data, type])

    return [fetch_errors, fetch_loading]
}