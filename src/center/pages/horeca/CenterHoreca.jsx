import React from 'react'
import {useSetCurrentPage} from "../../hooks/useSetCurrentPage.js"
import SubMenu from "../SubMenu.jsx"
import Goods from "./Goods.jsx"
import OrdersHoreca from "./OrdersHoreca.jsx"
import StoreState from "./StoreState.jsx"
import Order from "./Order.jsx"
import {useSetCenterParams} from "../../CenterHeaderTop.jsx"
import ShiftState from "./ShiftState.jsx"
import {useSelector} from "react-redux"
import StoreProduction from "./StoreProduction.jsx"

const CenterHoreca = ({current_page}) => {

    useSetCenterParams()
    useSetCurrentPage(current_page)

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
                {filial !== null && <StoreProduction/>}
            </>
        case 'shift_state':
            return <>
                <SubMenu type={['update', 'filial', 'date_shift', 'shift_state']}/>
                {filial !== null && <ShiftState/>}
            </>
        case 'orders':
            return <>
                <SubMenu type={['update', 'filial', 'date_shift']}/>
                {filial !== null && <OrdersHoreca/>}
            </>
        case 'order':
            return <>
                <SubMenu type={['update', 'back', 'save', 'recipe_update']}/>
                {filial !== null && <Order/>}
            </>
        default:
            return null
    }
}

export default CenterHoreca