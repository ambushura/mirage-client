import {useEffect} from 'react'
import SubMenu from "../../SubMenu.jsx"
import Goods from "./recipes/Goods.jsx"
import Orders from "./orders/Orders.jsx"
import StoreState from "./StoreState.jsx"
import ShiftState from "./ShiftState.jsx"
import {useDispatch, useSelector} from "react-redux"
import ProductionState from "./ProductionState.jsx"
import {setCurrentPage} from "../../../redux/center/centerReducer.js"
import StoreDiff from "./StoreDiff.jsx"

const Center = ({current_page}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page, dispatch])

    const {filial} = useSelector(state => state.center)

    switch (current_page[1]) {
        case 'goods':
            return <>
                <SubMenu type={['update', 'filials', 'organizations']}/>
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
        case 'store_diff':
            return <>
                <SubMenu type={['update', 'filial']}/>
                {filial !== null && <StoreDiff/>}
            </>
        default:
            return null
    }
}

export default Center