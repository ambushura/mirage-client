import React from 'react'
import Revenue from "./Revenue.jsx"
import Results from "./Results.jsx"
import {useSetCurrentPage} from "../../hooks/useSetCurrentPage.js"
import SubMenu from "../SubMenu.jsx"
import Operations from "./Operations.jsx"

const CenterShift = ({current_page}) => {

    useSetCurrentPage(current_page)

    switch (current_page[1]) {
        case 'revenue':
            return <>
                <SubMenu type={['period', 'filials']}/>
                <Revenue/>
            </>
        case 'results':
            return <>
                <SubMenu type={['date_shift', 'filials']}/>
                <Results/>
            </>
        case 'operations':
            return <>
                <SubMenu type={['date_shift', 'filials']}/>
                <Operations/>
            </>
        default:
            return null
    }
}

export default CenterShift