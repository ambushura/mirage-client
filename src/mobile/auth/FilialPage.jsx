import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthList } from './AuthRoutes.jsx'
import useSetCityAndFilial from '../hooks/useSetCityAndFilial.js'

export default function FilialPage() {
    const navigate = useNavigate()
    const { city } = useSelector((state) => state.front_mobile)
    const [search, setSearch] = useState('')

    useSetCityAndFilial()

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
