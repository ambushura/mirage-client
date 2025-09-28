import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {common_documents_pinpads_get} from "../../../../service/fetch_service.js"
import {Box} from "@mui/material"
import {cleanZPinpads, setZPinpads} from "../../../../redux/documentsReducer.js"
import Loader from "../../../../ui/Loader.jsx"

const ZPinpads = () => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {rows, update} = useSelector(state => state.documents.zpinpads)
    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_pinpads_get(filial, param_date_admin, update))
            set_fetching(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && !fetching_result.loading && fetching_result.data !== null) {
                dispatch(setZPinpads(fetching_result.data))
            }
        }
        dispatch(cleanZPinpads())
        if (filial !== undefined) {
            fetch()
        }
        return () => dispatch(cleanZPinpads())
    }, [dispatch, filial, param_date_admin, update])

    const columns = [{field: 'id', headerName: 'ID', width: 10}, {
        field: 'name_organization', headerName: 'Организация', width: 100
    }, {field: 'inn', headerName: 'ИНН', width: 100}, {
        field: 'number_pinpad', headerName: 'ID', width: 130
    }, {field: 'date_shift', headerName: 'Смена', width: 90}, {
        field: 'slip_15', headerName: '15', type: 'number', width: 100
    }, {field: 'slip_19', headerName: '19', type: 'number', width: 100}, {
        field: 'slip_25', headerName: '25', type: 'number', width: 100
    }, {field: 'slip_39', headerName: '39', type: 'number', width: 100}, {
        field: 'slip_65', headerName: '65', type: 'number', width: 100
    }, {field: 'slip_67', headerName: '67', type: 'number', width: 100}, {
        field: 'slip_90', headerName: '90', width: 100
    }, {field: 'type', headerName: 'Т', type: 'number', width: 100},]

    const [columnVisibility, setVisibility] = useState({
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
            return <Box className='empty-box'>Итоги смены отсутствуют...</Box>
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

export default ZPinpads