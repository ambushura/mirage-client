import {Box} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useSetZBooks} from "./useSetZBooks.js"
import {useEffect, useState} from "react"
import dayjs from "dayjs"

const Zbooks = () => {

    const [fetch_data_zbooks, fetch_errors_zbooks, fetch_loading_zbooks] = useSetZBooks()
    const [columnVisibility, setVisibility] = useState({
        id: false
    })

    const columns = [
        {field: 'id', headerName: 'ID', width: 10},
        {field: 'number_kkt', headerName: 'ЗН ККТ', width: 130},
        {field: 'date_ofd', headerName: 'ОФД', width: 130},
        {field: 'last_fd', headerName: 'ФД', width: 50},
        {field: 'date_shift', headerName: 'Смена', width: 90},
        {field: 'number_shift', headerName: '№', width: 60},
        {field: 'sum_in_cash', headerName: 'Н +', type: 'number', width: 100},
        {field: 'sum_in_electron', headerName: 'БН +', type: 'number', width: 100},
        {field: 'sum_out_cash', headerName: 'Н -', type: 'number', width: 100},
        {field: 'sum_out_electron', headerName: 'БН -', type: 'number', width: 100},
        {field: 'sum_nds', headerName: 'НДС', type: 'number', width: 100},
        {field: 'sum_collection', headerName: 'Инкассация', type: 'number', width: 100},
        {field: 'sum_electron', headerName: 'Б ∑', type: 'number', width: 100},
        {field: 'revenue', headerName: 'В ∑', type: 'number', width: 100},
        {field: 'sum_total_of_income', headerName: 'П смены', type: 'number', width: 100},
        {field: 'sum_non_zero_total_of_income', headerName: 'НС +', type: 'number', width: 100},
        {field: 'sum_non_zero_total_of_outcome', headerName: 'НС -', type: 'number', width: 100},
        {field: 'sum_electron_pinpad', headerName: 'БН Т', type: 'number', width: 100}
    ]

    const [rows, set_rows] = useState([])

    useEffect(() => {
        const rows_new = []
        if (fetch_data_zbooks !== null) {
            fetch_data_zbooks.z_books.forEach(zbook => {
                rows_new.push(
                    {
                        id: zbook.uid,
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
                        sum_electron_pinpad: zbook.sum_electron_pinpad,
                        hide: true
                    }
                )
            })
            set_rows(rows_new)
        }
    }, [fetch_data_zbooks])

    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[10, 25, 50]}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columnVisibilityModel={columnVisibility}
                loading={fetch_loading_zbooks}
            />
        </Box>
    )
}

export default Zbooks