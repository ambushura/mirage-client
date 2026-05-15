import { useEffect } from 'react'
import SubMenu from '../../page/SubMenu.jsx'
import { useDispatch } from 'react-redux'
import { setCurrentPage, setParams, setSearchParams } from '../../../../redux/desktop/backoffice/centerReducer.js'
import { useParams, useSearchParams } from 'react-router-dom'
import Maps from './maps/Maps.jsx'

const Center = ({ current_page }) => {
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

    switch (current_page[1]) {
        case 'maps':
            return (
                <>
                    <SubMenu type={['update', 'filials']} />
                    <Maps />
                </>
            )
        default:
            return null
    }
}

export default Center
