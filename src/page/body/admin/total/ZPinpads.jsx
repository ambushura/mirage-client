import {DataGrid} from "@mui/x-data-grid"
import {ruRU} from "@mui/x-data-grid/locales"
import {useEffect, useState} from "react"
import dayjs from "dayjs"
import {useSetZPinpads} from "./useSetZPinpads.js"

const ZPinpads = () => {

    const [fetch_data_zpinpads, fetch_errors_zpinpads, fetch_loading_zpinpads] = useSetZPinpads()
    const [columnVisibility, setVisibility] = useState({
        id: false
    })

    const columns = [
        {field: 'id', headerName: 'ID', width: 10},
        {field: 'name_organization', headerName: 'Организация', width: 100},
        {field: 'inn', headerName: 'ИНН', width: 100},
        {field: 'number_pinpad', headerName: 'ID', width: 130},
        {field: 'date_shift', headerName: 'Смена', width: 90},
        {field: 'slip_15', headerName: '15', type: 'number', width: 100},
        {field: 'slip_19', headerName: '19', type: 'number', width: 100},
        {field: 'slip_25', headerName: '25', type: 'number', width: 100},
        {field: 'slip_39', headerName: '39', type: 'number', width: 100},
        {field: 'slip_65', headerName: '65', type: 'number', width: 100},
        {field: 'slip_67', headerName: '67', type: 'number', width: 100},
        {field: 'slip_90', headerName: '90', width: 100},
        {field: 'type', headerName: 'Т', type: 'number', width: 100},
    ]

    const [rows, set_rows] = useState([])

    useEffect(() => {
        const rows_new = []
        if (fetch_data_zpinpads !== null) {
            fetch_data_zpinpads.z_pinpads.forEach(zpinpad => {
                rows_new.push(
                    {
                        id: zpinpad.uid,
                        inn: zpinpad.inn,
                        name_organization: zpinpad.name_organization,
                        number_pinpad: zpinpad.number_pinpad,
                        date_shift: dayjs(zpinpad.date_shift).format('DD.MM.YYYY'),
                        slip_15: zpinpad.slip_15,
                        slip_19: zpinpad.slip_19,
                        slip_25: zpinpad.slip_25,
                        slip_39: zpinpad.slip_39,
                        slip_65: zpinpad.slip_65,
                        slip_67: zpinpad.slip_67,
                        slip_90: zpinpad.slip_90,
                        type: zpinpad.type,
                        hide: true
                    }
                )
            })
            set_rows(rows_new)
        }
    }, [fetch_data_zpinpads])

    return (
        <DataGrid
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
            loading={fetch_loading_zpinpads}
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
    )
}

export default ZPinpads