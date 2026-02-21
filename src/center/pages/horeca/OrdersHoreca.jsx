import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cleanOrdersHoreca, setOrdersHoreca,} from "../../../redux/centerReducer.js"
import {center_horeca_orders_get} from "../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import dayjs from "dayjs"
import {useNavigate} from "react-router-dom"

const OrdersHoreca = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {filial, date_shift, orders_horeca} = useSelector(state => state.center)

    // Заказы
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_orders_get(filial, date_shift, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                dispatch(setOrdersHoreca(fetching_result.data))
            }
        }
        if (filial !== null) fetch()
        return () => {
            dispatch(cleanOrdersHoreca())
        }
    }, [dispatch, filial, date_shift])

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

    return <Box sx={{
        padding: '0 10px', display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'
    }}>
        {orders_horeca.rows.length > 0 ? <DataGridPro
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
            sx={{
                height: 'calc(100vh - var(--center-header-height) - var(--center-submenu-height))',
                flex: 1,
                border: 0,
                borderRadius: '0',
                '& .MuiDataGrid-cell': {
                    userSelect: 'text'
                },
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
        /> : <Box className='center-title-filial' sx={{paddingLeft: '15px', fontWeight: 300}}>Заказы отсутствуют в
            смене...</Box>}
    </Box>
}

export default OrdersHoreca