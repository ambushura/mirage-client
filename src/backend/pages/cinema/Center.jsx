import React, {useEffect} from 'react'
import SubMenu from "../SubMenu.jsx"
import Orders from "./Orders.jsx"
import {setCurrentPage} from "../../../redux/center/centerReducer.js"
import {useDispatch} from "react-redux"

const Center = ({current_page}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page])

    switch (current_page[1]) {
        case 'orders':
            return <>
                <SubMenu type={[]}/>
                <Orders/>
            </>
        default:
            return null
    }
}

export default Center