import { AutoCompleteCols, DateTimeCols } from '../page/Common.jsx'
import { useMemo } from 'react'
import { parceZone } from '../../ui/hooks/common_functions.js'
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

export function NormalizeFilterModel(model) {
    if (!model?.items) return model
    return {
        ...model,
        items: model.items.map((item) => {
            if (!item) return item

            if (AutoCompleteCols.includes[item.field] && item.value) {
                const d = new Date(item.value)
                const yyyy = d.getFullYear()
                const mm = String(d.getMonth() + 1).padStart(2, '0')
                const dd = String(d.getDate()).padStart(2, '0')
                const hh = String(d.getHours()).padStart(2, '0')
                const min = String(d.getMinutes()).padStart(2, '0')
                return {
                    ...item,
                    value: `${yyyy}-${mm}-${dd}T${hh}:${min}`,
                }
            }
            return item
        }),
    }
}
