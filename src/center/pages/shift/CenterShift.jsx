import React from 'react'
import Revenue from "./Revenue.jsx"
import Results from "./Results.jsx"
import {useSetCurrentPage} from "../../useSetCurrentPage.js"
import CenterRevenueHeader from "./CenterRevenueHeader.jsx"

const CenterShift = ({current_page}) => {

    useSetCurrentPage(current_page)

    switch (current_page[1]) {
        case 'revenue':
            return <>
                <CenterRevenueHeader/>
                <Revenue/>
            </>
        case 'results':
            return <Results/>
        default:
            return null
    }
}

export default CenterShift