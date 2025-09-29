import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {common_documents_pinpads_get, common_documents_slips_get} from "../../../../service/fetch_service.js"
import {Box} from "@mui/material"
import {cleanSlips, cleanZPinpads, setSlips, setZPinpads} from "../../../../redux/documentsReducer.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import dayjs from "dayjs"
import {openModal} from "../../../../redux/interfaceReducer.js";

const ZPinpads = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    const uid_pinpad_current = useSelector(state => state.documents.uid_pinpad_current)

    const {zpinpads} = useSelector(state => state.documents.zpinpads)
    const zpinpads_update = useSelector(state => state.documents.zpinpads_update)
    const [fetching_zpinpads, set_fetching_zpinpads] = useState({loading: false, error: null, data: null})

    const slips = useSelector(state => state.documents.slips.slips)
    const slips_update = useSelector(state => state.documents.slips_update)
    const [fetching_slips, set_fetching_slips] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_pinpads_get(filial, param_date_admin, zpinpads_update))
            set_fetching_zpinpads(fetching_result)
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
    }, [dispatch, filial, param_date_admin, zpinpads_update])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_slips_get(filial, param_date_admin, uid_pinpad_current))
            set_fetching_slips(fetching_result)
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && !fetching_result.loading && fetching_result.data !== null) {
                dispatch(setSlips(fetching_result.data))
            }
        }
        dispatch(cleanSlips())
        if (filial !== undefined) {
            fetch()
        }
        return () => dispatch(cleanSlips())
    }, [dispatch, filial, param_date_admin, uid_pinpad_current, zpinpads_update])

    if (filial === undefined) {
        return <Box className='empty-box'>Выберите филиал...</Box>
    } else {
        return <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{minHeight: '50%'}}>
                <DataGridPro
                    hideFooter
                    checkboxSelection
                    rows={zpinpads}
                    columns={columns_zpinpads}
                    pageSize={20}
                    pageSizeOptions={[10, 25, 50]}
                    rowHeight={26}
                    headerHeight={28}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    columnVisibilityModel={{
                        id: false
                    }}
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
            </Box>
            <Box sx={{minHeight: '50%'}}>
                <DataGridPro
                    hideFooter
                    checkboxSelection
                    rows={slips}
                    columns={columns_slips}
                    pageSize={20}
                    pageSizeOptions={[10, 25, 50]}
                    rowHeight={26}
                    headerHeight={28}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    columnVisibilityModel={{
                        id: false,
                        uid_creator: false,
                        uid_order_cinema: false,
                        uid_order_food: false,
                        uid_pinpad: false,

                    }}
                    sx={{
                        '& .total-row': {
                            backgroundColor: '#f0f0f0', fontWeight: 'bold',
                        }, '& .MuiDataGrid-cell': {
                            padding: '0 4px', fontSize: '0.9rem',
                        }, '& .MuiDataGrid-columnHeaderTitle': {
                            fontSize: '0.9rem',
                        },
                    }}
                    pinnedColumns={{
                        left: ['date_shift', 'date_create', 'pinpad_number'],
                        right: ['slip90', 'printed', 'slip_type', 'slip_sum']
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{field: 'date_create', sort: 'desc'}],
                        },
                    }}
                    onRowDoubleClick={(params) => {
                        dispatch(openModal({type: 'slip', props: {uid: params.row.id}}))
                    }}
                />
            </Box>
        </Box>
    }
}

export default ZPinpads

export const columns_zpinpads = [{field: 'id', headerName: 'UID документа', width: 10}, {
    field: 'name_organization', headerName: 'Организация', width: 100
}, {field: 'inn', headerName: 'ИНН', width: 100}, {
    field: 'pinpad_number', headerName: 'ID пинпад', width: 100
}, {field: 'date_shift', headerName: 'Смена', width: 90}, {
    field: 'slip_15', headerName: '15', type: 'number', width: 100
}, {
    field: 'slip_19', headerName: '19', type: 'number', width: 100
}, {
    field: 'slip_25', headerName: '25', type: 'number', width: 100
}, {field: 'slip_39', headerName: '39', type: 'number', width: 100}, {
    field: 'slip_65', headerName: '65', type: 'number', width: 100
}, {field: 'slip_67', headerName: '67', type: 'number', width: 100}, {
    field: 'slip_90', headerName: '90', width: 100
}, {field: 'type', headerName: 'Тип', type: 'number', width: 100},]

export const columns_slips = [{field: 'id', headerName: 'UID документа', width: 10}, {
    field: 'date_shift', headerName: 'Дата смены', width: 100, type: 'date', valueGetter: (param) => {
        return param ? dayjs(param).toDate() : null
    }
}, {
    field: 'date_create', headerName: 'Создан', width: 140, type: 'dateTime', valueGetter: (param) => {
        return param ? dayjs(param).toDate() : null
    }
}, {field: 'pinpad_number', headerName: 'ID пинпад', width: 100}, {field: 'inn', headerName: 'ИНН', width: 100}, {
    field: 'name_creator', headerName: 'Автор', width: 100
}, {field: 'name_organization', headerName: 'Организация', width: 100}, {
    field: 'print_error', headerName: 'Ошибка печати', width: 100
}, {field: 'slip0', headerName: '0', width: 100}, {field: 'slip4', headerName: '4', width: 100}, {
    field: 'slip6', headerName: '6', width: 100, type: 'dateTime', valueGetter: (param) => {
        return param ? dayjs(param).toDate() : null
    }
}, {field: 'slip9', headerName: '9', width: 100}, {field: 'slip10', headerName: '10', width: 100}, {
    field: 'slip11', headerName: '11', width: 100
}, {field: 'slip13', headerName: '13', width: 100}, {
    field: 'slip14', headerName: '14', width: 100
}, {field: 'slip15', headerName: '15', width: 100}, {
    field: 'slip19', headerName: '19', width: 100
}, {field: 'slip21', headerName: '21', width: 100}, {
    field: 'slip23', headerName: '23', width: 100
}, {field: 'slip25', headerName: '25', width: 100}, {
    field: 'slip26', headerName: '26', width: 100
}, {field: 'slip27', headerName: '27', width: 100}, {
    field: 'slip28', headerName: '28', width: 100
}, {field: 'slip39', headerName: '39', width: 100}, {
    field: 'slip86', headerName: '86', width: 100
}, {field: 'uid_creator', headerName: 'UID автор', width: 100}, {
    field: 'uid_order_cinema', headerName: 'UID заказ кино', width: 100
}, {field: 'uid_order_food', headerName: 'UID заказ общепит', width: 100}, {
    field: 'uid_pinpad', headerName: 'UID пинпад', width: 100
}, {field: 'slip90', headerName: '90', width: 100}, {
    field: 'printed', headerName: 'Напечатан', width: 100, type: 'boolean'
}, {
    field: 'slip_type', headerName: 'Тип', width: 140, valueGetter: (param) => {
        switch (param) {
            case 1:
                return 'ПРИХОД'
            case 2:
                return 'ОТМЕНА/ВОЗВРАТ'
        }
    }
}, {field: 'slip_sum', headerName: 'Сумма', width: 100},]