import {AutoCompleteCols, DateTimeCols} from '../Common.jsx'
import {useMemo} from 'react'
import {parceZone} from '../../ui/hooks/common_functions.js'
import AutocompleteColumn from '../../ui/AutocompleteColumn.jsx'

function DateTimeColumn(col) {
    return {
        ...col,
        editable: true,
        valueGetter: (params) => {
            if (!params) return null
            const str = parceZone(params)
            return new Date(str)
        },
    }
}

export function useTableColumns(table, filial, catalog_map, set_catalog_map) {
    return useMemo(() => {
        return table.columns.map((col) => {
            if (AutoCompleteCols.includes(col.field)) {
                return AutocompleteColumn(filial, col, catalog_map, set_catalog_map)
            }
            if (DateTimeCols.includes(col.field)) {
                return DateTimeColumn(col)
            }
            return col
        })
    }, [table.columns, filial, catalog_map, set_catalog_map])
}
