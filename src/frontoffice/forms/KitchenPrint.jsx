import {useDispatch, useSelector} from "react-redux"
import {common_printers_get, equipment_action} from "../../service/fetch_service.js"
import {Box, Button} from "@mui/material"
import {useEffect, useState} from "react"
import {ROUTE_EQUIPMENT_PRINTER_KITCHEN_PRINT} from "../../service/fetch_routes.js"

const KitchenPrint = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const [printers, set_printers] = useState({kkt: [], kitchen_points: []})
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_printers_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                set_printers(fetching_result.data)
            }
        }
        if (filial !== undefined) {
            fetch()
        }
    }, [dispatch, filial])

    const sortedKP = [...printers.kitchen_points].sort((a, b) => {
        if (a.local !== b.local) return a.local ? -1 : 1
        return a.kitchen_point.name.localeCompare(b.kitchen_point.name, 'ru')
    })

    return <Box style={{backgroundColor: '#f8f8f8'}}>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', margin: '4px'}}>Печать фишки</Box>
        <Box
            sx={{
                width: '100%',
                padding: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxHeight: props.type === 'cinema' ? '130px' : null,
                overflowY: 'hidden',
            }}>
            {sortedKP.map(printer => <Button
                onClick={() => {
                    dispatch(equipment_action(filial, ROUTE_EQUIPMENT_PRINTER_KITCHEN_PRINT, {
                        uid: printer.kitchen_point.uid, uid_order: props.order.uid
                    }))
                }}
                variant='outlined'
                color='secondary'
                key={printer.kitchen_point.uid}
                className='payment-path'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 4px 4px 0',
                    maxWidth: '130px',
                    overflow: 'hidden'
                }}>
                <span>{printer.kitchen_point.name}</span>
                <span style={{fontSize: '70%'}}>
        </span>
            </Button>)}
        </Box>
    </Box>
}

export default KitchenPrint