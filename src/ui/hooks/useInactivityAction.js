import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { get_date_shift } from './common_functions.js'
import { useNavigate } from 'react-router-dom'
import { decrementInactivityTime, setInactivityTime } from '../../redux/interfaceReducer.js'

export function useInactivityAction() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const timerRef = useRef(null)

    const { city, filial } = useSelector((state) => state.data)
    const {
        current_page,
        params: { param_date },
        kiosk,
        wp,
        inactivity_time,
    } = useSelector((state) => state.interface)

    useEffect(() => {
        if (!kiosk || current_page === 'seance') {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
            return
        }

        dispatch(setInactivityTime(60))

        timerRef.current = setInterval(() => {
            dispatch(decrementInactivityTime())
        }, 1000)

        return () => {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [kiosk, current_page, param_date, city, filial, wp])

    useEffect(() => {
        if (kiosk && current_page !== 'seance' && inactivity_time === 0 && city && filial) {
            navigate(
                `/films/${city.code}/${filial.eais}/${dayjs(get_date_shift(new Date())).format('YYYY-MM-DD')}/?${wp ? 'wp=' + wp : ''}&kiosk`
            )
        }
    }, [inactivity_time])
}
