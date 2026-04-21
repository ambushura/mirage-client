import {Autocomplete, CircularProgress, TextField} from "@mui/material"
import {useAsyncSelect} from "./useAsyncSelect"

export default function AsyncAutocomplete({
                                              sx,
                                              filial,
                                              type,
                                              value,
                                              onChange,
                                              label = "Выбери",
                                              getOptionLabel = (o) => o?.name ?? ""
                                          }) {

    const {options, loading, inputValue, setInputValue} = useAsyncSelect({filial, type, value})

    return <Autocomplete

        sx={sx}
        options={options}
        value={value}
        loading={loading}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(a, b) => a?.uid === b?.uid}
        inputValue={inputValue}
        noOptionsText={inputValue ? 'Ничего не найдено' : 'Начните ввод'}
        loadingText='Загрузка...'
        onInputChange={(e, val) => {
            setInputValue(val)
        }}

        onChange={(e, val) => {
            onChange?.(val ?? null)
        }}

        renderOption={(props, option) => <li {...props} key={option.uid}>{option.name}</li>}

        renderInput={(params) => <TextField
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