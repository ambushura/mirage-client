import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {common_documents_operations_get} from "../../../service/fetch_service.js"
import LocationPinIcon from "@mui/icons-material/LocationPin"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"

const Operations = () => {

    const cities = useSelector(state => state.data.cities)
    const filials_selected = useSelector(state => state.center.filials_selected)

    return <Box className='center-scroll' sx={{width: '100%', height: '100%', overflow: 'auto'}}>
        {cities.map(city => {
            return <>
                {city.filials.map(filial => {
                    if (filials_selected.includes(filial.uid)) {
                        return <Box key={filial.uid}>
                            <FilialOperation filial={filial}/>
                        </Box>
                    }
                })}
            </>
        })}
    </Box>
}

export const FilialOperation = ({filial}) => {

    const dispatch = useDispatch()

    const {
        date_shift_beginning, date_shift_end, date_shift_accepted
    } = useSelector(state => state.center)

    const [operations, set_operations] = useState({columns: [], rows: [], column_grouping_model: []})
    const [columnVisibilityModel, set_columnVisibilityModel] = useState({type: false, level: false})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_documents_operations_get(filial, 1, 0, false))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                set_operations(fetching_result.data)
            }
        }
        if (filial !== undefined) fetch()
        return () => {
            set_operations({columns: [], rows: [], column_grouping_model: []})
        }
    }, [dispatch, filial, date_shift_accepted])

    return <Box sx={{minHeight: '100px'}}>
        <Box className='center-title-filial'><Box sx={{marginRight: '5px'}}><LocationPinIcon/></Box>{filial.name}</Box>
        {operations.rows.length > 1 ? <Box sx={{
            width: '100%', ml: '10px', pb: '40px'
        }}><DataGridPro
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            checkboxSelection
            rows={operations.rows}
            columns={operations.columns}
            density="compact"
            hideFooter
            autoHeight
            rowHeight={32}
            headerHeight={32}
            columnGroupingModel={operations.column_grouping_model}
            experimentalFeatures={{columnGrouping: true}}
            getRowClassName={(params) => params.row.isTotalRow ? 'total-row' : ''}
            pinnedColumns={{
                left: ['date_shift'],
            }}
            sx={{
                border: 0, borderRadius: 0, '& .total-row': {
                    backgroundColor: '#f0f0f0', fontWeight: 'bold',
                }, '& .MuiDataGrid-cell': {
                    padding: '0 4px', fontSize: '0.9rem',
                }, '& .MuiDataGrid-columnHeaderTitle': {
                    fontSize: '0.9rem',
                }, '& .MuiDataGrid-scrollbar--horizontal': {
                    position: 'relative'
                },
            }}
        /></Box> : <Box className='center-title-filial' sx={{paddingLeft: '20px', fontWeight: 300}}>Операции по кассе
            отсутствует в смене...</Box>}
    </Box>
}

export default Operations