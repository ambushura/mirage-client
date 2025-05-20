import {Box} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useState} from "react"

const Operations = () => {

    const columns = [
        {
            field: 'operation_date',
            headerName: 'Дата операции',
            type: 'dateTime',
            flex: 1,
            valueGetter: ({value}) => value && new Date(value)
        },
        {
            field: 'shift_date',
            headerName: 'Дата смены',
            type: 'dateTime',
            flex: 1,
            valueGetter: ({value}) => value && new Date(value)
        },
        {field: 'cash_income', headerName: 'Касса (приход)', flex: 1},
        {field: 'kkt_income', headerName: 'ККТ (приход)', flex: 1},
        {
            field: 'amount_income',
            headerName: 'Сумма (приход)',
            type: 'number',
            flex: 1,
            valueFormatter: ({value}) => value?.toFixed(2)
        },
        {
            field: 'total_income',
            headerName: 'Итог',
            type: 'number',
            flex: 1,
            valueFormatter: ({value}) => value?.toFixed(2)
        },
        {field: 'cash_expense', headerName: 'Касса (расход)', flex: 1},
        {field: 'kkt_expense', headerName: 'ККТ (расход)', flex: 1},
        {
            field: 'amount_expense',
            headerName: 'Сумма (расход)',
            type: 'number',
            flex: 1,
            valueFormatter: ({value}) => value?.toFixed(2)
        },
        {
            field: 'total_expense',
            headerName: 'Итог',
            type: 'number',
            flex: 1,
            valueFormatter: ({value}) => value?.toFixed(2)
        },
        {field: 'comment', headerName: 'Комментарий', flex: 2}
    ]

    const rows = [
        {
            id: 1,
            operation_date: '2025-05-20T10:30:00Z',
            shift_date: '2025-05-20T00:00:00Z',
            kkt_income: 'ККТ-1',
            kkt_expense: 'ККТ-2',
            cash_income: 'Касса-1',
            cash_expense: 'Касса-2',
            amount_income: 1500.5,
            amount_expense: 500.75,
            total_income: 10000.5,
            total_expense: 2000.75,
            comment: 'Комментарий к операции'
        },
        {
            id: 2,
            operation_date: '2025-05-20T10:30:00Z',
            shift_date: '2025-05-20T00:00:00Z',
            kkt_income: 'ККТ-1',
            kkt_expense: 'ККТ-2',
            cash_income: 'Касса-1',
            cash_expense: 'Касса-2',
            amount_income: 1500.5,
            amount_expense: 500.75,
            total_income: 10000.5,
            total_expense: 2000.75,
            comment: 'Комментарий к операции'
        },
        {
            id: 3,
            operation_date: '2025-05-20T10:30:00Z',
            shift_date: '2025-05-20T00:00:00Z',
            kkt_income: 'ККТ-1',
            kkt_expense: 'ККТ-2',
            cash_income: 'Касса-1',
            cash_expense: 'Касса-2',
            amount_income: 1500.5,
            amount_expense: 500.75,
            total_income: 10000.5,
            total_expense: 2000.75,
            comment: 'Комментарий к операции'
        },
        {
            id: 4,
            operation_date: '2025-05-20T10:30:00Z',
            shift_date: '2025-05-20T00:00:00Z',
            kkt_income: 'ККТ-1',
            kkt_expense: 'ККТ-2',
            cash_income: 'Касса-1',
            cash_expense: 'Касса-2',
            amount_income: 1500.5,
            amount_expense: 500.75,
            total_income: 10000.5,
            total_expense: 2000.75,
            comment: 'Комментарий к операции'
        }
    ]

    const [selectedRows, setSelectedRows] = useState([])

    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                onRowSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection)
                }}
                rowSelectionModel={selectedRows}
            />
        </Box>
    )
}

export default Operations