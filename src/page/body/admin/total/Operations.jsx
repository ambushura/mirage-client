import {Box, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"
import {useSetOperations} from "./useSetOperations.js"
import Loader from "../../../../ui/Loader.jsx";

const Operations = () => {

    const [fetch_data_operations, fetch_errors_operations, fetch_loading_operations] = useSetOperations()

    // const columns = [
    //     {field: 'date', headerName: 'Дата', width: 80},
    //     {field: 'kino_sum', headerName: 'Сумма', width: 120},
    //     {field: 'kino_comment', headerName: 'Комментарий', width: 200},
    //     {field: 'tokino_sum', headerName: 'Сумма', width: 120},
    //     {field: 'tokino_comment', headerName: 'Комментарий', width: 200},
    //     {field: 'horeca_sum', headerName: 'Сумма', width: 120},
    //     {field: 'horeca_comment', headerName: 'Комментарий', width: 200},
    //     {field: 'hoz_sum', headerName: 'Сумма', width: 120},
    //     {field: 'hoz_comment', headerName: 'Комментарий', width: 200},
    // ]
    //
    // const rows = [
    //     {
    //         id: 'total-01.01.2025',
    //         isTotalRow: true,
    //         date: '01.01.2025',
    //         kino_sum: 'Остаток: 500',
    //         tokino_sum: 'Остаток: 0',
    //         horeca_sum: 'Остаток: 0',
    //         hoz_sum: 'Остаток: 0'
    //     },
    //     {id: 1, date: '01.01.2025', kino_sum: '+500', kino_comment: '', tokino_sum: '', horeca_sum: '', hoz_sum: ''},
    //     {
    //         id: 2,
    //         date: '01.01.2025',
    //         kino_sum: '-100',
    //         kino_comment: 'Закупка',
    //         tokino_sum: '',
    //         horeca_sum: '',
    //         hoz_sum: ''
    //     },
    //     {
    //         id: 3,
    //         date: '01.01.2025',
    //         kino_sum: '',
    //         kino_comment: '',
    //         tokino_sum: '',
    //         horeca_sum: '',
    //         hoz_sum: '+100',
    //         hoz_comment: 'Мелочь'
    //     },
    //
    //     {
    //         id: 'total-02.01.2025',
    //         isTotalRow: true,
    //         date: '02.01.2025',
    //         kino_sum: 'Остаток: 400',
    //         tokino_sum: 'Остаток: 1000',
    //         horeca_sum: 'Остаток: 1000',
    //         hoz_sum: 'Остаток: 100'
    //     },
    //     {
    //         id: 4,
    //         date: '02.01.2025',
    //         kino_sum: '',
    //         tokino_sum: '',
    //         horeca_sum: '+1000',
    //         horeca_comment: 'Выручка',
    //         hoz_sum: ''
    //     },
    //     {id: 5, date: '02.01.2025', kino_sum: '', tokino_sum: '+1000', horeca_sum: '', hoz_sum: ''},
    // ]


    if (fetch_data_operations !== null) {
        return (
            <>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '80px repeat(4, 420px)',
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
                    rowHeight={24} // высота строки
                    headerHeight={28} // высота заголовка
                    getRowClassName={(params) =>
                        params.row.isTotalRow ? 'total-row' : ''
                    }
                    sx={{
                        '& .total-row': {
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-cell': {
                            padding: '0 4px', // меньше отступов
                            fontSize: '0.8rem', // уменьшенный шрифт
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