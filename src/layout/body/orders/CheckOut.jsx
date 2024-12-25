import React from 'react'
import {useSelector} from "react-redux"
const CheckOut = () => {
    const pre_order = useSelector(state => state.orders.pre_order)
    return (
        <div>
            {pre_order.uid}
        </div>
    )
}
export default CheckOut