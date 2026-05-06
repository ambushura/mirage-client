import { MapTypes } from '../backoffice/Common.jsx'
import AsyncAutocomplete from './AsyncAutocomplete.jsx'

const AutocompleteColumn = (filial, col, catalog_map, set_catalog_map) => {
    return {
        ...col,
        editable: true,

        renderCell: (params) => {
            const item = catalog_map.find((el) => el.type === MapTypes[col.field] && el.uid === params.value)
            return item?.name ?? params.row[col.field] ?? ''
        },

        renderEditCell: (params) => {
            return (
                <AsyncAutocomplete
                    setCatalogMap={set_catalog_map}
                    value={params.value}
                    filial={filial}
                    type={MapTypes[col.field]}
                    variant="standard"
                    source="table"
                    sx={{ width: '100%', height: '100%', backgroundColor: 'transparent !important' }}
                    onChange={(val) => {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: val ?? null,
                        })
                        params.api.stopCellEditMode({
                            id: params.id,
                            field: params.field,
                        })
                    }}
                />
            )
        },
    }
}

export default AutocompleteColumn
