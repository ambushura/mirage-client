import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import SubMenu from '../../page/SubMenu.jsx'
import Goods from './recipes/Goods.jsx'
import Orders from './orders/Orders.jsx'
import StoreState from './StoreState.jsx'
import ShiftState from './ShiftState.jsx'
import ProductionState from './ProductionState.jsx'
import StoreDiff from './StoreDiff.jsx'
import Order from './orders/Order.jsx'
import SelectFilial from '../SelectFilial.jsx'
import Recipe from './recipes/Recipe.jsx'

import { setCurrentPage, setParams, setSearchParams } from '../../../../redux/desktop/backoffice/centerReducer.js'

const pageAnimation = {
    initial: {
        x: 10,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: -10,
        opacity: 0,
    },
}

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            variants={pageAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.1,
            }}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {children}
        </motion.div>
    )
}

const Center = ({ current_page }) => {
    const dispatch = useDispatch()
    const params = useParams()
    const location = useLocation()
    const [search_params] = useSearchParams()

    const { filial } = useSelector((state) => state.center)

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

    const pages = {
        goods: (
            <>
                <SubMenu type={['update', 'filials', 'organizations']} />
                <Goods />
            </>
        ),

        recipe: (
            <>
                <SubMenu type={['update', 'back', 'actions']} />
                <Recipe />
            </>
        ),

        store_state: (
            <>
                <SubMenu type={['update', 'filial', 'date_shift', 'store_state']} />
                {filial !== null && <StoreState />}
            </>
        ),

        store_production: (
            <>
                <SubMenu type={['update', 'filial', 'date_shift', 'store_production']} />
                {filial !== null && <ProductionState />}
            </>
        ),

        shift_state: (
            <>
                <SubMenu type={['update', 'filial', 'date_shift', 'shift_state']} />
                {filial !== null && <ShiftState />}
            </>
        ),

        orders: (
            <>
                <SubMenu type={['update', 'filial', 'date_shift']} />
                {filial === null && <SelectFilial />}
                {filial !== null && <Orders />}
            </>
        ),

        order: (
            <>
                <SubMenu type={['update', 'back', 'actions']} />
                {filial === null && <SelectFilial />}
                {filial !== null && <Order />}
            </>
        ),

        store_diff: (
            <>
                <SubMenu type={['update', 'filial']} />
                {filial !== null && <StoreDiff />}
            </>
        ),
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <AnimatePresence mode="wait">
                <PageWrapper key={location.pathname}>{pages[current_page[1]] || null}</PageWrapper>
            </AnimatePresence>
        </div>
    )
}

export default Center
