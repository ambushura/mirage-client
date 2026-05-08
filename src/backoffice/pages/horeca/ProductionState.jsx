import { useMemo } from 'react'
import { Box } from '@mui/material'
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro'
import { ruRU } from '@mui/x-data-grid/locales'
import { useSelector } from 'react-redux'

const ProductionState = () => {
    const apiRef = useGridApiRef()

    const { production_state_loading, production_state, production_state_expended } = useSelector((state) => state.center_horeca)

    const rows = useMemo(() => production_state?.rows ?? [], [production_state?.rows])
    const columns = useMemo(() => production_state?.columns ?? [], [production_state?.columns])
    const column_grouping_model = useMemo(() => production_state?.column_grouping_model ?? [], [production_state?.column_grouping_model])
    const column_visibility_model = useMemo(
        () => production_state?.column_visibility_model ?? {},
        [production_state?.column_visibility_model]
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
                loading={production_state_loading.loading}
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
                onRowSelectionModelChange={() => {}}
            />
        </Box>
    )
}

export default ProductionState
