import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {
    cleanOrderHoreca,
    cleanOrdersHoreca,
    setHorecaOrderItemsExpended,
    setOrderHoreca,
    setOrdersHoreca,
    setUidCurrentOrderHoreca
} from "../../../redux/centerReducer.js"
import {center_horeca_order_get, center_horeca_orders_get} from "../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import dayjs from "dayjs"

const OrdersHoreca = () => {

    const dispatch = useDispatch()

    const {
        filial, date_shift, orders_horeca, uid_current_order_horeca, order_horeca, order_horeca_items_expended
    } = useSelector(state => state.center)

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

    // Текущий заказ
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_order_get(filial, uid_current_order_horeca, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                dispatch(setOrderHoreca(fetching_result.data))
            }
        }
        if (filial !== null && uid_current_order_horeca !== null) fetch()
        return () => {
            dispatch(cleanOrderHoreca())
        }
    }, [dispatch, filial, uid_current_order_horeca])

    const getTreeDataPath = (row) => {
        return row.path ? row.path.split(".") : [row.path]
    }

    return <Box sx={{
        padding: '0 10px', display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'
    }}>
        {orders_horeca.rows.length > 0 ? <DataGridPro
            cellSelection
            checkboxSelection
            disableRowSelectionOnClick
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
                dispatch(setUidCurrentOrderHoreca(params.row.id))
            }}
        /> : <Box className='center-title-filial' sx={{paddingLeft: '15px', fontWeight: 300}}>Заказы отсутствуют в
            смене...</Box>}
        {<Box sx={{
            flex: 1,
            ml: 1,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {order_horeca === null ? <Box>Выберите заказ</Box> : <Box>
                <Box>
                    <Box>Счет {order_horeca.current_number}</Box>
                </Box>
                <Box></Box>
                <Box></Box>
                <Box>
                    {order_horeca.items?.rows?.length > 0 && <DataGridPro
                        editMode='cell'
                        checkboxSelection
                        rows={order_horeca.items.rows}
                        columns={order_horeca.items.columns}
                        columnGroupingModel={order_horeca.items.column_grouping_model}
                        columnVisibilityModel={order_horeca.items.column_visibility_model}
                        treeData
                        getTreeDataPath={getTreeDataPath}
                        rowHeight={42}
                        headerHeight={42}
                        density="compact"
                        hideFooter
                        disableRowSelectionOnClick
                        treeDataExpandedRowIds={order_horeca_items_expended}
                        onTreeDataExpandedRowIdsChange={newExpanded => {
                            dispatch(setHorecaOrderItemsExpended(newExpanded))
                        }}
                        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                        groupingColDef={{width: 100, minWidth: 100, headerName: "№"}}
                        sx={{
                            flex: 1, border: 0, borderRadius: 0, '& .MuiDataGrid-cell': {
                                userSelect: 'text'
                            }, '& .MuiDataGrid-treeDataGroupingCell .MuiIconButton-root': {
                                width: 18, height: 18,
                            }, '& .MuiDataGrid-treeDataGroupingCell .MuiSvgIcon-root': {
                                fontSize: 16
                            }, '& .MuiDataGrid-columnHeaders': {
                                fontSize: '12px', fontWeight: 600, backgroundColor: '#f0f0f0'
                            }, '& .MuiDataGrid-columnHeaderTitle': {
                                whiteSpace: 'normal', lineHeight: 1.2
                            }
                        }}
                    />}
                </Box>
            </Box>}
        </Box>}
    </Box>
}

export default OrdersHoreca