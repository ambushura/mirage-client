import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setCity } from '../../redux/mobile/frontoffice/mobileReducer.js'
import { AuthList } from './AuthRoutes.jsx'

export default function FilialPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const { cities, city } = useSelector((state) => state.mobile)
    const [search, setSearch] = useState('')

    useEffect(() => {
        cities.forEach((city) => {
            if (city.code === params.param_city) {
                dispatch(setCity(city))
            }
        })
    }, [cities, dispatch, params.param_city])

    const filteredFilials = useMemo(() => {
        if (!city) return []

        return city.filials.filter((filial) => filial.name.toLowerCase().includes(search.toLowerCase()))
    }, [city, search])

    return (
        <AuthList
            list={filteredFilials}
            search={search}
            setSearch={setSearch}
            title="Выберите филиал"
            placeholder="В каком вы филиале?"
            cityName={city?.name}
            onBack={() => {
                navigate(`/mobile`)
            }}
            onClick={(el) => {
                navigate(`/mobile/${city.code}/${el.eais}`)
            }}
        />
    )
}
