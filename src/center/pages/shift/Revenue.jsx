import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {common_reports_sales_get} from "../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import LocationPinIcon from "@mui/icons-material/LocationPin"

const Revenue = () => {

    const cities = useSelector(state => state.data.cities)
    const filials_selected = useSelector(state => state.center.filials_selected)

    return <Box className='center-scroll' sx={{width: '100%', height: '100%', overflow: 'auto'}}>
        {cities.map(city => {
            return <>
                {city.filials.map(filial => {
                    if (filials_selected.includes(filial.uid)) {
                        return <Box key={filial.uid}>
                            <FilialRevenue filial={filial}/>
                        </Box>
                    }
                })}
            </>
        })}
    </Box>
}

export default Revenue

export const FilialRevenue = ({filial}) => {

    const dispatch = useDispatch()

    const {
        date_shift_beginning, date_shift_end, date_shift_accepted
    } = useSelector(state => state.center)

    const [sales, set_sales] = useState({columns: [], rows: [], columnGroupingModel: []})
    const [columnVisibilityModel, set_columnVisibilityModel] = useState({type: false, level: false})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_reports_sales_get(filial, date_shift_beginning, date_shift_end, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                set_sales(fetching_result.data)
            }
        }
        if (filial !== undefined) fetch()
        return () => {
            set_sales({columns: [], rows: [], columnGroupingModel: []})
        }
    }, [dispatch, filial, date_shift_accepted])

    return <Box sx={{minHeight: '100%'}}>
        <Box className='center-title-filial'><Box sx={{marginRight: '5px'}}><LocationPinIcon/></Box>{filial.name}</Box>
        {sales.rows.length > 1 ? <DataGridPro
            cellSelection
            disableRowSelectionOnClick
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={sales.rows.map((r, i) => ({...r, id: i}))}
            columns={sales.columns}
            columnGroupingModel={sales.columnGroupingModel}
            density="compact"
            rowHeight={30}
            headerHeight={30}
            hideFooterSelectedRowCount
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(model) => {
                set_columnVisibilityModel(model)
            }}
            getRowClassName={(params) => {
                const label = params.row.label

                // ВСЕГО
                if (label === 'ВСЕГО') {
                    return 'row-total-grand'
                }

                // Организация
                if (!label.startsWith('  └─') && !label.startsWith('    └─')) {
                    return 'row-total-owner'
                }

                // Пользователь
                if (label.startsWith('  └─') && !label.startsWith('    └─')) {
                    return 'row-user'
                }

                // ККТ
                if (label.startsWith('    └─')) {
                    return 'row-kkt'
                }
                return ''
            }}
            sx={{
                flex: 1, border: 0, borderRadius: '0', '& .MuiDataGrid-cell': {
                    userSelect: 'text'
                }, '& .MuiDataGrid-cellContent': {
                    pointerEvents: 'auto'
                }
            }}
            pinnedColumns={{
                left: ['label'],
            }}
        /> : <Box className='center-title-filial' sx={{paddingLeft: '15px', fontWeight: 300}}>Выручка отсутствует в
            смене...</Box>}
    </Box>
}