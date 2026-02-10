import React from 'react'
import {useSetCurrentPage} from "../../useSetCurrentPage.js"
import SubMenu from "../SubMenu.jsx"
import OrdersCinema from "./OrdersCinema.jsx"

const CenterCinema = ({current_page}) => {

    useSetCurrentPage(current_page)

    switch (current_page[1]) {
        case 'orders':
            return <>
                <SubMenu type={[]}/>
                <OrdersCinema/>
            </>
        default:
            return null
    }
}

export default CenterCinema