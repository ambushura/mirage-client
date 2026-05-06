import {useEffect, useMemo, useRef} from 'react'
import {Autocomplete, CircularProgress, TextField} from '@mui/material'

import {useAsyncSelect} from '../backoffice/hooks/useAsyncSelect.jsx'

export default function AsyncAutocomplete({
                                              setCatalogMap,
                                              disabled,
                                              source,
                                              variant,
                                              sx,
                                              filial,
                                              type,
                                              value,
                                              onChange,
                                              label = 'Выбери',
                                              getOptionLabel = (option) => option?.name ?? '',
                                          }) {
    const {options, loading, inputValue, setInputValue} = useAsyncSelect({
        filial,
        type,
        value,
    })

    const inputRef = useRef(null)

    const selected = useMemo(
        () => options.find((option) => option.uid === value) ?? null,
        [options, value]
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })

        return () => clearTimeout(timer)
    }, [])

    const handleChange = (_, option) => {
        if (!option) {
            onChange?.(null)
            return
        }

        setCatalogMap?.((prev) => {
            const exists = prev.some((item) => item.uid === option.uid && item.type === type)

            if (exists) return prev

            return [
                ...prev,
                {
                    uid: option.uid,
                    type,
                    name: option.name,
                },
            ]
        })

        onChange?.(option.uid)
    }

    return (
        <Autocomplete
            disabled={disabled}
            blurOnSelect
            autoFocus
            noOptionsText="Ничего не найдено"
            loadingText="Загрузка..."
            openText="Открыть"
            closeText="Закрыть"
            clearText="Очистить"
            options={options}
            value={selected}
            loading={loading}
            inputValue={inputValue}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(a, b) => a?.uid === b?.uid}
            onInputChange={(_, val) => setInputValue(val)}
            onChange={handleChange}
            sx={[
                sx,
                ...(source === 'table'
                    ? [
                        {
                            height: '100%',
                            '& .MuiFormControl-root': {
                                height: '100%',
                            },
                            '& .MuiInputBase-root': {
                                height: '100% !important',
                                padding: '0 3px',
                                fontSize: 14,
                                display: 'flex',
                                alignItems: 'center',
                                background: 'transparent',
                            },
                            '& input': {
                                padding: '0 6px !important',
                            },
                        },
                    ]
                    : []),
            ]}
            renderOption={(props, option) => (
                <li {...props} key={option.uid}>
                    {option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputRef={inputRef}
                    variant={variant}
                    label={source === 'table' ? '' : label}
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: source === 'table',
                        endAdornment: (
                            <>
                                {loading && <CircularProgress size={source === 'table' ? 16 : 18}/>}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}
