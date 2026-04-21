import {Autocomplete, CircularProgress, TextField} from "@mui/material"
import {useAsyncSelect} from "./useAsyncSelect"

export default function AsyncAutocomplete({
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
        noOptionsText="Ничего не найдено"
        loadingText="Загрузка..."
        openText="Открыть"
        closeText="Закрыть"
        clearText="Очистить"
        sx={sx}
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
        renderInput={(params) => <TextField
            variant={variant}
            {...params}
            label={label}
            InputProps={{
                ...params.InputProps, endAdornment: (<>
                    {loading && <CircularProgress size={18}/>}
                    {params.InputProps.endAdornment}
                </>)
            }}
        />}
    />
}