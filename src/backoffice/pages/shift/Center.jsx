import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Revenue from './Revenue.jsx'
import Results from './Results.jsx'
import Operations from './Operations.jsx'
import SubMenu from '../../SubMenu.jsx'

import { setCurrentPage } from '../../../redux/center/centerReducer.js'

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
                position: 'absolute',
                inset: 0,
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
    const location = useLocation()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page, dispatch])

    const pages = {
        revenue: (
            <>
                <SubMenu type={['period', 'filials']} />
                <Revenue />
            </>
        ),

        results: (
            <>
                <SubMenu type={['date_shift', 'filials']} />
                <Results />
            </>
        ),

        operations: (
            <>
                <SubMenu type={['date_shift', 'filials']} />
                <Operations />
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
