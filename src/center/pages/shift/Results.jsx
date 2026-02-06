import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {common_reports_shift_get} from "../../../service/fetch_service.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {set_shiftColumnVisibilityModel} from "../../../redux/reportsReducer.js"
import LocationPinIcon from '@mui/icons-material/LocationPin'

const Results = () => {

    const cities = useSelector(state => state.data.cities)

    return <Box className='center-scroll' sx={{width: '100%', height: '100%', overflow: 'auto'}}>
        {cities.map(city => {
            return <>
                {city.filials.map(filial => {
                    return <Box key={filial.uid}>
                        <FilialResults filial={filial}/>
                    </Box>
                })}
            </>
        })}
    </Box>
}

export default Results

export const FilialResults = ({filial}) => {

    const dispatch = useDispatch()

    const [shift_1, set_shift_1] = useState({columns: [], rows: [], columnGroupingModel: []})
    const [shift_1_columnVisibilityModel, set_shift_1_columnVisibilityModel] = useState({type: false, level: false})

    const [shift_2, set_shift_2] = useState({columns: [], rows: [], columnGroupingModel: []})
    const [shift_2_columnVisibilityModel, set_shift_2_columnVisibilityModel] = useState({type: false, level: false})

    const [shift_3, set_shift_3] = useState({columns: [], rows: [], columnGroupingModel: []})
    const [shift_3_columnVisibilityModel, set_shift_3_columnVisibilityModel] = useState({type: false, level: false})

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_reports_shift_get(filial, '2026-02-05', 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                const data = fetching_result.data
                set_shift_1(data.chapter1)
                set_shift_2(data.chapter2)
                set_shift_3(data.chapter3)
            }
        }
        if (filial !== undefined) fetch()
    }, [dispatch, filial])

    return <Box sx={{minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
        <Box className='center-title-filial'><Box sx={{marginRight: '5px'}}><LocationPinIcon/></Box>{filial.name}</Box>
        <Box className='center-title-chapter'>1. РАЗДЕЛ CВЕРКА (продажи и ОФД)</Box>
        {shift_1.rows.length > 1 ? <>
            <DataGridPro
                hideFooter
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={shift_1.rows.map((r, i) => ({...r, id: i}))}
                columns={shift_1.columns}
                columnGroupingModel={shift_1.columnGroupingModel}
                density="compact"
                rowHeight={30}
                headerHeight={30}
                disableSelectionOnClick
                hideFooterSelectedRowCount
                experimentalFeatures={{columnGrouping: true}}
                columnVisibilityModel={shift_1_columnVisibilityModel}
                onColumnVisibilityModelChange={set_shiftColumnVisibilityModel}
                getRowClassName={(params) => params.row.diff_nal !== 0 || params.row.diff_bn !== 0 ? 'row-diff-red' : ''}
                sx={{
                    width: '100%', margin: '0 4px 4px 4px', '& .row-diff-red': {
                        backgroundColor: 'rgba(255, 0, 0, 0.2)', '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        },
                    },
                }}
                pinnedColumns={{
                    left: ['number_kkt'],
                }}
            /></> : <Box className='center-title-chapter'>Нет данных...</Box>}
        <Box className='center-title-chapter'>2. РАЗДЕЛ СВЕРКА (продажи и банк)</Box>
        {shift_2.rows.length > 0 ? <DataGridPro
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={shift_2.rows.map((r, i) => ({...r, id: i}))}
            columns={shift_2.columns}
            columnGroupingModel={shift_2.columnGroupingModel}
            density="compact"
            rowHeight={30}
            headerHeight={30}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            experimentalFeatures={{columnGrouping: true}}
            columnVisibilityModel={shift_2_columnVisibilityModel}
            onColumnVisibilityModelChange={set_shift_2_columnVisibilityModel}
            getRowClassName={(params) => {
                switch (params.row.status) {
                    case 'РУЧНАЯ ПРОВЕРКА':
                        return 'row-diff-orange'
                    case 'СВЕРКА ВЫПОЛНЕНА':
                        return ''
                    default:
                        return 'row-diff-red'
                }
            }}
            sx={{
                width: '100%', margin: '0 4px 4px 4px', '& .row-diff-red': {
                    backgroundColor: '#FF000033', '&:hover': {
                        backgroundColor: '#FF00004C',
                    },
                }, '& .row-diff-orange': {
                    backgroundColor: '#FF730033', '&:hover': {
                        backgroundColor: 'rgba(234,106,1,0.2)',
                    },
                },
            }}
            pinnedColumns={{
                left: ['number'],
            }}
        /> : <Box className='center-title-chapter'>Нет данных...</Box>}
        <Box className='center-title-chapter'>3. РАЗДЕЛ ВЫРУЧКА</Box>
        {shift_3.rows.length > 3 ? <DataGridPro
            hideFooter
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={shift_3.rows.map((r, i) => ({...r, id: i}))}
            columns={shift_3.columns}
            columnGroupingModel={shift_3.columnVisibilityModel}
            density="compact"
            rowHeight={30}
            headerHeight={30}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            experimentalFeatures={{columnGrouping: true}}
            columnVisibilityModel={shift_3_columnVisibilityModel}
            onColumnVisibilityModelChange={set_shiftColumnVisibilityModel}
            pinnedColumns={{
                left: ['label'],
            }}
        /> : <Box className='center-title-chapter glass'>Нет данных...</Box>}
    </Box>
}