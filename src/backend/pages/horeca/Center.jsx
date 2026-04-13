import React, {useEffect} from 'react'
import SubMenu from "../../SubMenu.jsx"
import Goods from "./Goods.jsx"
import Orders from "./Orders.jsx"
import StoreState from "./StoreState.jsx"
import ShiftState from "./ShiftState.jsx"
import {useDispatch, useSelector} from "react-redux"
import ProductionState from "./ProductionState.jsx"
import {setCurrentPage} from "../../../redux/center/centerReducer.js"

const Center = ({current_page}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page])

    const {filial} = useSelector(state => state.center)

    switch (current_page[1]) {
        case 'goods':
            return <>
                <SubMenu type={['update', 'filials']}/>
                <Goods/>
            </>
        case 'store_state':
            return <>
                <SubMenu type={['update', 'filial', 'date_shift', 'store_state']}/>
                {filial !== null && <StoreState/>}
            </>
        case 'store_production':
            return <>
                <SubMenu type={['update', 'filial', 'date_shift', 'store_production']}/>
                {filial !== null && <ProductionState/>}
            </>
        case 'shift_state':
            return <>
                <SubMenu type={['update', 'filial', 'date_shift', 'shift_state']}/>
                {filial !== null && <ShiftState/>}
            </>
        case 'orders':
            return <>
                <SubMenu type={['update', 'filial', 'date_shift']}/>
                {filial !== null && <Orders/>}
            </>
        default:
            return null
    }
}

export default Center