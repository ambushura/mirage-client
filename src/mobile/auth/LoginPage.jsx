import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setCity, setFilial } from '../../redux/mobile/frontoffice/mobileReducer.js'
import MobileAuth from './AuthKeyboard.jsx'
import { useEffect } from 'react'

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { cities, city, filial } = useSelector((state) => state.mobile)

    useEffect(() => {
        cities.forEach((city) => {
            if (city.code === params.param_city) {
                dispatch(setCity(city))
            }
        })
    }, [cities, dispatch, params.param_city])

    useEffect(() => {
        if (city === null) return
        city.filials.forEach((filial) => {
            if (filial.eais === params.param_filial) {
                dispatch(setFilial(filial))
            }
        })
    }, [city, dispatch, params.param_filial])

    return (
        <MobileAuth
            onBack={() => {
                navigate(`/mobile/${city.code}/${filial.eais}`)
            }}
        />
    )
}
