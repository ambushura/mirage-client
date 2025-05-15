import {Box, Button, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {markirovka_cdn_info_get, markirovka_cdn_info_update} from "../../service/fetch_service.js"
import {DataGrid} from "@mui/x-data-grid"
import {useEffect, useState} from "react"
import dayjs from "dayjs"
import {fillHosts} from "../../redux/markirovkaReducer.js"
import {EMPTY_TABLE_STYLE} from "../../ui/ThemeContext.jsx"

const MarkHosts = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const hosts = useSelector(state => state.markirovka.hosts || [])

    const [cdn_rows, set_cdn_rows] = useState([])
    const cdn_columns_wight = [150, 50, 110]
    const cdn_columns = [
        {field: 'id', headerName: 'Площадка', width: cdn_columns_wight[0]},
        {field: 'period', headerName: '', width: cdn_columns_wight[2]},
        {
            field: 'avg_time_ms',
            headerName: '',
            width: cdn_columns_wight[1],
            renderCell: (params) => {
                const value = params.value
                let color = 'inherit'
                if (value < 3) color = 'green'
                else if (value < 5) color = 'orange'
                else color = 'red'
                return <span style={{color, fontWeight: 'bold'}}>{value}</span>
            }
        },
    ]

    useEffect(() => {
        const cdn_rows_new = []
        hosts.forEach(host => {
            cdn_rows_new.push({
                id: host.host,
                avg_time_ms: host.avgTimeMs,
                period: dayjs(host.period).format('DD.MM HH:mm:ss'),
            })
        })
        cdn_rows_new.sort((a, b) => a.avg_time_ms - b.avg_time_ms)
        set_cdn_rows(cdn_rows_new)
    }, [hosts])

    useEffect(() => {
        if (hosts.length === 0) {
            dispatch(markirovka_cdn_info_get(filial, wp))
        }
        return () => {
            fillHosts([])
        }
    })

    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             onSubmit={(e) => {
                 e.preventDefault()
             }}
             sx={{width: `${cdn_columns_wight.reduce((a, b) => a + b, 0) + 2}px`}}>
            <Typography variant="h6" color="textSecondary" margin={1}>Доступность площадок ГИСМТ &#34;Честный знак&#34;</Typography>
            <Box sx={{width: '100%', height: '400px', marginBottom: '8px'}}>
                <DataGrid
                    disableSelectionOnClick
                    hideFooter
                    rows={cdn_rows}
                    columns={cdn_columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={EMPTY_TABLE_STYLE}
                />
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit" sx={{marginLeft: '4px'}} onClick={() => {
                    dispatch(markirovka_cdn_info_update(filial, wp))
                }}>Обновить список CDN-площадок</Button>
            </Box>
        </Box>
    )
}

export default MarkHosts