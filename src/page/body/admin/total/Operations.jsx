import {Box, Pagination, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {cleanOperations, setOperations, setOperationsPage} from "../../../../redux/documentsReducer.js"
import {ruRU} from "@mui/x-data-grid/locales"
import {common_documents_operations_get} from "../../../../service/fetch_service.js"

const Operations = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const {wallets, columns, rows} = useSelector(state => state.documents.operations)
    const {operations_pages, operations_page} = useSelector(state => state.documents)
    const {update} = useSelector(state => state.documents.operations)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_operations_get(filial, operations_page, update))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                dispatch(setOperations(fetching_result.data))
            }
        }
        dispatch(cleanOperations())
        if (filial !== undefined) {
            fetch()
        }
        return () => dispatch(cleanOperations())
    }, [dispatch, filial, operations_page, update])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else if (rows.length === 0 || columns.length === 0) {
        return <Box className='empty-box'>Документы отсутствуют...</Box>
    } else {
        return <>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '130px repeat(4, 400px)',
                borderBottom: '1px solid #ccc',
                height: '30px',
            }}><Box/>
                {wallets.map((wallet) => {
                    return (<Box key={wallet} sx={{
                        textAlign: 'center',
                        borderLeft: '1px solid #ccc',
                        borderRight: '1px solid #ccc',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography variant="subtitle2">{wallet}</Typography>
                    </Box>)
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
                getRowClassName={(params) => params.row.isTotalRow ? 'total-row' : ''}
                sx={{
                    '& .total-row': {
                        backgroundColor: '#f0f0f0', fontWeight: 'bold',
                    }, '& .MuiDataGrid-cell': {
                        padding: '0 4px', fontSize: '0.9rem',
                    }, '& .MuiDataGrid-columnHeaderTitle': {
                        fontSize: '0.9rem',
                    },
                }}
            />

            <Pagination sx={{
                height: '60px', backgroundColor: 'var(--bgr-color)', padding: '10px 0', width: '100%', zIndex: 1,
            }}
                        page={operations_page}
                        onChange={(event, value) => dispatch(setOperationsPage(value))}
                        size={'large'}
                        count={operations_pages}
                        showFirstButton showLastButton/>

        </>
    }
}

export default Operations