import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cleanOrdersHoreca, setOrdersHoreca} from "../../../redux/centerReducer.js"
import {center_horeca_orders_get} from "../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import dayjs from "dayjs"

const OrdersHoreca = () => {

    const dispatch = useDispatch()

    const {filial, date_shift} = useSelector(state => state.center)

    const {orders_horeca} = useSelector(state => state.center)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_orders_get(filial, date_shift, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                const normalizedData = normalizeOrdersHoreca(fetching_result.data)
                dispatch(setOrdersHoreca(normalizedData))
            }
        }
        if (filial !== undefined) fetch()
        return () => {
            dispatch(cleanOrdersHoreca())
        }
    }, [dispatch, filial, date_shift])

    return <Box sx={{padding: '0 10px', display: "flex", justifyContent: "space-between"}}>
        {orders_horeca.rows.length > 0 ? <DataGridPro
            cellSelection
            disableRowSelectionOnClick
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={orders_horeca.rows}
            columns={orders_horeca.columns}
            columnGroupingModel={orders_horeca.column_grouping_model}
            density="compact"
            rowHeight={30}
            headerHeight={30}
            hideFooterSelectedRowCount
            columnVisibilityModel={orders_horeca.column_visibility_model}
            onColumnVisibilityModelChange={() => {
            }}
            sx={{
                flex: 3, border: 0, borderRadius: '0', '& .MuiDataGrid-cell': {
                    userSelect: 'text'
                }, '& .MuiDataGrid-cellContent': {
                    pointerEvents: 'auto'
                }
            }}

        /> : <Box className='center-title-filial' sx={{paddingLeft: '15px', fontWeight: 300}}>Заказы отсутствуют в
            смене...</Box>}
        {<Box sx={{flex: 2}}>Текущий заказ</Box>}
    </Box>
}

export default OrdersHoreca

export const normalizeOrdersHoreca = (data) => {
    const columns = data.columns.map(col => {
        if (col.type === 'date' || col.type === 'dateTime') {
            return {
                ...col,
                valueGetter: (value) => value,
                valueFormatter: (value) => value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
            }
        }
        return col
    })
    return {
        ...data, columns, rows: data.rows
    }
}