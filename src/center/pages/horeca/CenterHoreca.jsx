import React from 'react'
import {useSetCurrentPage} from "../../useSetCurrentPage.js"
import SubMenu from "../SubMenu.jsx"
import Goods from "./Goods.jsx"
import OrdersHoreca from "./OrdersHoreca.jsx"
import Sales from "./Sales.jsx"
import Order from "./Order.jsx"
import {useSetCenterParams} from "../../CenterHeader.jsx"

const CenterHoreca = ({current_page}) => {

    useSetCenterParams()
    useSetCurrentPage(current_page)

    switch (current_page[1]) {
        case 'goods':
            return <>
                <SubMenu type={['filials']}/>
                <Goods/>
            </>
        case 'sales':
            return <>
                <SubMenu type={['filial', 'date_shift', 'horeca_sales']}/>
                <Sales/>
            </>
        case 'orders':
            return <>
                <SubMenu type={['filial', 'date_shift']}/>
                <OrdersHoreca/>
            </>
        case 'order':
            return <>
                <SubMenu type={['back', 'save', 'recipe_update']}/>
                <Order/>
            </>
        default:
            return null
    }
}

export default CenterHoreca