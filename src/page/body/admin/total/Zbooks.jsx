import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import dayjs from "dayjs"
import {common_documents_zbooks_get} from "../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"

const Zbooks = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const {update} = useSelector(state => state.documents.zbooks)
    const [rows, set_rows] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_zbooks_get(filial, param_date_admin, update))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                const rows_new = []
                fetching_result.data.z_books.forEach(zbook => {
                    rows_new.push({
                        id: zbook.uid,
                        inn: zbook.inn,
                        name_organization: zbook.name_organization,
                        number_kkt: zbook.number_kkt,
                        date_ofd: dayjs(zbook.date_ofd).format('DD.MM.YYYY HH:mm'),
                        last_fd: zbook.last_fd,
                        date_shift: dayjs(zbook.date_shift).format('DD.MM.YYYY'),
                        number_shift: zbook.number_shift,
                        sum_in_cash: zbook.sum_in_cash,
                        sum_in_electron: zbook.sum_in_electron,
                        sum_out_cash: zbook.sum_out_cash,
                        sum_out_electron: zbook.sum_out_electron,
                        sum_nds: zbook.sum_nds,
                        sum_collection: zbook.sum_collection,
                        sum_electron: zbook.sum_electron,
                        revenue: zbook.revenue,
                        sum_total_of_income: zbook.sum_total_of_income,
                        sum_non_zero_total_of_income: zbook.sum_non_zero_total_of_income,
                        sum_non_zero_total_of_outcome: zbook.sum_non_zero_total_of_outcome,
                        hide: true
                    })
                })
                set_rows(rows_new)
            }
        }
        if (filial !== undefined && param_date_admin !== undefined) {
            fetch()
        }
    }, [dispatch, filial, param_date_admin, update])

    const [columnVisibility, set_visibility] = useState({
        id: false
    })

    const columns = [{field: 'id', headerName: 'ID', width: 10}, {
        field: 'name_organization', headerName: 'Организация', width: 100
    }, {field: 'inn', headerName: 'ИНН', width: 100}, {
        field: 'number_kkt', headerName: 'ЗН ККТ', width: 130
    }, {field: 'date_ofd', headerName: 'ОФД', width: 130}, {
        field: 'last_fd', headerName: 'ФД', width: 50
    }, {field: 'date_shift', headerName: 'Смена', width: 90}, {
        field: 'number_shift', headerName: '№', width: 60
    }, {field: 'sum_in_cash', headerName: 'Н +', type: 'number', width: 100}, {
        field: 'sum_in_electron', headerName: 'БН +', type: 'number', width: 100
    }, {field: 'sum_out_cash', headerName: 'Н -', type: 'number', width: 100}, {
        field: 'sum_out_electron', headerName: 'БН -', type: 'number', width: 100
    }, {field: 'sum_nds', headerName: 'НДС', type: 'number', width: 100}, {
        field: 'sum_collection', headerName: 'Инкассация', type: 'number', width: 100
    }, {field: 'sum_electron', headerName: 'Б ∑', type: 'number', width: 100}, {
        field: 'revenue', headerName: 'В ∑', type: 'number', width: 100
    }, {
        field: 'sum_total_of_income', headerName: 'П смены', type: 'number', width: 100
    }, {
        field: 'sum_non_zero_total_of_income', headerName: 'НС +', type: 'number', width: 100
    }, {field: 'sum_non_zero_total_of_outcome', headerName: 'НС -', type: 'number', width: 100},]

    return (<DataGrid
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
    />)
}

export default Zbooks