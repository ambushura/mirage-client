import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthList } from './AuthRoutes.jsx'

export default function CityPage() {
    const navigate = useNavigate()
    const { cities } = useSelector((state) => state.front_mobile)
    const [search, setSearch] = useState('')

    const filteredCities = useMemo(() => {
        return cities.filter((city) => city.name.toLowerCase().includes(search.toLowerCase()))
    }, [cities, search])

    return (
        <AuthList
            list={filteredCities}
            search={search}
            setSearch={setSearch}
            title="Выберите город"
            placeholder="В каком вы городе?"
            onClick={(el) => {
                navigate(`/mobile/${el.code}`)
            }}
        />
    )
}
