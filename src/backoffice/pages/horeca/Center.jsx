import {useEffect} from 'react'
import SubMenu from "../../SubMenu.jsx"
import Goods from "./recipes/Goods.jsx"
import Orders from "./orders/Orders.jsx"
import StoreState from "./StoreState.jsx"
import ShiftState from "./ShiftState.jsx"
import {useDispatch, useSelector} from "react-redux"
import ProductionState from "./ProductionState.jsx"
import {setCurrentPage, setParams, setSearchParams} from "../../../redux/center/centerReducer.js"
import StoreDiff from "./StoreDiff.jsx"
import Order from "./orders/Order.jsx"
import {useParams, useSearchParams} from "react-router-dom"
import SelectFilial from "../SelectFilial.jsx"
import Recipe from "./recipes/Recipe.jsx"

const Center = ({current_page}) => {

    const dispatch = useDispatch()
    const params = useParams()
    const [search_params] = useSearchParams()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page, dispatch])

    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    useEffect(() => {
        const search_params_new = Object.fromEntries(search_params.entries())
        dispatch(setSearchParams(JSON.stringify(search_params_new)))
    }, [dispatch, search_params])

    const {filial} = useSelector(state => state.center)

    switch (current_page[1]) {
        case 'goods':
            return <>
                <SubMenu type={['update', 'filials', 'organizations']}/>
                <Goods/>
            </>
        case 'recipe':
            return <>
                <SubMenu type={['update', 'back']}/>
                <Recipe/>
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
                {filial === null && <SelectFilial/>}
                {filial !== null && <Orders/>}
            </>
        case 'order':
            return <>
                <SubMenu type={['update', 'back', 'actions']}/>
                {filial === null && <SelectFilial/>}
                {filial !== null && <Order/>}
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