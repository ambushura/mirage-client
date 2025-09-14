import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import {common_documents_zbooks_get} from "../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {cleanZBooks, setZBooks} from "../../../../redux/documentsReducer.js"
import {Box} from "@mui/material"
import Loader from "../../../../ui/Loader.jsx"

const Zbooks = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {columns, rows, update} = useSelector(state => state.documents.zbooks)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_zbooks_get(filial, param_date_admin, update))
            set_fetching(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                dispatch(setZBooks(fetching_result.data))
            }
        }
        dispatch(cleanZBooks())
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
        return () => dispatch(cleanZBooks())
    }, [dispatch, filial, param_date_admin, update])

    const [columnVisibility, set_visibility] = useState({
        id: false
    })

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else if (fetching.loading && fetching.error === null && fetching.data === null) {
        return <Loader/>
    } else if (!fetching.loading && fetching.error !== null && fetching.data === null) {
        return <Box className='empty-box'>{fetching.error}</Box>
    } else if (!fetching.loading && fetching.error === null && fetching.data !== null) {
        if (rows.length === 0 || columns.length === 0) {
            return <Box className='empty-box'>Документы отсутствуют...</Box>
        } else {
            return <DataGrid
                hideFooter
                checkboxSelection
                rows={rows}
                columns={columns}
                pageSize={20}
                pageSizeOptions={[10, 25, 50]}
                rowHeight={26}
                headerHeight={28}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columnVisibilityModel={columnVisibility}
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
        }
    }
}

export default Zbooks