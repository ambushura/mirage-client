import {Autocomplete, CircularProgress, TextField} from "@mui/material"
import {useAsyncSelect} from "./hooks/useAsyncSelect.jsx"
import {useEffect, useRef} from "react"

export default function AsyncAutocomplete({
                                              source,
                                              variant,
                                              sx,
                                              filial,
                                              type,
                                              value,
                                              onChange,
                                              label = "Выбери",
                                              getOptionLabel = (o) => o?.name ?? ""
                                          }) {

    const {options, loading, inputValue, setInputValue} = useAsyncSelect({filial, type, value})
    const selected = options.find(o => o.uid === value) ?? null
    const inputRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }, [])

    return <Autocomplete
        autoFocus
        openOnFocus
        blurOnSelect
        noOptionsText="Ничего не найдено"
        loadingText="Загрузка..."
        openText="Открыть"
        closeText="Закрыть"
        clearText="Очистить"
        sx={[sx, source === 'table' ? {
            height: '100%', '& .MuiFormControl-root': {
                height: '100%'
            }, '& .MuiInputBase-root': {
                fontSize: 14,
                height: '100% !important',
                padding: '0 3px',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent'
            }, '& input': {
                padding: '0px 6px !important'
            }
        } : null]}
        options={options}
        value={selected}
        loading={loading}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(a, b) => a?.uid === b?.uid}
        inputValue={inputValue}
        onInputChange={(e, val) => setInputValue(val)}
        onChange={(e, val) => {
            onChange?.(val?.uid ?? null)
        }}
        renderOption={(props, option) => <li {...props} key={option.uid}>{option.name}</li>}
        renderInput={(params) => {
            return <TextField
                inputRef={inputRef}
                variant={variant}
                {...params}
                label={source === 'table' ? '' : label}
                InputProps={{
                    ...params.InputProps, disableUnderline: source === 'table', endAdornment: <>
                        {loading && <CircularProgress size={source === 'table' ? 16 : 18}/>}
                        {params.InputProps.endAdornment}
                    </>
                }}
            />
        }}
    />
}