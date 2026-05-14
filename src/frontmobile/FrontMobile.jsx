import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Auth from './Auth.jsx'
import '../ui/css/frontmobile.css'
import { useEffect } from 'react'
import { common_cities_filials_get } from '../service/fetch_service.js'
import { setCities } from '../redux/frontmobile/frontMobileReducer.js'

const FrontMobile = () => {
    const dispatch = useDispatch()

    const uid_user = useSelector((state) => state.auth.uid)

    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(common_cities_filials_get())
            if (res.error === null && !res.loading) {
                dispatch(setCities(res.data))
            }
        }
        fetch()
    }, [dispatch])

    if (uid_user === null) {
        return (
            <Box className="front-mobile-auth">
                <Auth />
            </Box>
        )
    } else {
        return <Box>Страница</Box>
    }
}

export default FrontMobile
