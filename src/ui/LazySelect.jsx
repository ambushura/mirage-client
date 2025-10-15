import {useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Autocomplete, CircularProgress, TextField} from '@mui/material'
import {common_lazy_list_get} from "../service/fetch_service.js"

export default function LazySelect({
                                       label,
                                       value,
                                       type,
                                       filial,
                                       onChange,
                                       getLabel = item => item.title,
                                       getValue = item => item.uid,
                                       extraFields = [],
                                       optionsStatic = null,
                                       disabled = false,
                                       sx,
                                   }) {
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [initialized, setInitialized] = useState(false)

    const fetch_options = async () => {
        if (loading || optionsStatic) return
        setLoading(true)
        const data = await dispatch(common_lazy_list_get(filial, type))
        if (Array.isArray(data)) setOptions(data)
        setLoading(false)
        setInitialized(true)
    }

    useEffect(() => {
        if (optionsStatic) {
            setOptions(optionsStatic)
            return
        }
        if (value && !options.length && !loading && !initialized) {
            fetch_options()
        }
    }, [value, optionsStatic])

    const allOptions = useMemo(() => {
        const base = optionsStatic || options
        if (!value) return base
        const exists = base.some(o => getValue(o) === value)
        return exists ? base : [{uid: value, title: 'Объект не найден…'}, ...base]
    }, [options, optionsStatic, value])

    const currentItem = allOptions.find(o => getValue(o) === value) || null

    const handleChange = (_, newItem) => {
        if (!newItem || newItem.title === 'Объект не найден…') {
            onChange(null)
            return
        }
        const extra = extraFields.reduce((acc, key) => {
            if (newItem && newItem[key] !== undefined) acc[key] = newItem[key]
            return acc
        }, {})
        onChange(getValue(newItem), extra)
    }

    return <Autocomplete
        value={currentItem}
        onChange={handleChange}
        onOpen={fetch_options}
        options={allOptions}
        getOptionLabel={getLabel}
        loading={loading}
        disabled={disabled}
        sx={sx}
        noOptionsText="Нет данных"
        renderOption={(props, option) => <li
            {...props}
            style={option.title === 'Объект не найден…' ? {opacity: 0.6, fontStyle: 'italic'} : {}}>
            {option.title}
        </li>}
        renderInput={(params) => <TextField
            {...params}
            label={label}
            variant="filled"
            InputProps={{
                ...params.InputProps, endAdornment: (<>
                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                    {params.InputProps.endAdornment}
                </>),
            }}
        />}
    />
}