import {Box, Pagination, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {useSetOperations} from "./useSetOperations.js"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {setOperations, setOperationsPage} from "../../../../redux/documentsReducer.js"
import {ruRU} from "@mui/x-data-grid/locales";

const Operations = () => {

    const dispatch = useDispatch()
    const [fetch_data_operations, fetch_errors_operations, fetch_loading_operations] = useSetOperations()

    useEffect(() => {
        if (fetch_data_operations !== null) {
            dispatch(setOperations(fetch_data_operations))
        }
    }, [dispatch, fetch_data_operations])

    const {wallets, columns, rows, pages, page} = useSelector(state => state.documents.operations)

    return (
        <>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '130px repeat(4, 400px)',
                borderBottom: '1px solid #ccc',
                height: '30px',
            }}><Box/>
                {wallets.map((wallet) => {
                    return (
                        <Box key={wallet} sx={{
                            textAlign: 'center',
                            borderLeft: '1px solid #ccc',
                            borderRight: '1px solid #ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography variant="subtitle2">{wallet}</Typography>
                        </Box>
                    )
                })}
            </Box>

            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                checkboxSelection
                rows={rows}
                columns={columns}
                hideFooter
                rowHeight={26}
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
                        fontSize: '0.9rem',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontSize: '0.9rem',
                    },
                }}
            />

            <Pagination sx={{
                height: '60px',
                backgroundColor: 'var(--bgr-color)',
                padding: '10px 0',
                width: '100%',
                zIndex: 1,
            }}
                        page={page}
                        onChange={(event, value) => dispatch(setOperationsPage(value))}
                        size={'large'}
                        count={pages}
                        showFirstButton showLastButton/>

        </>
    )
}

export default Operations