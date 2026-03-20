import React from 'react'
import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import dayjs from "dayjs"
import {useNavigate} from "react-router-dom"

const OrdersHoreca = () => {

    const navigate = useNavigate()

    const {orders_horeca_loading, orders_horeca} = useSelector(state => state.center)

    const formattedColumns = orders_horeca.columns.map(col => {
        if (col.type === 'date' || col.type === 'dateTime') {
            return {
                ...col, valueFormatter: (val) => {
                    return val ? dayjs(val).format('DD.MM.YYYY HH:mm') : ''
                }
            }
        }
        return col
    })

    return <Box className='center-horeca-page' sx={{
        display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', overflow: 'auto'
    }}>
        <DataGridPro
            loading={orders_horeca_loading.loading}
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={orders_horeca.rows}
            columns={formattedColumns}
            columnGroupingModel={orders_horeca.column_grouping_model}
            density="compact"
            rowHeight={42}
            headerHeight={42}
            hideFooterSelectedRowCount
            columnVisibilityModel={orders_horeca.column_visibility_model}
            onColumnVisibilityModelChange={() => {
            }}
            sortingMode="server"
            disableColumnSorting
            editMode="cell"
            sx={{
                height: 'calc(100vh - var(--center-header-height) - var(--center-submenu-height) - 10px)',
                minHeight: 'inherit',
                flex: 1,
                border: 0,
                borderRadius: '0',
                '& .MuiDataGrid-cellContent': {
                    pointerEvents: 'auto'
                },
                '& .MuiDataGrid-columnHeaders': {
                    fontSize: '12px', fontWeight: 600, backgroundColor: '#f0f0f0'
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    whiteSpace: 'normal', lineHeight: 1.2
                }
            }}
            onRowClick={(params) => {
                navigate(`/center/horeca/orders/${params.row.id}`)
            }}
        />
    </Box>
}

export default OrdersHoreca