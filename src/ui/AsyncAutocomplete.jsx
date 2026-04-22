import {Autocomplete, CircularProgress, TextField} from "@mui/material"
import {useAsyncSelect} from "./useAsyncSelect"

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
                height: '100% !important', padding: '0 4px', display: 'flex', alignItems: 'center'
            }, '& input': {
                padding: '4px 6px !important'
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