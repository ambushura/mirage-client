import { setCurrentPage } from '../../../../redux/backoffice/centerReducer.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cashbox from './Cashbox.jsx'
import SubMenu from '../../page/SubMenu.jsx'

const Center = ({ current_page }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page, dispatch])

    switch (current_page[1]) {
        case 'cashbox':
            return (
                <>
                    <SubMenu type={['update', 'filials', 'organizations']} />
                    <Cashbox />
                </>
            )
        default:
            return null
    }
}

export default Center
