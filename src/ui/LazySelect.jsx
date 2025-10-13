import {useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import {common_lazy_list_get} from "../service/fetch_service.js"

export default function LazySelect({
                                       variant,
                                       sx,
                                       label,
                                       value,
                                       type,
                                       filial,
                                       onChange,
                                       getLabel = item => item.title,
                                       getValue = item => item.uid,
                                       extraFields = [],
                                       fullWidth = true,
                                       disabled = false,
                                   }) {
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [initialized, setInitialized] = useState(false)

    const fetch_options = async () => {
        if (loading) return
        setLoading(true)
        const data = await dispatch(common_lazy_list_get(filial, type))
        if (Array.isArray(data)) setOptions(data)
        setLoading(false)
        setInitialized(true)
    }

    const handleOpen = async () => {
        if (options.length || loading) return
        await fetch_options()
    }

    const handleChange = e => {
        const uid = e.target.value
        const item = options.find(o => getValue(o) === uid)
        const extra = extraFields.reduce((acc, key) => {
            if (item && item[key] !== undefined) acc[key] = item[key]
            return acc
        }, {})
        onChange(uid, extra)
    }

    useEffect(() => {
        if (value && !options.length && !loading && !initialized) {
            fetch_options()
        }
    }, [value, options.length])

    useEffect(() => {
        if (value && options.length) {
            const exists = options.some(o => getValue(o) === value)
            if (!exists && !loading) fetch_options()
        }
    }, [value, options])

    const displayedOptions = useMemo(() => {
        if (!value) return options
        const exists = options.some(o => getValue(o) === value)
        if (!exists && !loading) {
            return [{uid: value, title: 'Объект не найден…'}, ...options,]
        }
        return options
    }, [options, value, loading])

    return <FormControl variant={variant} fullWidth={fullWidth} disabled={disabled} sx={sx}>
        <InputLabel>{label}</InputLabel>
        <Select
            label={label}
            value={value || ''}
            onChange={handleChange}
            onOpen={handleOpen}>
            {loading ? <MenuItem disabled>
                <CircularProgress size={20}/>
            </MenuItem> : displayedOptions.length ? displayedOptions.map(opt => <MenuItem
                key={getValue(opt)}
                value={getValue(opt)}
                disabled={opt.title === 'Объект не найден…'}
                style={opt.title === 'Объект не найден…' ? {opacity: 0.6, fontStyle: 'italic'} : {}}>
                {getLabel(opt)}
            </MenuItem>) : <MenuItem disabled>Нет данных</MenuItem>}
        </Select>
    </FormControl>
}