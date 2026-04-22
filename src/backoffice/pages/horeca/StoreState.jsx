import {useCallback, useMemo} from "react"
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {DataGridPro, useGridApiRef} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {useTreeExpansionSync} from "../../../ui/hooks/useTreeExpansionSync.js"
import {setStoreStateExpended, setUidCurrentStore} from "../../../redux/center/centerHorecaReducer.js"
import {openModal} from "../../../redux/interfaceReducer.js"
import {sxTable} from "../../../ui/ThemeContext.jsx"

const StoreState = () => {

    const apiRef = useGridApiRef()

    const dispatch = useDispatch()
    const {store_state_loading, store_state, store_state_expended} = useSelector(state => state.center_horeca)

    const rows = useMemo(() => store_state?.rows ?? [], [store_state?.rows])
    const columns = useMemo(() => store_state?.columns ?? [], [store_state?.columns])
    const column_grouping_model = useMemo(() => store_state?.column_grouping_model ?? [], [store_state?.column_grouping_model])
    const column_visibility_model = useMemo(() => store_state?.column_visibility_model ?? {}, [store_state?.column_visibility_model])

    useTreeExpansionSync({
        apiRef,
        rows,
        expanded: store_state_expended,
        set_expanded: (id) => dispatch(setStoreStateExpended(id)),
        defaultLevel: 2
    })

    const handleSelectionChange = useCallback(() => {
        const uid_store_array = []
        apiRef.current?.getSelectedRows().forEach((row) => {
            if (row.level === 2) {
                uid_store_array.push(row.uid_store)
            }
        })
        dispatch(setUidCurrentStore(uid_store_array))
    }, [dispatch, apiRef])

    const handleCellDoubleClick = useCallback((e) => {
        if (e.row.level === 3) {
            dispatch(openModal({
                type: 'center_items_movement', props: {id: e.row.id}
            }))
        }
    }, [dispatch])

    const getRowClassName = useCallback((params) => {
        const classes = []
        if (params.row.quantity_need < 0 && params.row.level > 1) {
            classes.push("center-store-quantity-need-error")
        }
        classes.push(`center-store-state-level-${params.row.level}`)
        return classes.join(" ")
    }, [])

    return <Box sx={{
        width: 'calc(100% - 20px)', height: "100%", ml: "10px", overflow: "hidden"
    }}>
        <DataGridPro
            apiRef={apiRef}
            loading={store_state_loading.loading}
            rows={rows}
            columns={columns}
            columnGroupingModel={column_grouping_model}
            columnVisibilityModel={column_visibility_model}
            treeData
            getTreeDataPath={(row) => row.path}
            getRowId={(row) => row.id}
            editMode="cell"
            checkboxSelection
            disableRowSelectionOnClick
            rowHeight={40}
            headerHeight={40}
            density="compact"
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            getRowClassName={getRowClassName}
            onCellDoubleClick={handleCellDoubleClick}
            onRowSelectionModelChange={handleSelectionChange}
            sx={sxTable}
        />
    </Box>
}

export default StoreState