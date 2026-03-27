import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {cleanOrderHoreca, setHorecaOrderItemsExpended, setOrderHoreca} from "../../../redux/center/centerReducer.js"
import {ruRU} from "@mui/x-data-grid/locales"
import {center_horeca_order_get} from "../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"

const Order = () => {

    const dispatch = useDispatch()
    const {
        params, filial, order_horeca, order_horeca_items_expended
    } = useSelector(state => state.center)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_order_get(filial, params.uid_horeca_order, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                dispatch(setOrderHoreca(fetching_result.data))
            }
        }
        if (params.uid_horeca_order !== null) fetch()
        return () => {
            dispatch(cleanOrderHoreca(null))
        }
    }, [dispatch, filial, params.uid_horeca_order])

    if (order_horeca !== null) {
        return <Box className='center-horeca-page' sx={{
            display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap',
        }}>
            <Box sx={{width: 'calc(100% - 400px - 10px)', overflowY: 'auto'}}>
                {order_horeca.items?.rows?.length > 0 && <DataGridPro
                    sortingMode="server"
                    disableColumnSorting
                    editMode='cell'
                    checkboxSelection
                    rows={order_horeca.items.rows}
                    columns={order_horeca.items.columns}
                    columnGroupingModel={order_horeca.items.column_grouping_model}
                    columnVisibilityModel={order_horeca.items.column_visibility_model}
                    treeData
                    getRowClassName={(params) => params.row.is_leaf === false ? 'center-horeca-order-ref' : ''}
                    getTreeDataPath={(row) => {
                        return row.path ? row.path.split(".") : [row.path]
                    }}
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
                        width: '100%', border: 0, borderRadius: 0, '& .MuiDataGrid-cell': {
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
            <Box sx={{width: '400px', ml: '10px', backgroundColor: 'white'}}>

            </Box>
        </Box>
    }
}

export default Order