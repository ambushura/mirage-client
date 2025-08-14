import {Box, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {useSetOperations} from "./useSetOperations.js"
import Loader from "../../../../ui/Loader.jsx"

const Operations = () => {

    const [fetch_data_operations, fetch_errors_operations, fetch_loading_operations] = useSetOperations()

    if (fetch_data_operations !== null) {
        return (
            <>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '80px repeat(4, 400px)',
                    borderBottom: '1px solid #ccc'
                }}><Box/>
                    {fetch_data_operations.wallets.map((wallet) => {
                        return (
                            <Box key={wallet} sx={{
                                textAlign: 'center',
                                borderLeft: '1px solid #ccc',
                                borderRight: '1px solid #ccc'
                            }}>
                                <Typography variant="subtitle2">{wallet}</Typography>
                            </Box>
                        )
                    })}
                </Box>

                <DataGrid
                    rows={fetch_data_operations.rows}
                    columns={fetch_data_operations.columns}
                    hideFooter
                    rowHeight={24}
                    headerHeight={28}
                    getRowClassName={(params) =>
                        params.row.isTotalRow ? 'total-row' : ''
                    }
                    sx={{
                        '& .total-row': {
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-cell': {
                            padding: '0 4px',
                            fontSize: '0.8rem',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontSize: '0.8rem',
                        },
                    }}
                />
            </>
        )
    } else {
        return (
            <Loader/>
        )
    }
}

export default Operations