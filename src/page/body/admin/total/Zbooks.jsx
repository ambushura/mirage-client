import {Box} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"

const Zbooks = () => {

    const columns = [
        {field: 'id', headerName: 'ID', width: 10},
        {field: 'number_kkt', headerName: 'ЗН ККТ', width: 130},
        {field: 'date_ofd', headerName: 'ОФД', width: 90},
        {field: 'last_fd', headerName: 'ФД', width: 70},
        {field: 'date_shift', headerName: 'Смена', width: 90},
        {field: 'number_shift', headerName: '№', width: 60},
        {field: 'sum_in_cash', headerName: 'Н +', type: 'number', width: 90},
        {field: 'sum_in_electron', headerName: 'БН +', type: 'number', width: 90},
        {field: 'sum_out_cash', headerName: 'Н -', type: 'number', width: 90},
        {field: 'sum_out_electron', headerName: 'БН -', type: 'number', width: 90},
        {field: 'sum_nds', headerName: 'НДС', type: 'number', width: 90},
        {field: 'sum_collection', headerName: 'Инкассация', type: 'number', width: 90},
        {field: 'sum_electron', headerName: 'Б ∑', type: 'number', width: 90},
        {field: 'revenue', headerName: 'В ∑', type: 'number', width: 90},
        {field: 'sum_total_of_income', headerName: 'П смены', type: 'number', width: 100},
        {field: 'sum_non_zero_total_of_income', headerName: 'НСП', type: 'number', width: 90},
        {field: 'sum_non_zero_total_of_outcome', headerName: 'НСВ', type: 'number', width: 90},
        {field: 'sum_electron_pinpad', headerName: 'БН Т', type: 'number', width: 90}
    ]

    const rows = [
        {
            id: 0,
            number_kkt: '00106905027521',
            date_ofd: '2025-05-20',
            last_fd: 456,
            date_shift: '2025-05-20',
            number_shift: 34,
            sum_in_cash: 15000.00,
            sum_in_electron: 32000.00,
            sum_out_cash: 2000.00,
            sum_out_electron: 1000.00,
            sum_nds: 5700.00,
            sum_collection: 25000.00,
            sum_electron: 33000.00,
            revenue: 47000.00,
            sum_total_of_income: 47000.00,
            sum_non_zero_total_of_income: 3200000.00,
            sum_non_zero_total_of_outcome: 100000.00,
            sum_electron_pinpad: 29000.00
        }
    ]

    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    )
}

export default Zbooks