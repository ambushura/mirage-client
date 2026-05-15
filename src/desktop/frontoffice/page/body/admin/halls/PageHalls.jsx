import Hall from '../../../../components/halls/Hall.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setHall } from '../../../../../../redux/frontoffice/hallsReducer.js'
import { Box } from '@mui/material'
import { cinema_hall_get } from '../../../../../../service/fetch_service.js'
import Loader from '../../../../../../ui/Loader.jsx'

const PageHalls = () => {
    const dispatch = useDispatch()

    const city = useSelector((state) => state.data.city)
    const filial = useSelector((state) => state.data.filial)
    const uid_hall = useSelector((state) => state.halls.uid_hall)
    const hall = useSelector((state) => state.halls.hall)
    const app_width = useSelector((state) => state.interface.app_width)
    const [fetching_result, set_fetching_result] = useState({
        loading: false,
        error: null,
        data: null,
    })

    useEffect(() => {
        const fetch_hall = async () => {
            const fetching_result = await dispatch(cinema_hall_get(filial, uid_hall, 'cinema'))
            set_fetching_result(fetching_result)
            if (fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setHall(fetching_result.data))
            }
        }
        if (filial !== undefined && uid_hall !== null) {
            fetch_hall()
        }
    }, [dispatch, filial, uid_hall])

    if (fetching_result.loading && fetching_result.error === null) {
        return <Loader />
    } else if (!fetching_result.loading && fetching_result.error !== null) {
        return <Box className="empty-box">{fetching_result.error}</Box>
    } else {
        if (filial === undefined) {
            return <Box className="empty-box">Выберите филиал...</Box>
        } else if (hall === null) {
            return <Box className="empty-box">Выберите зал...</Box>
        } else {
            return (
                <Box sx={{ width: '100%', height: 'var(--page-height)' }}>
                    <Hall
                        uid_hall={hall.uid}
                        city={city}
                        filial={filial}
                        pre_order={null}
                        hall={hall}
                        seance={null}
                        width={app_width}
                        booking={[]}
                    />
                </Box>
            )
        }
    }
}

export default PageHalls
