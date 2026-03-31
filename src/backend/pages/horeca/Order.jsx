import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {center_horeca_order_get} from "../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"

const Order = ({props}) => {

    const dispatch = useDispatch()
    const [order, set_order] = useState(null)
    const [order_expended, set_order_expended] = useState([])
    const filial = useSelector(state => state.center.filial)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_order_get(filial, props.uid, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                set_order(fetching_result.data)
            }
        }
        if (props.uid !== null) fetch()
        return () => {
            set_order(null)
        }
    }, [dispatch])

    if (order !== null) {
        return <Box className='center-horeca-page' sx={{
            display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap',
        }}>
            <Box sx={{width: 'calc(100% - 400px - 10px)', overflowY: 'auto'}}>
                {order.items?.rows?.length > 0 && <DataGridPro
                    sortingMode="server"
                    disableColumnSorting
                    editMode='cell'
                    checkboxSelection
                    rows={order.items.rows}
                    columns={order.items.columns}
                    columnGroupingModel={order.items.column_grouping_model}
                    columnVisibilityModel={order.items.column_visibility_model}
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
                    treeDataExpandedRowIds={order_expended}
                    onTreeDataExpandedRowIdsChange={newExpanded => {
                        set_order_expended(newExpanded)
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