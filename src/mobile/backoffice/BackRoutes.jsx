import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { common_cities_filials_get } from '../../service/fetch_service.js'
import { setCities } from '../../redux/mobile/frontoffice/mobileReducer.js'
import { useDispatch } from 'react-redux'

const BackRoutes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(common_cities_filials_get())
            if (res.error === null && !res.loading) {
                dispatch(setCities(res.data))
            }
        }
        fetch()
    }, [dispatch])

    return (
        <Box>
            <Routes>
                <Route path="/mobile/" element={<Box></Box>} />
            </Routes>
        </Box>
    )
}

export default BackRoutes
