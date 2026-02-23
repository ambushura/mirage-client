import React from 'react'
import {useSetCurrentPage} from "../../useSetCurrentPage.js"
import SubMenu from "../SubMenu.jsx"
import Goods from "./Goods.jsx"
import OrdersHoreca from "./OrdersHoreca.jsx"
import StoreState from "./StoreState.jsx"
import Order from "./Order.jsx"
import {useSetCenterParams} from "../../CenterHeader.jsx"
import ShiftState from "./ShiftState.jsx";
import {useSelector} from "react-redux";

const CenterHoreca = ({current_page}) => {

    useSetCenterParams()
    useSetCurrentPage(current_page)

    const {filial} = useSelector(state => state.center)

    switch (current_page[1]) {
        case 'goods':
            return <>
                <SubMenu type={['filials']}/>
                <Goods/>
            </>
        case 'store_state':
            return <>
                <SubMenu type={['filial', 'date_shift', 'store_state']}/>
                {filial !== null && <StoreState/>}
            </>
        case 'shift_state':
            return <>
                <SubMenu type={['filial', 'date_shift', 'shift_state']}/>
                {filial !== null && <ShiftState/>}
            </>
        case 'orders':
            return <>
                <SubMenu type={['filial', 'date_shift']}/>
                {filial !== null && <OrdersHoreca/>}
            </>
        case 'order':
            return <>
                <SubMenu type={['back', 'save', 'recipe_update']}/>
                {filial !== null && <Order/>}
            </>
        default:
            return null
    }
}

export default CenterHoreca