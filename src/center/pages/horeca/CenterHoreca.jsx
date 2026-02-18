import React from 'react'
import {useSetCurrentPage} from "../../useSetCurrentPage.js"
import SubMenu from "../SubMenu.jsx"
import Goods from "./Goods.jsx"
import OrdersHoreca from "./OrdersHoreca.jsx"
import Sales from "./Sales.jsx"

const CenterHoreca = ({current_page}) => {

    useSetCurrentPage(current_page)

    switch (current_page[1]) {
        case 'goods':
            return <>
                <SubMenu type={['filials']}/>
                <Goods/>
            </>
        case 'sales':
            return <>
                <SubMenu type={['filial', 'date_shift']}/>
                <Sales/>
            </>
        case 'orders':
            return <>
                <SubMenu type={['filial', 'date_shift']}/>
                <OrdersHoreca/>
            </>
        default:
            return null
    }
}

export default CenterHoreca