import React, {useEffect, useMemo} from "react"
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"

import {center_horeca_store_state_get} from "../../../service/fetch_service.js"
import {cleanStoreState, setStoreState} from "../../../redux/centerReducer.js"

const StoreState = () => {

    const dispatch = useDispatch()
    const {filial, store_state} = useSelector(state => state.center)

    useEffect(() => {
        if (!filial) return

        const load = async () => {
            const result = await dispatch(center_horeca_store_state_get(filial, 0))

            if (!result.loading && result.data && !result.error) {
                dispatch(setStoreState(result.data))
            }
        }

        load()

        return () => {
            dispatch(cleanStoreState(null))
        }
    }, [dispatch, filial])

    const rows = useMemo(() => store_state?.rows ?? [], [store_state])
    const columns = useMemo(() => store_state?.columns ?? [], [store_state])
    const columnGroupingModel = useMemo(() => store_state?.column_grouping_model ?? [], [store_state])
    const columnVisibilityModel = useMemo(() => store_state?.column_visibility_model ?? {}, [store_state])

    return <Box sx={{
        width: "100%", height: "100%", ml: "10px", overflow: "hidden"
    }}>
        {rows.length > 0 && <DataGridPro
            rows={rows}
            columns={columns}
            columnGroupingModel={columnGroupingModel}
            columnVisibilityModel={columnVisibilityModel}

            treeData
            getTreeDataPath={(row) => row.path}
            getRowId={(row) => row.id}

            sortingMode="server"
            disableColumnSorting
            editMode="cell"

            checkboxSelection
            disableRowSelectionOnClick
            hideFooter

            rowHeight={40}
            headerHeight={40}
            density="compact"

            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}

            getRowClassName={(params) => {
                if (params.row.level === 1) return "center-store-state-level-1"
                if (params.row.level === 2) return "center-store-state-level-2"
                if (params.row.level === 3) return "center-store-state-level-3"
                return ""
            }}

            sx={{
                width: "100%", height: "100%", border: 0, borderRadius: 0,

                "& .MuiDataGrid-cell": {
                    userSelect: "text"
                },

                "& .MuiDataGrid-columnHeaders": {
                    fontSize: "12px", fontWeight: 600, backgroundColor: "#f7f7f7"
                },

                "& .store-delta-positive": {
                    backgroundColor: "#fff5f5"
                },

                "& .store-delta-negative": {
                    backgroundColor: "#f0fff4"
                }
            }}
        />}
    </Box>
}

export default StoreState