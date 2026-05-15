import { useEffect } from 'react'
import SubMenu from '../../page/SubMenu.jsx'
import Orders from './Orders.jsx'
import { setCurrentPage } from '../../../../redux/desktop/backoffice/centerReducer.js'
import { useDispatch } from 'react-redux'

const Center = ({ current_page }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page, dispatch])

    switch (current_page[1]) {
        case 'orders':
            return (
                <>
                    <SubMenu type={['filials', 'organizations']} />
                    <Orders />
                </>
            )
        default:
            return null
    }
}

export default Center
