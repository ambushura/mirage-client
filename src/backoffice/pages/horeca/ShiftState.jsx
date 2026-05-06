import {useMemo} from 'react'
import {Box} from '@mui/material'
import {useSelector} from 'react-redux'
import {DataGridPro, useGridApiRef} from '@mui/x-data-grid-pro'
import {ruRU} from '@mui/x-data-grid/locales'

const ShiftState = () => {
    const apiRef = useGridApiRef()

    const {shift_state_loading, shift_state, shift_state_expended} = useSelector(
        (state) => state.center_horeca
    )

    const rows = useMemo(() => shift_state?.rows ?? [], [shift_state?.rows])
    const columns = useMemo(() => shift_state?.columns ?? [], [shift_state?.columns])
    const column_grouping_model = useMemo(
        () => shift_state?.column_grouping_model ?? [],
        [shift_state?.column_grouping_model]
    )
    const column_visibility_model = useMemo(
        () => shift_state?.column_visibility_model ?? {},
        [shift_state?.column_visibility_model]
    )

    return (
        <Box
            sx={{
                width: 'calc(100% - 20px)',
                height: '100%',
                ml: '10px',
                overflow: 'hidden',
            }}
        >
            <DataGridPro
                apiRef={apiRef}
                loading={shift_state_loading.loading}
                rows={rows}
                columns={columns}
                columnGroupingModel={column_grouping_model}
                columnVisibilityModel={column_visibility_model}
                treeData
                getTreeDataPath={(row) => row.path}
                getRowId={(row) => row.id}
                sortingMode="server"
                disableColumnSorting
                editMode="cell"
                checkboxSelection
                disableRowSelectionOnClick
                rowHeight={40}
                headerHeight={40}
                density="compact"
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                getRowClassName={(params) => {
                    const classes = []
                    if (params.row.quantity_need < 0) {
                        classes.push('center-store-quantity-need-error')
                    }
                    classes.push(`center-store-state-level-${params.row.level}`)
                    return classes.join(' ')
                }}
                onCellDoubleClick={() => {
                    alert('Привет')
                }}
                onRowSelectionModelChange={() => {
                }}
            />
    </Box>
    )
}

export default ShiftState
