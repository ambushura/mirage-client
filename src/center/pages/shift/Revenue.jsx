import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {common_reports_sales_get} from "../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"

const Revenue = () => {

    const cities = useSelector(state => state.data.cities)

    return <Box className='center-scroll' sx={{width: '100%', height: '100%', overflow: 'auto'}}>
        {cities.map(city => {
            return <>
                {city.filials.map(filial => {
                    return <Box key={filial.uid}>
                        <FilialRevenue filial={filial}/>
                    </Box>
                })}
            </>
        })}
    </Box>
}

export default Revenue

export const FilialRevenue = ({filial}) => {

    const dispatch = useDispatch()

    const [sales, set_sales] = useState({columns: [], rows: [], columnGroupingModel: []})
    const [columnVisibilityModel, set_columnVisibilityModel] = useState({type: false, level: false})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_reports_sales_get(filial, '2026-02-05', 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                const data = fetching_result.data
                const columns = data.columns.map(column => {
                    if (column.field === 'label') {
                        return {
                            ...column, headerName: filial.name
                        }
                    }
                    return column
                })
                set_sales({
                    ...data, columns
                })
            }
        }
        if (filial !== undefined) fetch()
    }, [dispatch, filial])

    return <Box sx={{minHeight: '100%', display: 'flex'}}>
        {sales.rows.length > 1 ? <DataGridPro
            cellSelection
            disableRowSelectionOnClick
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={sales.rows.map((r, i) => ({...r, id: i}))}
            columns={sales.columns}
            columnGroupingModel={sales.columnGroupingModel}
            density="compact"
            rowHeight={28}
            headerHeight={28}
            hideFooterSelectedRowCount
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(model) => {
                set_columnVisibilityModel(model)
            }}
            getRowClassName={(params) => {
                const label = params.row.label
                // ВСЕГО
                if (label === 'ВСЕГО') {
                    return 'row-total-grand'
                }
                // Организация
                if (!label.startsWith('  └─') && !label.startsWith('    └─')) {
                    return 'row-total-owner'
                }
                // Пользователь
                if (label.startsWith('  └─') && !label.startsWith('    └─')) {
                    return 'row-user'
                }
                // ККТ
                if (label.startsWith('    └─')) {
                    return 'row-kkt'
                }
                return ''
            }}
            sx={{
                flex: 1, border: 0, borderRadius: '0', '& .MuiDataGrid-cell': {
                    userSelect: 'text'
                }, '& .MuiDataGrid-cellContent': {
                    pointerEvents: 'auto'
                }
            }}

        /> : <Box>Выручка отсутствует в смене...</Box>}
    </Box>
}