import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MobileAuth from './AuthKeyboard.jsx'
import useSetCityAndFilial from '../hooks/useSetCityAndFilial.js'

export default function LoginPage() {
    const navigate = useNavigate()

    const { city, filial } = useSelector((state) => state.front_mobile)

    useSetCityAndFilial()

    return (
        <MobileAuth
            onBack={() => {
                navigate(`/mobile/${city.code}/${filial.eais}`)
            }}
        />
    )
}
